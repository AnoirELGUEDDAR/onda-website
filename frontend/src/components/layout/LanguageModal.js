import React from "react";
import ReactCountryFlag from "react-country-flag";

const LANGUAGES = [
  { code: 'en', label: 'English', flag: 'gb' },
  { code: 'fr', label: 'Français', flag: 'fr' },
  { code: 'ar', label: 'العربية', flag: 'ma' },
  { code: 'es', label: 'Español', flag: 'es' }
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
            <h5 className="modal-title w-100" style={{ fontWeight: 700 }}>
              Choose your language
            </h5>
          </div>
          <div className="modal-body d-flex flex-wrap justify-content-center">
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                className="btn btn-outline-primary m-2"
                style={{ minWidth: 120, fontSize: 20 }}
                onClick={() => onSelect(lang.code)}
              >
                <ReactCountryFlag
                  countryCode={lang.flag}
                  svg
                  style={{
                    width: '1.5em',
                    height: '1.5em',
                    marginRight: '8px'
                  }}
                />
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
