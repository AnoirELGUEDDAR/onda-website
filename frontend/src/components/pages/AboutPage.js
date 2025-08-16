src/.../pages/AboutPage.js
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './AboutPage.css';

// Fixed SectionTitle with prop validation
const SectionTitle = ({ children }) => (
  <h4 className="section-title">{children}</h4>
);
SectionTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

const AboutPage = () => {
  const { t, i18n } = useTranslation();

  // key figures (label keys map)
  const figures = [
    { number: '20+', label: 'about.keyFigures.airports' },
    { number: '25M+', label: 'about.keyFigures.passengers' },
    { number: '2,500+', label: 'about.keyFigures.employees' },
    { number: '100+', label: 'about.keyFigures.destinations' },
    { number: '40+', label: 'about.keyFigures.airlines' },
  ];

  // timeline years -> i18n key suffix (year string matches key)
  const timeline = ['1990', '1991', '2003', '2004'];

  // airport development: i18n base per airport + number of items to render
  const development = [
    { key: 'casablanca', count: 6 },
    { key: 'agadir', count: 3 },
    { key: 'marrakech', count: 3 },
    { key: 'dakhla', count: 2 },
    { key: 'essaouira', count: 2 },
    { key: 'tanger', count: 2 },
    { key: 'rabat', count: 2 },
  ];

  // management items (title and description keys)
  const management = [
    { title: 'about.management.director', desc: 'about.management.directorName' },
    { title: 'about.management.board', desc: 'about.management.boardDescription' },
    { title: 'about.management.departments', desc: 'about.management.departmentsDescription' },
    { title: 'about.management.quality', desc: 'about.management.qualityDescription' },
  ];

  return (
    <div className={`about-container ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
      <img src="/images/ONDA.jpg" id="ABOUTONDA" alt="ONDA Organization Logo" />

      <main className="about-content">
        {/* Intro */}
        <section className="about-intro">
          <h2>{t('about.title')}</h2>
          <div className="about-text">
            <p>{t('about.description')}</p>
            <h3>{t('about.vision.title')}</h3>
            <p>{t('about.vision.content')}</p>
          </div>
        </section>

        {/* Key figures */}
        <section className="key-figures">
          <h3>{t('about.keyFigures.title')}</h3>
          <div className="figures-grid">
            {figures.map(({ number, label }) => (
              <div className="figure-card" key={label}>
                <div className="number">{number}</div>
                <div className="label">{t(label)}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="mission-values">
          <h3>{t('about.mission.title')}</h3>
          <ul>
            {['safety', 'services', 'infrastructure', 'tourism', 'economy', 'innovation'].map((k) => (
              <li key={k}>{t(`about.mission.${k}`)}</li>
            ))}
          </ul>
        </section>

        {/* History */}
        <section className="history-section">
          <h3>{t('about.history.title')}</h3>
          <p>{t('about.history.content')}</p>
          <div className="timeline">
            <SectionTitle>{t('about.history.milestones.title')}</SectionTitle>
            {timeline.map((year) => (
              <div className="timeline-item" key={year}>
                <div className="timeline-year">{year}</div>
                <div className="timeline-content">{t(`about.history.milestones.${year}`)}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Development */}
        <section className="development-section">
          <h3>{t('about.development.title')}</h3>
          <p>{t('about.development.intro')}</p>

          <div className="airport-developments">
            {development.map(({ key, count }) => {
              const base = `about.development.airports.${key}`;
              return (
                <div className="airport-project" key={key}>
                  <SectionTitle>{t(`${base}.name`)}</SectionTitle>
                  <ul>
                    {/* Render items 0..count-1 */}
                    {Array.from({ length: count }).map((_, i) => (
                      <li key={`${key}-${i}`}>{t(`${base}.projects.${i}`)}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <p className="development-note">{t('about.development.note')}</p>
        </section>

        {/* Management */}
        <section className="management-section">
          <h3>{t('about.management.title')}</h3>
          <div className="management-grid">
            {management.map(({ title, desc }) => (
              <div className="management-item" key={title}>
                <SectionTitle>{t(title)}</SectionTitle>
                <p>{t(desc)}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
