# @gabrielvfdelima/content-moderation

> ⚠️ This project is a fork of **@bielgennaro/content-moderation**.  
> Original work © **bielgennaro**.  
> This fork is maintained by **gabrielvfdelima** and includes additional features and modern ESM support.

TypeScript library for content moderation and offensive word detection in multiple languages
(Portuguese, English, and Spanish).

---

## ✨ What’s new in this fork

This fork extends the original library with improvements focused on **modern JavaScript environments** and **more flexible censorship strategies**.

- ✅ **Dynamic replacement support**  
  `replaceWith` now accepts a function `(match: string) => string`
- ✅ **Proportional censorship**  
  Automatically replaces offensive words with the same number of characters
- ✅ **Native ESM support**  
  Fully compatible with **Nuxt 3**, **Vite**, and **Node.js 18+**
- ✅ **NodeNext module resolution**  
  Correct ESM behavior without CommonJS interop issues
- ✅ Fully backward compatible with the original API

---

## 📦 Installation

```bash
npm install @gabrielvfdelima/content-moderation
```

---

## 🚀 Usage

### Check if text is clean

```ts
import { isClean } from '@gabrielvfdelima/content-moderation';

if (isClean('This is clean text')) {
  console.log('Text approved!');
}

if (!isClean('Text with bad word')) {
  console.log('Text contains offensive words');
}
```

---

### Detect offensive words

```ts
import { moderate } from '@gabrielvfdelima/content-moderation';

const result = moderate('Some text to check');

console.log(result.isClean);        // true or false
console.log(result.detectedWords);  // ['word1', 'word2']
console.log(result.originalText);   // original text
```

---

### Filter offensive content

```ts
import { filter } from '@gabrielvfdelima/content-moderation';

const cleanText = filter('Text with bad word here');
// Returns: "Text with *** here"

// Customize replacement with fixed text
const customText = filter('Text with bad word', '[CENSORED]');
// Returns: "Text with [CENSORED]"
```

---

### 🔥 Dynamic replacement (new feature)

You can now generate the replacement dynamically based on the detected word:

```ts
import { moderate } from '@gabrielvfdelima/content-moderation';

const result = moderate('isso é uma merda', {
  returnFiltered: true,
  replaceWith: (match) => '*'.repeat(match.length),
});

console.log(result.filteredText);
// "isso é uma *****"
```

This allows:
- proportional masking
- custom symbols
- hashes or emojis
- advanced moderation strategies

---

## 🌍 Multi-language support

```ts
import { moderate } from '@gabrielvfdelima/content-moderation';

// Portuguese (default)
moderate('Texto com palavrão', { language: 'pt-br' });

// English
moderate('Text with bad word', { language: 'en' });

// Spanish
moderate('Texto con mala palabra', { language: 'es' });
```

---

## 📖 API

### `isClean(text: string, options?: ModerationOptions): boolean`

Checks if the text does not contain offensive words.

**Parameters:**
- `text`: Text to be checked
- `options`: Moderation options (optional)

**Returns:**  
`true` if the text is clean, `false` otherwise

---

### `moderate(text: string, options?: ModerationOptions): ModerationResult`

Analyzes the text and returns detailed information about detected offensive words.

**Parameters:**
- `text`: Text to be analyzed
- `options`: Moderation options (optional)

**Returns:** `ModerationResult`

---

### `filter(text: string, replaceWith?: string, options?): string`

Filters offensive words by replacing them with alternative text.

**Parameters:**
- `text`: Text to be filtered
- `replaceWith`: Replacement text (default: `'***'`)
- `options`: Additional options (optional)

**Returns:**  
Text with offensive words replaced

---

## 🔧 ModerationOptions

```ts
interface ModerationOptions {
  caseSensitive?: boolean;                // Consider case (default: false)
  returnFiltered?: boolean;               // Return filtered text (default: false)
  replaceWith?: string | ((match: string) => string);
  language?: 'pt-br' | 'en' | 'es';       // Language (default: 'pt-br')
}
```

---

## 📄 ModerationResult

```ts
interface ModerationResult {
  isClean: boolean;           // Whether the text is clean
  detectedWords: string[];    // Detected offensive words
  originalText: string;       // Original text
  filteredText?: string;      // Filtered text (if requested)
}
```

---

## ✨ Features

- ✅ Multi-language support (PT-BR, EN, ES)
- ✅ Offensive word detection
- ✅ Text normalization (accent and variation resistant)
- ✅ Case-insensitive support
- ✅ Fixed or dynamic offensive word replacement
- ✅ TypeScript with full typing
- ✅ Zero runtime dependencies
- ✅ Lightweight and performant
- ✅ Detection of variations with special characters (l33tspeak)

---

## 🔒 Security

This library detects:
- Profanity and insults
- Racist and discriminatory terms
- Explicit sexual content
- Offensive language variations
- Accent and character-based evasion attempts

---

## 📝 License

MIT © **bielgennaro**  
Fork maintained by **gabrielvfdelima**

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

If you want to contribute upstream, consider opening a pull request to the original repository.

---

## 🌍 Supported Languages

| Language | Code |
|--------|------|
| Portuguese (Brazil) | `pt-br` |
| English | `en` |
| Spanish | `es` |