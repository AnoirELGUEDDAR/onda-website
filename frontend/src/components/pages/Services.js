import React from 'react';
import { useTranslation } from 'react-i18next';
import './Services.css'; // Nous allons créer ce fichier CSS aussi

const Services = () => {
  const { t } = useTranslation();

  // Services aéroportuaires
  const airportServices = [
    {
      id: 1,
      icon: "fas fa-plane-departure",
      title: "services.checkIn.title",
      description: "services.checkIn.description",
      image: "/images/services/check-in-service.jpg"
    },
    {
      id: 2,
      icon: "fas fa-luggage-cart",
      title: "services.baggage.title",
      description: "services.baggage.description",
      image: "/images/services/baggage-service.jpg"
    },
    {
      id: 3,
      icon: "fas fa-passport",
      title: "services.customs.title",
      description: "services.customs.description",
      image: "/images/services/customs-service.jpg"
    },
    {
      id: 4,
      icon: "fas fa-shopping-bag",
      title: "services.shopping.title",
      description: "services.shopping.description",
      image: "/images/services/shopping-service.jpg"
    },
    {
      id: 5,
      icon: "fas fa-utensils",
      title: "services.dining.title",
      description: "services.dining.description",
      image: "/images/services/dining-service.jpg"
    },
    {
      id: 6,
      icon: "fas fa-wifi",
      title: "services.wifi.title",
      description: "services.wifi.description",
      image: "/images/services/wifi-service.jpg"
    },
    {
      id: 7,
      icon: "fas fa-exchange-alt",
      title: "services.currencyExchange.title",
      description: "services.currencyExchange.description",
      image: "/images/services/currency-exchange.jpg"
    },
    {
      id: 8,
      icon: "fas fa-parking",
      title: "services.parking.title",
      description: "services.parking.description",
      image: "/images/services/parking-service.jpg"
    }
  ];

  return (
    <div className="services-page">
      {/* Hero Section */}
      <div className="hero-section position-relative">
        <img 
          src="/images/services/services-hero.jpg" 
          alt={t('services.heroAlt')} 
          className="img-fluid w-100" 
          style={{ maxHeight: '400px', objectFit: 'cover' }}
        />
        <div className="hero-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center">
          <div className="container text-white">
            <h1 className="display-4 fw-bold">{t('services.title')}</h1>
            <p className="lead">{t('services.subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="services-section py-5">
        <div className="container">
          <h2 className="text-center mb-5">{t('services.airportServices')}</h2>
          
          <div className="row">
            {airportServices.map(service => (
              <div className="col-md-6 col-lg-3 mb-4" key={service.id}>
                <div className="card h-100 service-card">
                  <div className="card-img-container">
                    <img 
                      src={service.image} 
                      className="card-img-top" 
                      alt={t(service.title)}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/services/default-service.jpg';
                      }}
                    />
                    <div className="icon-overlay">
                      <i className={service.icon}></i>
                    </div>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{t(service.title)}</h5>
                    <p className="card-text">{t(service.description)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIP Services Section */}
      <section className="vip-services py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <img 
                src="/images/services/vip-lounge.jpg" 
                alt={t('services.vip.title')} 
                className="img-fluid rounded shadow-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/services/default-service.jpg';
                }}
              />
            </div>
            <div className="col-lg-6">
              <h2>{t('services.vip.title')}</h2>
              <p className="lead">{t('services.vip.subtitle')}</p>
              <p>{t('services.vip.description')}</p>
              <ul className="list-group list-group-flush mb-4">
                <li className="list-group-item bg-light"><i className="fas fa-check-circle text-success me-2"></i> {t('services.vip.benefit1')}</li>
                <li className="list-group-item bg-light"><i className="fas fa-check-circle text-success me-2"></i> {t('services.vip.benefit2')}</li>
                <li className="list-group-item bg-light"><i className="fas fa-check-circle text-success me-2"></i> {t('services.vip.benefit3')}</li>
                <li className="list-group-item bg-light"><i className="fas fa-check-circle text-success me-2"></i> {t('services.vip.benefit4')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact for Services Section */}
      <section className="contact-services py-5">
        <div className="container">
          <h2 className="text-center mb-5">{t('services.contactUs.title')}</h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card shadow" style={{backgroundColor:'var(--onda-gray)'}}>
                <div className="card-body p-4">
                  <p className="text-center">{t('services.contactUs.description')}</p>
                  <div className="text-center mt-4">
                    <a href="/contact" className="btn btn-primary btn-lg">
                      {t('services.contactUs.button')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
