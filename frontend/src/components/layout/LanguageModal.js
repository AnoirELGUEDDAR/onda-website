import React from "react";

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'ar', label: 'العربية', flag: '🇲🇦' },
  { code: 'es', label: 'Español', flag: '🇪🇸' }
];

export default function LanguageModal({ show, onSelect }) {
  if (!show) return null;
  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.3)",
        zIndex: 3000
      }}
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content text-center">
          <div className="modal-header">
            <h5 className="modal-title w-100" style={{ fontWeight: 700 }}>Choose your language</h5>
          </div>
          <div className="modal-body d-flex flex-wrap justify-content-center">
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                className="btn btn-outline-primary m-2"
                style={{ minWidth: 120, fontSize: 20 }}
                onClick={() => onSelect(lang.code)}
              >
                <span role="img" aria-label={lang.label}>{lang.flag}</span> {lang.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
