src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// ---- Optional: simple client helper that calls your server route ----
async function translateViaServer({ q, target, source = 'en' }) {
  try {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q, target, source })
    });
    
    if (!res.ok) {
      throw new Error(`Translation API returned ${res.status}`);
    }
    
    const data = await res.json();
    // Expecting { translatedText: "..." }
    return data?.translatedText || null;
  } catch (e) {
    // Log error for debugging but don't break the UI
    console.error('Translation error:', e);
    return null;
  }
}

// Cache helpers
function getCache(lng, ns, key) {
  try {
    return localStorage.getItem(`i18nCache::${lng}::${ns}::${key}`);
  } catch (e) {
    console.error('Cache read error:', e);
    return null;
  }
}

function setCache(lng, ns, key, value) {
  try {
    localStorage.setItem(`i18nCache::${lng}::${ns}::${key}`, value);
  } catch (e) {
    console.error('Cache write error:', e);
  }
}

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: { escapeValue: false },

    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage', 'cookie'],
    },

    backend: {
      // serves /public/locales/{lng}/{ns}.json
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    ns: ['common'],
    defaultNS: 'common',

    react: { useSuspense: false },

    // Let i18next notify us when a key is missing
    saveMissing: true,

    /**
     * NOTE: missingKeyHandler is sync and is mainly for reporting/saving missing keys.
     * We'll use it to kick off an async translation fetch in the background.
     * The first render will show fallback/key; when translation arrives,
     * we add it to the resource store and gently re-render the UI.
     */
    missingKeyHandler: (lng, ns, key, fallbackValue) => {
      // avoid running on undefined language
      if (!lng) return;

      // 1) Try cache
      const cached = getCache(lng, ns, key);
      if (cached) {
        i18n.addResource(lng, ns, key, cached);
        // Trigger a gentle refresh so components see the new value
        i18n.emit('added', lng, ns, key);
        return;
      }

      // 2) Fire-and-forget async translation from your server
      const sourceText = fallbackValue || key;
      const targetLang = Array.isArray(lng) ? lng[0] : lng;
      
      // Only attempt translation for non-English languages
      if (targetLang !== 'en') {
        translateViaServer({ q: sourceText, target: targetLang, source: 'en' })
          .then((translated) => {
            if (!translated) return;
            setCache(lng, ns, key, translated);
            i18n.addResource(lng, ns, key, translated);
            i18n.emit('added', lng, ns, key);
          })
          .catch((error) => {
            console.error('Translation background task failed:', error);
          });
      }
    },
  });

export default i18n;
