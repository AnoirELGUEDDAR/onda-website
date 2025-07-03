import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

const LanguageSwitcher = ({ variant = 'dropdown' }) => {
  const { i18n, t } = useTranslation();
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    
    // Set text direction based on language
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    
    // Add language class to body for additional styling
    document.body.className = document.body.className
      .replace(/\blang-\w+\b/g, '')
      .trim();
    document.body.classList.add(`lang-${lng}`);
  };
  
  const languages = [
    { code: 'en', name: t('languages.english'), flag: 'gb.svg' },
    { code: 'ar', name: t('languages.arabic'), flag: 'ma.svg' },
    { code: 'fr', name: t('languages.french'), flag: 'fr.svg' },
    { code: 'es', name: t('languages.spanish'), flag: 'es.svg' }
  ];
  
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];
  
  if (variant === 'buttons') {
    return (
      <div className="language-buttons">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`btn btn-sm ${language.code === i18n.language ? 'btn-primary' : 'btn-outline-primary'} me-2`}
          >
            <img 
              src={language.code === 'ar' ? "/images/morocco-flag.png" : `https://flagcdn.com/${language.flag}`} 
              alt={language.name} 
              width="20" 
              className="me-1"
            />
            <span className="d-none d-md-inline">{language.name}</span>
          </button>
        ))}
      </div>
    );
  }
  
  return (
    <div className="language-dropdown">
      <button 
        className="btn btn-sm btn-dark dropdown-toggle d-flex align-items-center" 
        type="button" 
        id="languageDropdown" 
        data-bs-toggle="dropdown" 
        aria-expanded="false"
      >
        <img 
          src={currentLanguage.code === 'ar' ? "/images/morocco-flag.png" : `https://flagcdn.com/${currentLanguage.flag}`} 
          alt={currentLanguage.name} 
          width="18" 
          className="me-1"
        />
        <span className="d-none d-sm-inline">{currentLanguage.name}</span>
      </button>
      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
        {languages.map((language) => (
          <li key={language.code}>
            <button 
              className={`dropdown-item ${language.code === i18n.language ? 'active' : ''}`} 
              onClick={() => changeLanguage(language.code)}
            >
              <img 
                src={language.code === 'ar' ? "/images/morocco-flag.png" : `https://flagcdn.com/${language.flag}`} 
                alt={language.name} 
                width="18" 
                className="me-2"
              />
              {language.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageSwitcher;
