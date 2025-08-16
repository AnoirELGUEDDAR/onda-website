import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./Contact.css";

const Contact = () => {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSent(false);
    setError("");
    setSending(true);

    if (!form.firstName || !form.lastName || !form.email || !form.message) {
      setError(t("contact.errors.required"));
      setSending(false);
      return;
    }

    try {
      const apiUrl =
        process.env.NODE_ENV === "production"
          ? "/api/contact"
          : "http://localhost:8080/api/contact";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
        credentials: "omit",
      });

      const data = await response.text();

      if (response.ok) {
        setSent(true);
        setForm({ firstName: "", lastName: "", email: "", message: "" });
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

  // What will be announced to assistive tech
  const a11yStatus = error ? error : sent ? t("contact.success") : "";

  return (
    <div className="contact-page">
      <h1 className="contact-title">{t("contact.title")}</h1>

      <div className="contact-content">
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <h2>{t("contact.formTitle")}</h2>

          <div className="contact-row">
            <div>
              <label htmlFor="firstName">
                {t("contact.firstName")}
                <span aria-hidden="true">*</span>
              </label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
                placeholder={t("contact.placeholders.firstName")}
              />
            </div>

            <div>
              <label htmlFor="lastName">
                {t("contact.lastName")}
                <span aria-hidden="true">*</span>
              </label>
              <input
                id="lastName"
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
            <label htmlFor="email">
              {t("contact.email")}
              <span aria-hidden="true">*</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder={t("contact.placeholders.email")}
            />
          </div>

          <div>
            <label htmlFor="message">
              {t("contact.message")}
              <span aria-hidden="true">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              required
              placeholder={t("contact.placeholders.message")}
            />
          </div>

          <p className="contact-privacy">{t("contact.privacy")}</p>

          {/* Native, accessible status element */}
          <output
            aria-live="polite"
            className="visually-hidden"
            id="form-status"
          >
            {a11yStatus}
          </output>

          {/* Visible messages (hidden from screen readers to avoid double announcements) */}
          {error && (
            <div className="contact-error" aria-hidden="true">
              {error}
            </div>
          )}
          {sent && (
            <div className="contact-success" aria-hidden="true">
              {t("contact.success")}
            </div>
          )}

          <button type="submit" className="contact-submit" disabled={sending}>
            {sending ? t("contact.sending") || "Sending..." : t("contact.submit")}
          </button>
        </form>

        <div className="contact-info">
          <h2>{t("contact.infoTitle")}</h2>
          <ul className="list-unstyled">
            <li>
              <strong>{t("contact.emailLabel")}</strong>{" "}
              <a href="mailto:contact@onda.ma">contact@onda.ma</a>
            </li>
            <li>
              <strong>{t("contact.phoneLabel")}</strong>{" "}
              <a href="tel:+212522539040">0522539040</a>
            </li>
          </ul>

          <p>{t("contact.officeHours")}</p>

          <h2>{t("contact.headquartersTitle")}</h2>
          <address>
            Office National Des Aéroports (ONDA)
            <br />
            Aéroport Mohammed V – Nouasseur
            <br />
            Casablanca, Maroc
            <br />
            20100
          </address>
        </div>
      </div>
    </div>
  );
};

export default Contact;

