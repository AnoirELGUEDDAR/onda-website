import '@testing-library/jest-dom';

// ---- axios: provide a default export with .get/.post etc.
const mockAxios = {
  get: jest.fn(),
  post: jest.fn(),
  create: () => mockAxios,
};

jest.mock('axios', () => ({
  __esModule: true,
  default: mockAxios, // support "import axios from 'axios'"
  ...mockAxios,       // (also works if someone did a named import by mistake)
}));

// ---- i18n: tiny mock so components render texts as keys
jest.mock('react-i18next', () => ({
  __esModule: true,
  I18nextProvider: ({ children }) => children,
  Trans: ({ children }) => (Array.isArray(children) ? children.join('') : children),
  initReactI18next: { type: '3rdParty', init: jest.fn() },
  useTranslation: () => {
    const t = (k, opts) => (opts?.defaultValue ? opts.defaultValue : k);
    return { t, i18n: { language: 'en', changeLanguage: jest.fn(),        dir: () => 'ltr',
 } };
    
  },
}));

