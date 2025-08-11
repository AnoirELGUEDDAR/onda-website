import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./Contact.css";

const Contact = () => {
  const { t } = useTranslation();

  // Form state
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSent(false);
    setError("");
    setSending(true);

    // Basic validation
    if (!form.firstName || !form.lastName || !form.email || !form.message) {
      setError(t("contact.errors.required"));
      setSending(false);
      return;
    }

    try {
      // Use API base URL based on environment
      // For production, use relative URL; for development, use the full URL
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? '/api/contact'  // In production, use relative URL
        : 'http://localhost:8080/api/contact';  // In development, use full URL

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(form),
        credentials: 'omit',  // Don't send cookies, which can help with CORS
      });

      const data = await response.text(); // Try to get response body

      if (response.ok) {
        setSent(true);
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          message: "",
        });
      } else {
        console.error("Server error:", data);
        setError(`${t("contact.errors.send")} (${response.status})`);
      }
    } catch (err) {
      console.error("Error sending form:", err);
      setError(t("contact.errors.send"));
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="contact-page">
      <h1 className="contact-title">{t("contact.title")}</h1>
      <div className="contact-content">
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>{t("contact.formTitle")}</h2>
          <div className="contact-row">
            <div>
              <label>
                {t("contact.firstName")}<span>*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
                placeholder={t("contact.placeholders.firstName")}
              />
            </div>
            <div>
              <label>
                {t("contact.lastName")}<span>*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
                placeholder={t("contact.placeholders.lastName")}
              />
            </div>
          </div>
          <div>
            <label>
              {t("contact.email")}<span>*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder={t("contact.placeholders.email")}
            />
          </div>
          <div>
            <label>{t("contact.message")}<span>*</span></label>
            <textarea
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              required
              placeholder={t("contact.placeholders.message")}
            />
          </div>
          <div className="contact-privacy">
            {t("contact.privacy")}
          </div>
          {error && <div className="contact-error">{error}</div>}
          {sent && <div className="contact-success">{t("contact.success")}</div>}
          <button 
            type="submit" 
            className="contact-submit" 
            disabled={sending}
          >
            {sending ? t("contact.sending") || "Sending..." : t("contact.submit")}
          </button>
        </form>
        <div className="contact-info">
          <h2>{t("contact.infoTitle")}</h2>
          <p>
            - {t("contact.emailLabel")}<a href="mailto:contact@onda.ma"> contact@onda.ma</a><br />
            - {t("contact.phoneLabel")} <a href="tel:+212522539040"> 0522539040</a>
          </p>
          <p>{t("contact.officeHours")}</p>
          <h2>{t("contact.headquartersTitle")}</h2>
          <p>
            Office National Des Aéroports (ONDA)<br />
            Aéroport Mohammed V – Nouasseur<br />
            Casablanca, Maroc<br />
            20100
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
