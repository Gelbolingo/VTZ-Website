// Centralized VTZ language helpers + entry prompt copy.
export const STORAGE_KEY = 'vtz-language-preference';
export const LANGUAGE_VALUES = ['tagalog', 'english', 'taglish'];
export const LANGUAGE_META = {
  tagalog: { value: 'tagalog', flag: '🇵🇭', label: 'Tagalog', hint: 'Filipino' },
  english: { value: 'english', flag: '🇺🇸', label: 'English', hint: 'English' },
  taglish: { value: 'taglish', flag: '🇵🇭', label: 'Taglish', hint: 'Tagalog + English' },
};
export const MODAL_COPY = {
  title: 'Choose Your Language',
  description: 'Piliin ang language na gusto mong gamitin sa VTZ.',
  close: 'Close',
};
export const HTML_LANG = { english: 'en', tagalog: 'tl', taglish: 'tl' };
export function normalizeLanguage(value) {
  return LANGUAGE_VALUES.includes(value) ? value : null;
}
export function readSavedLanguage() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    return normalizeLanguage(window.localStorage.getItem(STORAGE_KEY));
  } catch { return null; }
}
export function persistLanguage(value) {
  const next = normalizeLanguage(value);
  if (!next) return;
  try { window.localStorage.setItem(STORAGE_KEY, next); } catch { /* private mode */ }
  try { document.documentElement.lang = HTML_LANG[next] || 'en'; } catch { /* noop */ }
}
export function getStrings(language) {
  return STRINGS[normalizeLanguage(language)] || STRINGS.english;
}
// ---- dictionary part 1/4: see i18n/en.js, i18n/tl.js, i18n/tl-en.js ----
export { STRINGS } from './i18n/index.js';
