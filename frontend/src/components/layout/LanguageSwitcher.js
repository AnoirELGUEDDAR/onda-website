import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ar', label: 'العربية', flag: '🇲🇦' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'es', label: 'Español', flag: '🇪🇸' }
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
      <div className="dropdown">
        <button
            className="btn btn-outline-dark dropdown-toggle"
            type="button"
            id="languageDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
        >
          {currentLang.flag} {currentLang.label}
        </button>
        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
          {languages.map(lang => (
              <li key={lang.code}>
                <button
                    className={`dropdown-item ${lang.code === i18n.language ? 'active' : ''}`}
                    onClick={() => changeLanguage(lang.code)}
                >
                  {lang.flag} {lang.label}
                </button>
              </li>
          ))}
        </ul>
      </div>
  );
};

export default LanguageSwitcher;
