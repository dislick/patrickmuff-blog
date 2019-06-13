/**
 * Get an emoji flag for a given language code.
 * http://www.lingoes.net/en/translator/langcode.htm
 * @param {string} language language code
 */
export function languageCodeToEmoji(language) {
  switch (language) {
    case 'de-CH':
      return '🇨🇭';
    case 'de-DE':
      return '🇩🇪';
    case 'en-GB':
      return '🇬🇧';
    case 'en-US':
      return '🇺🇸';
    case 'en-AU':
      return '🇦🇺';
    case 'en-CA':
      return '🇨🇦';
    default:
      return '🏳';
  }
}
