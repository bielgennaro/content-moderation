# @bielgennaro/content-moderation

Biblioteca TypeScript para moderação de conteúdo e detecção de palavras ofensivas em múltiplos idiomas (Português, Inglês e Espanhol).

## 📦 Instalação

```bash
npm install @bielgennaro/content-moderation
```

## 🚀 Uso

### Verificar se um texto é limpo

```typescript
import { isClean } from '@bielgennaro/content-moderation';

if (isClean('Este é um texto limpo')) {
  console.log('Texto aprovado!');
}

if (!isClean('Texto com palavrão')) {
  console.log('Texto contém palavras ofensivas');
}
```

### Detectar palavras ofensivas

```typescript
import { moderate } from '@bielgennaro/content-moderation';

const result = moderate('Algum texto para verificar');

console.log(result.isClean); // true ou false
console.log(result.detectedWords); // ['palavra1', 'palavra2']
console.log(result.originalText); // texto original
```

### Filtrar conteúdo ofensivo

```typescript
import { filter } from '@bielgennaro/content-moderation';

const textoLimpo = filter('Texto com palavrão aqui');
// Retorna: "Texto com *** aqui"

// Personalizar o substituto
const textoCustom = filter('Texto com palavrão', '[CENSURADO]');
// Retorna: "Texto com [CENSURADO]"
```

### Moderação com opções avançadas

```typescript
import { moderate } from '@bielgennaro/content-moderation';

const result = moderate('Texto para verificar', {
  caseSensitive: false,      // Ignora maiúsculas/minúsculas (padrão)
  returnFiltered: true,      // Retorna versão filtrada
  replaceWith: '[***]',      // Texto de substituição
  language: 'pt-br'          // Idioma: 'pt-br', 'en' ou 'es'
});

console.log(result.filteredText); // Texto censurado
```

### Suporte Multi-idioma

```typescript
import { moderate, isClean, filter } from '@bielgennaro/content-moderation';

// Português (padrão)
moderate('Texto com palavrão', { language: 'pt-br' });

// Inglês
moderate('Text with bad word', { language: 'en' });

// Espanhol
moderate('Texto con mala palabra', { language: 'es' });

// Exemplo completo
const englishResult = moderate('This is fucking awesome', {
  language: 'en',
  returnFiltered: true,
  replaceWith: '***'
});

console.log(englishResult.isClean);        // false
console.log(englishResult.detectedWords);  // ['fucking']
console.log(englishResult.filteredText);   // 'This is *** awesome'
```

## 📖 API

### `isClean(text: string, options?: ModerationOptions): boolean`

Verifica se o texto não contém palavras ofensivas.

**Parâmetros:**
- `text`: Texto a ser verificado
- `options`: Opções de moderação (opcional)

**Retorna:** `true` se o texto estiver limpo, `false` caso contrário

---

### `moderate(text: string, options?: ModerationOptions): ModerationResult`

Analisa o texto e retorna informações detalhadas sobre palavras ofensivas detectadas.

**Parâmetros:**
- `text`: Texto a ser analisado
- `options`: Opções de moderação (opcional)

**Retorna:** Objeto `ModerationResult` com:
- `isClean`: Se o texto está limpo
- `detectedWords`: Array com palavras ofensivas encontradas
- `originalText`: Texto original
- `filteredText`: Texto filtrado (se `returnFiltered: true`)

---

### `filter(text: string, replaceWith?: string, options?): string`

Filtra palavras ofensivas substituindo-as por um texto alternativo.

**Parâmetros:**
- `text`: Texto a ser filtrado
- `replaceWith`: Texto substituto (padrão: `'***'`)
- `options`: Opções adicionais (opcional)

**Retorna:** Texto com palavras ofensivas substituídas

---

### `ModerationOptions`

Interface de opções para moderação:

```typescript
interface ModerationOptions {
  caseSensitive?: boolean;    // Considera maiúsculas/minúsculas (padrão: false)
  returnFiltered?: boolean;   // Retorna texto filtrado (padrão: false)
  replaceWith?: string;       // Texto de substituição (padrão: '***')
  language?: 'pt-br' | 'en' | 'es';  // Idioma (padrão: 'pt-br')
}
```

### `ModerationResult`

Interface do resultado da moderação:

```typescript
interface ModerationResult {
  isClean: boolean;           // Se o texto está limpo
  detectedWords: string[];    // Palavras ofensivas detectadas
  originalText: string;       // Texto original
  filteredText?: string;      // Texto filtrado (se solicitado)
}
```

## ✨ Funcionalidades

- ✅ **Suporte Multi-idioma**: Português (pt-br), Inglês (en) e Espanhol (es)
- ✅ Detecção de palavras ofensivas
- ✅ Normalização de texto (remove acentos para evitar evasão)
- ✅ Suporte a case-insensitive
- ✅ Filtragem e substituição de conteúdo ofensivo
- ✅ TypeScript com tipagem completa
- ✅ Zero dependências em runtime
- ✅ Leve e performático
- ✅ Detecção de variações com caracteres especiais (l33tspeak)

## 🔒 Segurança

Esta biblioteca detecta:
- Palavrões e xingamentos
- Termos racistas e discriminatórios
- Conteúdo sexual explícito
- Termos ofensivos diversos
- Variações com acentos e caracteres especiais

## 📝 Licença

MIT

## 👤 Autor

**bielgennaro**

## 🤝 Contribuindo

Contribuições, issues e pedidos de features são bem-vindos!

---

**Nota:** Esta biblioteca suporta moderação de conteúdo em português brasileiro, inglês e espanhol. A lista de palavras pode necessitar de atualizações periódicas.

## 🌍 Idiomas Suportados

| Idioma | Código | Palavras |
|--------|--------|----------|
| Português (Brasil) | `pt-br` | ~890 |
| Inglês | `en` | ~130 |
| Espanhol | `es` | ~170 |
