// src/__mocks__/i18n.js
export default {
  changeLanguage: jest.fn(),
  t: (key) => key, // Returns the translation key as the value
  language: 'en',
  languages: ['en', 'fr'],
};
