import React from 'react';
import { useTranslation } from 'react-i18next';
import './Services.css';

const AirportServicesPage = () => {
  const { t } = useTranslation();

  const airportServices = [
    {
      id: 1,
      icon: "fas fa-plane-departure",
      title: t("airportServicesPage.checkIn.title"),
      description: t("airportServicesPage.checkIn.description"),
      image: "/images/services/check-in-service.jpg"
    },
    {
      id: 2,
      icon: "fas fa-luggage-cart",
      title: t("airportServicesPage.baggage.title"),
      description: t("airportServicesPage.baggage.description"),
      image: "/images/services/baggage-service.jpg"
    },
    {
      id: 3,
      icon: "fas fa-passport",
      title: t("airportServicesPage.customs.title"),
      description: t("airportServicesPage.customs.description"),
      image: "/images/services/customs-service.jpg"
    },
    {
      id: 4,
      icon: "fas fa-shopping-bag",
      title: t("airportServicesPage.shopping.title"),
      description: t("airportServicesPage.shopping.description"),
      image: "/images/services/shopping-service.jpg"
    },
    {
      id: 5,
      icon: "fas fa-utensils",
      title: t("airportServicesPage.dining.title"),
      description: t("airportServicesPage.dining.description"),
      image: "/images/services/dining-service.jpg"
    },
    {
      id: 6,
      icon: "fas fa-wifi",
      title: t("airportServicesPage.wifi.title"),
      description: t("airportServicesPage.wifi.description"),
      image: "/images/services/wifi-service.jpg"
    },
    {
      id: 7,
      icon: "fas fa-exchange-alt",
      title: t("airportServicesPage.currencyExchange.title"),
      description: t("airportServicesPage.currencyExchange.description"),
      image: "/images/services/currency-exchange.jpg"
    },
    {
      id: 8,
      icon: "fas fa-parking",
      title: t("airportServicesPage.parking.title"),
      description: t("airportServicesPage.parking.description"),
      image: "/images/services/parking-service.jpg"
    }
  ];

  return (
      <div className="services-page">
        {/* Hero Section */}
        <div className="hero-section position-relative">
          <img
              src="/images/services/services-hero.jpg"
              alt={t('airportServicesPage.heroAlt')}
              className="img-fluid w-100"
              style={{ maxHeight: '400px', objectFit: 'cover' }}
          />
          <div className="hero-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center">
            <div className="container text-white">
              <h1 className="display-4 fw-bold">{t('airportServicesPage.title')}</h1>
              <p className="lead">{t('airportServicesPage.subtitle')}</p>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <section className="services-section py-5">
          <div className="container">
            <h2 className="text-center mb-5">{t('airportServicesPage.airportServices')}</h2>
            <div className="row">
              {airportServices.map(service => (
                  <div className="col-md-6 col-lg-3 mb-4" key={service.id}>
                    <div className="card h-100 service-card">
                      <div className="card-img-container">
                        <img
                            src={service.image}
                            className="card-img-top"
                            alt={service.title}
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
                        <h5 className="card-title">{service.title}</h5>
                        <p className="card-text">{service.description}</p>
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
                    alt={t('airportServicesPage.vip.title')}
                    className="img-fluid rounded shadow-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/services/default-service.jpg';
                    }}
                />
              </div>
              <div className="col-lg-6">
                <h2>{t('airportServicesPage.vip.title')}</h2>
                <p className="lead">{t('airportServicesPage.vip.subtitle')}</p>
                <p>{t('airportServicesPage.vip.description')}</p>
                <ul className="list-group list-group-flush mb-4">
                  <li className="list-group-item bg-light"><i className="fas fa-check-circle text-success me-2"></i> {t('airportServicesPage.vip.benefit1')}</li>
                  <li className="list-group-item bg-light"><i className="fas fa-check-circle text-success me-2"></i> {t('airportServicesPage.vip.benefit2')}</li>
                  <li className="list-group-item bg-light"><i className="fas fa-check-circle text-success me-2"></i> {t('airportServicesPage.vip.benefit3')}</li>
                  <li className="list-group-item bg-light"><i className="fas fa-check-circle text-success me-2"></i> {t('airportServicesPage.vip.benefit4')}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact for Services Section */}
        <section className="contact-services py-5">
          <div className="container">
            <h2 className="text-center mb-5">{t('airportServicesPage.contactUs.title')}</h2>
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="card shadow" style={{backgroundColor:'var(--onda-gray)'}}>
                  <div className="card-body p-4">
                    <p className="text-center">{t('airportServicesPage.contactUs.description')}</p>
                    <div className="text-center mt-4">
                      <a href="/contact" className="btn btn-primary btn-lg">
                        {t('airportServicesPage.contactUs.button')}
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

export default AirportServicesPage;