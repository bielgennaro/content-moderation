import { ptBR } from './pt-br';
import { en } from './en';
import { es } from './es';

export type Language = 'pt-br' | 'en' | 'es';

export const dictionaries: Record<Language, readonly string[]> = {
  'pt-br': ptBR,
  'en': en,
  'es': es
};

export { ptBR, en, es };
