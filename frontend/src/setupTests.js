// src/setupTests.js
import '@testing-library/jest-dom';

// Light mock for i18next so components using useTranslation() don’t blow up.
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key, opts) => (opts?.defaultValue ?? key),
    i18n: { language: 'en' },
  }),
}));
