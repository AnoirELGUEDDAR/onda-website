import React from 'react';
import { useTranslation } from 'react-i18next';
import ReactCountryFlag from "react-country-flag";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', label: 'English', flag: 'gb' },
    { code: 'ar', label: 'العربية', flag: 'ma' },
    { code: 'fr', label: 'Français', flag: 'fr' },
    { code: 'es', label: 'Español', flag: 'es' }
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
    localStorage.setItem('hasChosenLanguage', 'true');
    document.cookie = `i18next=${lng}; path=/;`;
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
        <ReactCountryFlag
          countryCode={currentLang.flag}
          svg
          style={{
            width: '1.5em',
            height: '1.5em',
            marginRight: '0.5em'
          }}
        />
        {currentLang.label}
      </button>
      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
        {languages.map(lang => (
          <li key={lang.code}>
            <button
              className={`dropdown-item ${lang.code === i18n.language ? 'active' : ''}`}
              onClick={() => changeLanguage(lang.code)}
            >
              <ReactCountryFlag
                countryCode={lang.flag}
                svg
                style={{
                  width: '1.5em',
                  height: '1.5em',
                  marginRight: '0.5em'
                }}
              />
              {lang.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageSwitcher;
