import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './AboutPage.css';

const AboutPage = () => {
  const { t, i18n } = useTranslation();
  const [currentDateTime, setCurrentDateTime] = useState('2025-07-05 14:36:01');
  const currentUser = 'AnoirELGUEDDAR';

  // Mise à jour de l'heure actuelle
  useEffect(() => {
    const formatDate = (date) => {
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const day = String(date.getUTCDate()).padStart(2, '0');
      const hours = String(date.getUTCHours()).padStart(2, '0');
      const minutes = String(date.getUTCMinutes()).padStart(2, '0');
      const seconds = String(date.getUTCSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    // Pour un exemple statique
    setCurrentDateTime('2025-07-05 14:36:01');
  }, []);

  return (
    <div className={`about-container ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
      <main className="about-content">
        <section className="about-intro">
          <h2>{t('about.title')}</h2>
          
          <div className="about-text">
            <p>{t('about.description')}</p>
            
            <h3>{t('about.vision.title')}</h3>
            <p>{t('about.vision.content')}</p>
          </div>
        </section>

        <section className="key-figures">
          <h3>{t('about.keyFigures.title')}</h3>
          <div className="figures-grid">
            <div className="figure-card">
              <div className="number">20+</div>
              <div className="label">{t('about.keyFigures.airports')}</div>
            </div>
            <div className="figure-card">
              <div className="number">25M+</div>
              <div className="label">{t('about.keyFigures.passengers')}</div>
            </div>
            <div className="figure-card">
              <div className="number">2,500+</div>
              <div className="label">{t('about.keyFigures.employees')}</div>
            </div>
            <div className="figure-card">
              <div className="number">100+</div>
              <div className="label">{t('about.keyFigures.destinations')}</div>
            </div>
            <div className="figure-card">
              <div className="number">40+</div>
              <div className="label">{t('about.keyFigures.airlines')}</div>
            </div>
          </div>
        </section>

        <section className="mission-values">
          <h3>{t('about.mission.title')}</h3>
          <ul>
            <li>{t('about.mission.safety')}</li>
            <li>{t('about.mission.services')}</li>
            <li>{t('about.mission.infrastructure')}</li>
            <li>{t('about.mission.tourism')}</li>
            <li>{t('about.mission.economy')}</li>
            <li>{t('about.mission.innovation')}</li>
          </ul>
        </section>
        
        <section className="history-section">
          <h3>{t('about.history.title')}</h3>
          <p>{t('about.history.content')}</p>
          
          <div className="timeline">
            <h4>{t('about.history.milestones.title')}</h4>
            <div className="timeline-item">
              <div className="timeline-year">1990</div>
              <div className="timeline-content">{t('about.history.milestones.1990')}</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">1991</div>
              <div className="timeline-content">{t('about.history.milestones.1991')}</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2003</div>
              <div className="timeline-content">{t('about.history.milestones.2003')}</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2004</div>
              <div className="timeline-content">{t('about.history.milestones.2004')}</div>
            </div>
          </div>
        </section>
        
        <section className="accidents-section">
          <h3>{t('about.accidents.title')}</h3>
          <p>{t('about.accidents.content')}</p>
        </section>
        
        <section className="development-section">
          <h3>{t('about.development.title')}</h3>
          <p>{t('about.development.intro')}</p>
          
          <div className="airport-developments">
            <div className="airport-project">
              <h4>{t('about.development.airports.casablanca.name')}</h4>
              <ul>
                {Array.from({ length: 6 }).map((_, index) => (
                  <li key={`casa-${index}`}>{t(`about.development.airports.casablanca.projects.${index}`)}</li>
                ))}
              </ul>
            </div>
            
            <div className="airport-project">
              <h4>{t('about.development.airports.agadir.name')}</h4>
              <ul>
                {Array.from({ length: 3 }).map((_, index) => (
                  <li key={`agadir-${index}`}>{t(`about.development.airports.agadir.projects.${index}`)}</li>
                ))}
              </ul>
            </div>
            
            <div className="airport-project">
              <h4>{t('about.development.airports.marrakech.name')}</h4>
              <ul>
                {Array.from({ length: 3 }).map((_, index) => (
                  <li key={`marrakech-${index}`}>{t(`about.development.airports.marrakech.projects.${index}`)}</li>
                ))}
              </ul>
            </div>
            
            <div className="airport-project">
              <h4>{t('about.development.airports.dakhla.name')}</h4>
              <ul>
                {Array.from({ length: 2 }).map((_, index) => (
                  <li key={`dakhla-${index}`}>{t(`about.development.airports.dakhla.projects.${index}`)}</li>
                ))}
              </ul>
            </div>
            
            <div className="airport-project">
              <h4>{t('about.development.airports.essaouira.name')}</h4>
              <ul>
                {Array.from({ length: 2 }).map((_, index) => (
                  <li key={`essaouira-${index}`}>{t(`about.development.airports.essaouira.projects.${index}`)}</li>
                ))}
              </ul>
            </div>
            
            <div className="airport-project">
              <h4>{t('about.development.airports.tanger.name')}</h4>
              <ul>
                {Array.from({ length: 2 }).map((_, index) => (
                  <li key={`tanger-${index}`}>{t(`about.development.airports.tanger.projects.${index}`)}</li>
                ))}
              </ul>
            </div>
            
            <div className="airport-project">
              <h4>{t('about.development.airports.rabat.name')}</h4>
              <ul>
                {Array.from({ length: 2 }).map((_, index) => (
                  <li key={`rabat-${index}`}>{t(`about.development.airports.rabat.projects.${index}`)}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <p className="development-note">{t('about.development.note')}</p>
        </section>
        
        <section className="management-section">
          <h3>{t('about.management.title')}</h3>
          <div className="management-grid">
            <div className="management-item">
              <h4>{t('about.management.director')}</h4>
              <p>{t('about.management.directorName')}</p>
            </div>
            <div className="management-item">
              <h4>{t('about.management.board')}</h4>
              <p>{t('about.management.boardDescription')}</p>
            </div>
            <div className="management-item">
              <h4>{t('about.management.departments')}</h4>
              <p>{t('about.management.departmentsDescription')}</p>
            </div>
            <div className="management-item">
              <h4>{t('about.management.quality')}</h4>
              <p>{t('about.management.qualityDescription')}</p>
            </div>
          </div>
        </section>
      </main>


    </div>
  );
};

export default AboutPage;
