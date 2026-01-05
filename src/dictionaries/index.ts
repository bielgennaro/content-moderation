import { ptBR } from './pt-br.js';
import { en } from './en.js';
import { es } from './es.js';

export type Language = 'pt-br' | 'en' | 'es';

export const dictionaries: Record<Language, readonly string[]> = {
  'pt-br': ptBR,
  'en': en,
  'es': es
};

export { ptBR, en, es };
