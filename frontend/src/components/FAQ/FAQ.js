import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./FAQ.css"; // Create this CSS file for the styles

const faqKeys = [
  { q: "faq.q1", a: "faq.a1" },
  { q: "faq.q2", a: "faq.a2" },
  { q: "faq.q3", a: "faq.a3" },
  { q: "faq.q4", a: "faq.a4" },
  { q: "faq.q5", a: "faq.a5" },
  { q: "faq.q6", a: "faq.a6" },
  { q: "faq.q7", a: "faq.a7" },
  { q: "faq.q8", a: "faq.a8" },
  { q: "faq.q9", a: "faq.a9" },
  { q: "faq.q10", a: "faq.a10" },
  { q: "faq.q11", a: "faq.a11" },
    { q: "faq.q12", a: "faq.a12" },
      { q: "faq.q13", a: "faq.a13" },
        { q: "faq.q14", a: "faq.a14" },
          { q: "faq.q15", a: "faq.a15" }
];

export default function FAQ() {
  const { t, i18n } = useTranslation("common");
  const [openIndex, setOpenIndex] = useState(null);
  const isRTL = i18n.dir() === "rtl"; // Detects RTL languages

  const toggle = (idx) => setOpenIndex(openIndex === idx ? null : idx);

  return (
    <section className={`faq-section ${isRTL ? "rtl" : "ltr"}`}>
      <h2 className="section-title">{t("faq.title")}</h2>
      <div className="faq-list">
        {faqKeys.map((item, idx) => (
          <div key={idx} className={`faq-item ${openIndex === idx ? "open" : ""}`}>
            <button 
              className="faq-question" 
              onClick={() => toggle(idx)}
              aria-expanded={openIndex === idx}
            >
              <span className="question-text">{t(item.q)}</span>
              <span className="toggle-icon">{openIndex === idx ? "−" : "+"}</span>
            </button>
            {openIndex === idx && (
              <div className="faq-answer" aria-hidden={openIndex !== idx}>
                <p>{t(item.a)}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
