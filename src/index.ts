import { badWords } from "./badwords.js";
import { dictionaries, Language } from "./dictionaries/index.js";

export interface ModerationResult {
  isClean: boolean;
  detectedWords: string[];
  originalText: string;
  filteredText?: string;
}

export interface ModerationOptions {
  caseSensitive?: boolean;
  returnFiltered?: boolean;
  replaceWith?: string | ((match: string) => string);
  language?: Language;
}

/**
 * Normaliza uma string removendo acentos e caracteres especiais
 */
function normalizeString(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/**
 * Verifica se o texto contém palavras ofensivas
 */
export function moderate(
  text: string,
  options: ModerationOptions = {}
): ModerationResult {
  const {
    caseSensitive = false,
    returnFiltered = false,
    replaceWith = "***",
    language = "pt-br",
  } = options;

  // Seleciona o dicionário apropriado baseado no idioma, 
  // caso o usuário não preencher o idioma preferível usa o fallback badwords
  const wordsToCheck = dictionaries[language] || badWords;

  const textToCheck = caseSensitive ? text : text.toLowerCase();
  const normalizedText = normalizeString(text);
  const detectedWords: string[] = [];
  let filteredText = text;

  for (const badWord of wordsToCheck) {
    const badWordToCheck = caseSensitive ? badWord : badWord.toLowerCase();
    const normalizedBadWord = normalizeString(badWord);

    // Verifica correspondência exata ou normalizada
    const regex = new RegExp(
      `\\b${badWordToCheck.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
      "gi"
    );
    const normalizedRegex = new RegExp(
      `\\b${normalizedBadWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
      "gi"
    );

    if (regex.test(textToCheck) || normalizedRegex.test(normalizedText)) {
      //Evita palavras repetidas
      if (!detectedWords.includes(badWord)) {
        detectedWords.push(badWord);
      }

      //Faz o filtro do texto se o usuário decidiu retornar o texto filtrado
      if (returnFiltered) {
        filteredText = filteredText.replace(regex, (match) =>
          typeof replaceWith == "function" ? replaceWith(match) : replaceWith
        );
      }
    }
  }

  return {
    isClean: detectedWords.length === 0,
    detectedWords,
    originalText: text,
    ...(returnFiltered && { filteredText }),
  };
}

/**
 * Verifica se o texto é limpo (sem palavras ofensivas)
 */
export function isClean(text: string, options?: ModerationOptions): boolean {
  return moderate(text, options).isClean;
}

/**
 * Filtra o texto removendo/substituindo palavras ofensivas
 */
export function filter(
  text: string,
  replaceWith: string = "***",
  options?: Omit<ModerationOptions, "replaceWith" | "returnFiltered">
): string {
  const result = moderate(text, {
    ...options,
    returnFiltered: true,
    replaceWith,
  });
  return result.filteredText || text;
}

export { badWords } from "./badwords.js";
export { dictionaries, ptBR, en, es } from "./dictionaries/index.js";
export type { Language } from "./dictionaries/index.js";

//Para resolver o problema no NUXT
export default {
  moderate,
  isClean,
  filter,
};