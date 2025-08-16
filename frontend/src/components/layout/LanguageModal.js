import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import ReactCountryFlag from "react-country-flag";

const LANGUAGES = [
  { code: "en", label: "English", flag: "gb" },
  { code: "fr", label: "Français", flag: "fr" },
  { code: "ar", label: "العربية", flag: "ma" },
  { code: "es", label: "Español", flag: "es" },
];

export default function LanguageModal({ show, onSelect }) {
  const dialogRef = useRef(null);
  const titleId = "language-modal-title";

  // Ensure Esc closes via onCancel so we can intercept if needed (optional)
  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const handleCancel = (e) => {
      // prevent default auto-close behavior if you want to control it
      // e.preventDefault(); // keep default close; comment out to block
    };
    dlg.addEventListener("cancel", handleCancel);
    return () => dlg.removeEventListener("cancel", handleCancel);
  }, []);

  if (!show) return null;

  return (
    <dialog ref={dialogRef} open className="language-dialog" aria-labelledby={titleId}>
      <div className="modal-content text-center">
        <div className="modal-header">
          <h5 id={titleId} className="modal-title w-100" style={{ fontWeight: 700 }}>
            Choose your language
          </h5>
        </div>

        <div className="modal-body d-flex flex-wrap justify-content-center">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              className="btn btn-outline-primary m-2"
              style={{ minWidth: 120, fontSize: 20 }}
              onClick={() => onSelect(lang.code)}
            >
              <ReactCountryFlag
                countryCode={lang.flag.toUpperCase()}
                svg
                style={{ width: "1.5em", height: "1.5em", marginRight: 8 }}
              />
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      {/* Optional: lightweight styling if you don't already have CSS for <dialog> */}
      <style>{`
        .language-dialog {
          padding: 0;
          border: none;
          background: transparent;
        }
        .language-dialog::backdrop {
          background: rgba(0,0,0,0.3);
        }
        .language-dialog .modal-content {
          background: #fff;
          border-radius: .5rem;
          max-width: 520px;
          width: calc(100vw - 2rem);
          margin: 0 auto;
          box-shadow: 0 10px 30px rgba(0,0,0,.2);
        }
        .language-dialog .modal-header {
          padding: 1rem 1.25rem;
          border-bottom: 1px solid rgba(0,0,0,.1);
        }
        .language-dialog .modal-body {
          padding: 1rem 1.25rem 1.25rem;
        }
      `}</style>
    </dialog>
  );
}

LanguageModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

