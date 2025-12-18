This project is a fork of @bielgennaro/content-moderation.
Original work © bielgennaro.

## 📦 Installation

```bash
npm install @bielgennaro/content-moderation
```

## 🚀 Usage

### Check if text is clean

```typescript
import { isClean } from '@bielgennaro/content-moderation';

if (isClean('This is clean text')) {
  console.log('Text approved!');
}

if (!isClean('Text with bad word')) {
  console.log('Text contains offensive words');
}
```

### Detect offensive words

```typescript
import { moderate } from '@bielgennaro/content-moderation';

const result = moderate('Some text to check');

console.log(result.isClean); // true or false
console.log(result.detectedWords); // ['word1', 'word2']
console.log(result.originalText); // original text
```

### Filter offensive content

```typescript
import { filter } from '@bielgennaro/content-moderation';

const cleanText = filter('Text with bad word here');
// Returns: "Text with *** here"

// Customize replacement
const customText = filter('Text with bad word', '[CENSORED]');
// Returns: "Text with [CENSORED]"
```

### Advanced moderation with options

```typescript
import { moderate } from '@bielgennaro/content-moderation';

const result = moderate('Text to check', {
  caseSensitive: false,      // Ignore case (default)
  returnFiltered: true,      // Return filtered version
  replaceWith: '[***]',      // Replacement text
  language: 'pt-br'          // Language: 'pt-br', 'en' or 'es'
});

console.log(result.filteredText); // Censored text
```

### Multi-language support

```typescript
import { moderate, isClean, filter } from '@bielgennaro/content-moderation';

// Portuguese (default)
moderate('Texto com palavrão', { language: 'pt-br' });

// English
moderate('Text with bad word', { language: 'en' });

// Spanish
moderate('Texto con mala palabra', { language: 'es' });

// Complete example
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

Checks if the text does not contain offensive words.

**Parameters:**
- `text`: Text to be checked
- `options`: Moderation options (optional)

**Returns:** `true` if text is clean, `false` otherwise

---

### `moderate(text: string, options?: ModerationOptions): ModerationResult`

Analyzes the text and returns detailed information about detected offensive words.

**Parameters:**
- `text`: Text to be analyzed
- `options`: Moderation options (optional)

**Returns:** `ModerationResult` object with:
- `isClean`: Whether the text is clean
- `detectedWords`: Array with offensive words found
- `originalText`: Original text
- `filteredText`: Filtered text (if `returnFiltered: true`)

---

### `filter(text: string, replaceWith?: string, options?): string`

Filters offensive words by replacing them with alternative text.

**Parameters:**
- `text`: Text to be filtered
- `replaceWith`: Replacement text (default: `'***'`)
- `options`: Additional options (optional)

**Returns:** Text with offensive words replaced

---

### `ModerationOptions`

Options interface for moderation:

```typescript
interface ModerationOptions {
  caseSensitive?: boolean;    // Consider case (default: false)
  returnFiltered?: boolean;   // Return filtered text (default: false)
  replaceWith?: string;       // Replacement text (default: '***')
  language?: 'pt-br' | 'en' | 'es';  // Language (default: 'pt-br')
}
```

### `ModerationResult`

Moderation result interface:

```typescript
interface ModerationResult {
  isClean: boolean;           // Whether the text is clean
  detectedWords: string[];    // Detected offensive words
  originalText: string;       // Original text
  filteredText?: string;      // Filtered text (if requested)
}
```

## ✨ Features

- ✅ **Multi-language support**: Portuguese (pt-br), English (en), and Spanish (es)
- ✅ Offensive word detection
- ✅ Text normalization (removes accents to prevent evasion)
- ✅ Case-insensitive support
- ✅ Offensive content filtering and replacement
- ✅ TypeScript with full typing
- ✅ Zero runtime dependencies
- ✅ Lightweight and performant
- ✅ Detection of variations with special characters (l33tspeak)

## 🔒 Security

This library detects:
- Profanity and insults
- Racist and discriminatory terms
- Explicit sexual content
- Various offensive terms
- Variations with accents and special characters

## 📝 License

MIT

## 👤 Author

**bielgennaro**

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

**Note:** This library supports content moderation in Brazilian Portuguese, English, and Spanish. The word list may require periodic updates.

## 🌍 Supported Languages

| Language | Code | Words |
|--------|--------|----------|
| Portuguese (Brazil) | `pt-br` | ~890 |
| English | `en` | ~130 |
| Spanish | `es` | ~170 |
