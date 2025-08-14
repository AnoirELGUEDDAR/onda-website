import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import WeatherWidget from '../weather/WeatherWidget';
import { airports } from './AirportList';
import './AirportDetail.css';
const rakRestaurants = [
  { name: "Illy", zone: "Hall Public / Sous Douane" },
  { name: "MAZAR", zone: "Hall Public" },
  { name: "PAUL", zone: "Sous Douane" },
  { name: "SEGAFREDO", zone: "Sous Douane" },
  { name: "STARBUCKS COFFEE", zone: "Sous Douane" },
  { name: "MEDINA", zone: "Sous Douane" },
  { name: "LA TABLE DU MARCHE", zone: "Hall Public / Sous Douane" },
  { name: "MATSURI", zone: "Sous Douane" },
  { name: "POMME DE PAIN", zone: "Sous Douane" }
];
const rakCurrencyAgencies = [
  { name: "BANQUE CENTRALE POPULAIRE", zone: "Hall Public" },
  { name: "AL BARID BANK", zone: "Hall Public" },
  { name: "BMCE BANK", zone: "Hall Public / Sous Douane" },
  { name: "GLOBAL BLUE MAROC", zone: "Hall Public" },
  { name: "GLOBAL EXCHANGE FOREING EXCHANGE MAROC", zone: "Hall Public / Sous Douane" }
];

const AirportDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const parkingBodyRef = useRef(null);

  const [airport, setAirport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // RAK-specific modals
  const [showRestaurants, setShowRestaurants] = useState(false);
  const [showCurrency, setShowCurrency] = useState(false);
  const [showDutyFree, setShowDutyFree] = useState(false);
  const [showParking, setShowParking] = useState(false);

  // All-airports modal
  const [showWifi, setShowWifi] = useState(false);
// Images for each Duty-Free item (put files in /public/images/dutyfree/)
  useEffect(() => {
    const findAirport = () => {
      try {
        const foundAirport = airports.find(a => a.code === id.toUpperCase());
        if (foundAirport) {
          setAirport(foundAirport);
          setError(false);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    findAirport();
  }, [id]);

  if (loading) {
    return (
      <div className="airport-detail-container">
        <div className="container py-5">
          <div className="loading-indicator text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">{t('common.loading', 'Loading...')}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !airport) {
    return (
      <div className="airport-detail-container">
        <div className="container py-5">
          <div className="alert alert-danger">
            {t('airports.loadError', 'Could not load airport details. Please try again later.')}
          </div>
          <Link to="/airports" className="btn btn-primary">
            {t('common.backToList', 'Back to Airports')}
          </Link>
        </div>
      </div>
    );
  }

  const isRAK = airport.code === 'RAK';

  return (
    <div className="airport-detail-container">
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8">
            <h1 className="airport-title mb-4 display-5 fw-bold">
              {t(`airports.names.${airport.name}`)}
            </h1>
            <div className="airport-code-location mb-3">
              <span className="airport-code h5 text-primary">{airport.code}</span> -
              <span className="airport-city ms-2 h5">{t(`cities.${airport.city}`)}</span>
            </div>

            <div className="airport-image-main mb-4">
              <img
                src={airport.image}
                alt={t(`airports.names.${airport.name}`)}
                className="img-fluid rounded shadow-sm"
              />
            </div>

            <div className="airport-description mb-5">
              <h2 className="h4 fw-semibold mb-3">{t('airports.about', 'About')}</h2>
              <p className="lead">
                {t(`airports.descriptions.${airport.code}`, {
                  city: t(`cities.${airport.city}`),
                  type: t(`airports.types.${airport.type}`)
                })}
              </p>
            </div>

            {/* Facilities grid (balanced after removing the Terminals card) */}
            <div className="airport-facilities mb-5">
              <h2 className="h4 fw-semibold mb-4 text-center">{t('airports.facilitiesTitleI', 'Facilities & Services')}</h2>

              <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 justify-content-center">
                {/* Duty-Free Shops (RAK only) */}
                <div className="col d-flex">
                  <div
                    className={`card facility-card clickable h-100 w-100 ${isRAK ? '' : 'disabled-card'}`}
                    style={isRAK ? { cursor: 'pointer' } : {}}
                    onClick={isRAK ? () => setShowDutyFree(true) : undefined}
                  >
                    <i className="fas fa-shopping-bag icon mb-3"></i>
                    <h5 className="card-title">{t('airports.facilitiesTitle.shops', 'Duty-Free Shops')}</h5>
                    <p className="card-text text-muted">
                      {t('airports.facilitiesDescriptions.shops', 'Find exclusive goods and great deals.')}
                    </p>
                    {isRAK && <span className="hint">{t('airports.clickForDetails', 'Click for details')}</span>}
                  </div>
                </div>

                {/* Restaurants (RAK only) */}
                <div className="col d-flex">
                  <div
                    className={`card facility-card clickable h-100 w-100 ${isRAK ? '' : 'disabled-card'}`}
                    style={isRAK ? { cursor: 'pointer' } : {}}
                    onClick={isRAK ? () => setShowRestaurants(true) : undefined}
                  >
                    <i className="fas fa-utensils icon mb-3"></i>
                    <h5 className="card-title">{t('airports.facilitiesTitle.restaurants', 'Restaurants & Cafés')}</h5>
                    <p className="card-text text-muted">
                      {t('airports.facilitiesDescriptions.restaurants', 'A wide selection of dining options for all tastes.')}
                    </p>
                    {isRAK && <span className="hint">{t('airports.clickForDetails', 'Click for details')}</span>}
                  </div>
                </div>

                {/* Free Wi-Fi (always) */}
                <div className="col d-flex">
                  <div
                    className="card facility-card clickable h-100 w-100"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setShowWifi(true)}
                  >
                    <i className="fas fa-wifi icon mb-3"></i>
                    <h5 className="card-title">{t('airports.facilitiesTitle.wifi', 'Free Wi-Fi')}</h5>
                    <p className="card-text text-muted">
                      {t('airports.facilitiesDescriptions.wifi', 'Enjoy fast and reliable internet access.')}
                    </p>
                    <span className="hint">{t('airports.clickForDetails', 'Click for details')}</span>
                  </div>
                </div>

                {/* Parking (RAK only) */}
                <div className="col d-flex">
                  <div
                    className={`card facility-card clickable h-100 w-100 ${isRAK ? '' : 'disabled-card'}`}
                    style={isRAK ? { cursor: 'pointer' } : {}}
                    onClick={isRAK ? () => setShowParking(true) : undefined}
                  >
                    <i className="fas fa-parking icon mb-3"></i>
                    <h5 className="card-title">{t('airports.facilitiesTitle.parking', 'Parking')}</h5>
                    <p className="card-text text-muted">
                      {t('airports.facilitiesDescriptions.parking', 'Short-term and long-term parking available.')}
                    </p>
                    {isRAK && <span className="hint">{t('airports.clickForDetails', 'Click for details')}</span>}
                  </div>
                </div>

                {/* Currency Exchange (RAK only) */}
                <div className="col d-flex">
                  <div
                    className={`card facility-card clickable h-100 w-100 ${isRAK ? '' : 'disabled-card'}`}
                    style={isRAK ? { cursor: 'pointer' } : {}}
                    onClick={isRAK ? () => setShowCurrency(true) : undefined}
                  >
                    <i className="fas fa-exchange-alt icon mb-3"></i>
                    <h5 className="card-title">{t('airports.facilitiesTitle.currency', 'Currency Exchange')}</h5>
                    <p className="card-text text-muted">
                      {t('airports.facilitiesDescriptions.currency', 'Convenient services for international travelers.')}
                    </p>
                    {isRAK && <span className="hint">{t('airports.clickForDetails', 'Click for details')}</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* --- RAK: Restaurants Modal --- */}
            {isRAK && showRestaurants && (
              <div className="rak-restaurants-modal">
                <div className="rak-restaurants-modal-content shadow rounded">
                  <div className="modal-header d-flex justify-content-between align-items-center p-3 border-bottom">
                    <h5 className="modal-title fw-bold">
                      {t('airports.facilitiesTitle.restaurants', 'Restaurants & Cafés')} - {airport.code}
                    </h5>
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowRestaurants(false)}></button>
                  </div>
                  <div className="modal-body p-4">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>{t('airports.restaurant.name', 'Restaurant')}</th>
                          <th>{t('airports.restaurant.zone', 'Zone')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rakRestaurants.map((r, i) => (
                          <tr key={i}>
                            <td>{r.name}</td>
                            <td>{r.zone}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="modal-footer p-3 border-top text-end">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowRestaurants(false)}>
                      {t('common.close', 'Close')}
                    </button>
                  </div>
                </div>
                <div className="rak-restaurants-modal-backdrop" onClick={() => setShowRestaurants(false)}></div>
              </div>
            )}

            {/* --- RAK: Currency Modal --- */}
            {isRAK && showCurrency && (
              <div className="rak-restaurants-modal">
                <div className="rak-restaurants-modal-content shadow rounded">
                  <div className="modal-header d-flex justify-content-between align-items-center p-3 border-bottom">
                    <h5 className="modal-title fw-bold">
                      {t('airports.facilitiesTitle.currency', 'Currency Exchange')} - {airport.code}
                    </h5>
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowCurrency(false)}></button>
                  </div>
                  <div className="modal-body p-4">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>{t('airports.currency.agency', 'Agency')}</th>
                          <th>{t('airports.currency.zone', 'Zone')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rakCurrencyAgencies.map((a, i) => (
                          <tr key={i}>
                            <td>{a.name}</td>
                            <td>{a.zone}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="modal-footer p-3 border-top text-end">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowCurrency(false)}>
                      {t('common.close', 'Close')}
                    </button>
                  </div>
                </div>
                <div className="rak-restaurants-modal-backdrop" onClick={() => setShowCurrency(false)}></div>
              </div>
            )}

            {/* --- All airports: Wi-Fi Modal --- */}
            {showWifi && (
              <div className="rak-restaurants-modal">
                <div className="rak-restaurants-modal-content shadow rounded">
                  <div className="modal-header d-flex justify-content-between align-items-center p-3 border-bottom">
                    <h5 className="modal-title fw-bold">{t('airports.wifi.title', 'Free Wi-Fi')}</h5>
                    <button type="button" className="btn-close" onClick={() => setShowWifi(false)}></button>
                  </div>
                  <div className="modal-body p-4">
                    <p style={{ whiteSpace: 'pre-line' }}>{t('airports.wifi.body')}</p>
                  </div>
                  <div className="modal-footer p-3 border-top text-end">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowWifi(false)}>
                      {t('common.close', 'Close')}
                    </button>
                  </div>
                </div>
                <div className="rak-restaurants-modal-backdrop" onClick={() => setShowWifi(false)}></div>
              </div>
            )}

            {/* --- RAK: Duty-Free Modal --- */}
{isRAK && showDutyFree && (
  <div className="rak-restaurants-modal">
    <div className="rak-restaurants-modal-content shadow rounded container-fluid" style={{ maxWidth: '90vw' }}>
      
      {/* HEADER */}
      <div className="modal-header d-flex justify-content-between align-items-center p-3 border-bottom">
        <h5 className="modal-title fw-bold">
          {t('airports.dutyfree.title', 'Duty-Free Shops')} - {airport.code}
        </h5>
        <button type="button" className="btn-close" onClick={() => setShowDutyFree(false)}></button>
      </div>

      {/* BODY */}
      <div className="modal-body p-4" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <div className="row g-4">
          
          {/* Atelier M */}
          <div className="col-md-6 dutyfree-item">
            <img src="/images/dutyfree/atelierm.jpg" alt="Atelier M" className="img-fluid rounded mb-2" />
            <h6 className="fw-bold">{t('airports.dutyfree.atelierM.name')}</h6>
            <p>{t('airports.dutyfree.atelierM.desc')}</p>
          </div>

          {/* Attitude */}
          <div className="col-md-6 dutyfree-item">
            <img src="/images/dutyfree/attitude.jpg" alt="Attitude" className="img-fluid rounded mb-2" />
            <h6 className="fw-bold">{t('airports.dutyfree.attitude.name')}</h6>
            <p>{t('airports.dutyfree.attitude.desc')}</p>
          </div>

          {/* Hudson */}
          <div className="col-md-6 dutyfree-item">
            <img src="/images/dutyfree/hudson.jpg" alt="Hudson" className="img-fluid rounded mb-2" />
            <h6 className="fw-bold">{t('airports.dutyfree.hudson.name')}</h6>
            <p>{t('airports.dutyfree.hudson.desc')}</p>
          </div>

          {/* Table du Marché */}
          <div className="col-md-6 dutyfree-item">
            <img src="/images/dutyfree/tabledumarche.jpg" alt="Table du Marché" className="img-fluid rounded mb-2" />
            <h6 className="fw-bold">{t('airports.dutyfree.tableDuMarche.name')}</h6>
            <p>{t('airports.dutyfree.tableDuMarche.desc')}</p>
          </div>

          {/* Montblanc */}
          <div className="col-md-6 dutyfree-item">
            <img src="/images/dutyfree/montblanc.jpg" alt="Montblanc" className="img-fluid rounded mb-2" />
            <h6 className="fw-bold">{t('airports.dutyfree.montblanc.name')}</h6>
            <p>{t('airports.dutyfree.montblanc.desc')}</p>
          </div>

          {/* Matsuri */}
          <div className="col-md-6 dutyfree-item">
            <img src="/images/dutyfree/matsuri.jpg" alt="Matsuri" className="img-fluid rounded mb-2" />
            <h6 className="fw-bold">{t('airports.dutyfree.matsuri.name')}</h6>
            <p>{t('airports.dutyfree.matsuri.desc')}</p>
          </div>

          {/* Paul */}
          <div className="col-md-6 dutyfree-item">
            <img src="/images/dutyfree/paul.jpg" alt="Paul" className="img-fluid rounded mb-2" />
            <h6 className="fw-bold">{t('airports.dutyfree.paul.name')}</h6>
            <p>{t('airports.dutyfree.paul.desc')}</p>
          </div>

          {/* Segafredo */}
          <div className="col-md-6 dutyfree-item">
            <img src="/images/dutyfree/segafredo.jpg" alt="Segafredo" className="img-fluid rounded mb-2" />
            <h6 className="fw-bold">{t('airports.dutyfree.segafredo.name')}</h6>
            <p>{t('airports.dutyfree.segafredo.desc')}</p>
          </div>

          {/* Starbucks */}
          <div className="col-md-6 dutyfree-item">
            <img src="/images/dutyfree/starbucks.jpg" alt="Starbucks" className="img-fluid rounded mb-2" />
            <h6 className="fw-bold">{t('airports.dutyfree.starbucks.name')}</h6>
            <p>{t('airports.dutyfree.starbucks.desc')}</p>
          </div>

          {/* Sun Catcher */}
          <div className="col-md-6 dutyfree-item">
            <img src="/images/dutyfree/suncatcher.jpg" alt="Sun Catcher" className="img-fluid rounded mb-2" />
            <h6 className="fw-bold">{t('airports.dutyfree.sunCatcher.name')}</h6>
            <p>{t('airports.dutyfree.sunCatcher.desc')}</p>
          </div>

          {/* Travel Star */}
          <div className="col-md-6 dutyfree-item">
            <img src="/images/dutyfree/travelstar.jpg" alt="Travel Star" className="img-fluid rounded mb-2" />
            <h6 className="fw-bold">{t('airports.dutyfree.travelStar.name')}</h6>
            <p>{t('airports.dutyfree.travelStar.desc')}</p>
          </div>

          {/* Victoria's Secret */}
          <div className="col-md-6 dutyfree-item">
            <img src="/images/dutyfree/victoriassecret.jpg" alt="Victoria's Secret" className="img-fluid rounded mb-2" />
            <h6 className="fw-bold">{t('airports.dutyfree.victoriasSecret.name')}</h6>
            <p>{t('airports.dutyfree.victoriasSecret.desc')}</p>
          </div>

          {/* Generic Duty-Free */}
          <div className="col-md-6 dutyfree-item">
            <img src="/images/dutyfree/dutyfree.jpg" alt="Duty-Free" className="img-fluid rounded mb-2" />
            <h6 className="fw-bold">{t('airports.dutyfree.dutyFree.name')}</h6>
            <p>{t('airports.dutyfree.dutyFree.desc')}</p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="modal-footer p-3 border-top text-end">
        <button type="button" className="btn btn-secondary" onClick={() => setShowDutyFree(false)}>
          {t('common.close', 'Close')}
        </button>
      </div>
    </div>

    {/* BACKDROP */}
    <div className="rak-restaurants-modal-backdrop" onClick={() => setShowDutyFree(false)}></div>
  </div>
)}



            {/* --- RAK: Parking Modal --- */}
            {isRAK && showParking && (
              <div className="rak-restaurants-modal" >
                <div className="rak-restaurants-modal-content shadow rounded">
                  <div className="modal-header d-flex justify-content-between align-items-center p-3 border-bottom">
                    <h5 className="modal-title fw-bold">
                      {t('airports.facilitiesTitle.parking', 'Parking')} - {airport.code}
                    </h5>
                    <button type="button" className="btn-close" onClick={() => setShowParking(false)}></button>
                  </div>
                  <div className="modal-body p-4" ref={parkingBodyRef}>
                    <p className="mb-3">{t('airports.parking.intro')}</p>
                    <ul>
                      <li>{t('airports.parking.short')}</li>
                      <li>{t('airports.parking.long')}</li>
                    </ul>
                    <p className="mt-3">
                      <strong>{t('airports.parking.cleaningTitle')}</strong> — {t('airports.parking.cleaningDesc')}
                    </p>

                    <h6 className="fw-bold mt-4">{t('airports.parking.tableTitle')}</h6>
                            <div className="parking-images">
          <img src="/images/parking/parking.jpg" alt="Parking View 1" />

        </div>
                    <table className="table table-bordered mt-2">
                      <thead>
                        <tr>
                          <th>{t('airports.parking.tableHeaders.type')}</th>
                          <th>{t('airports.parking.tableHeaders.duration')}</th>
                          <th>{t('airports.parking.tableHeaders.price')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td>{t('airports.parking.rows.short')}</td><td>{t('airports.parking.rows.perHour')}</td><td>5 MAD</td></tr>
                        <tr><td>{t('airports.parking.rows.short')}</td><td>{t('airports.parking.rows.perDay')}</td><td>60 MAD</td></tr>
                        <tr><td>{t('airports.parking.rows.long')}</td><td>{t('airports.parking.rows.oneDay')}</td><td>60 MAD</td></tr>
                        <tr><td>{t('airports.parking.rows.long')}</td><td>{t('airports.parking.rows.multiDay')}</td><td>60 MAD/{t('airports.parking.rows.perDayShort')}</td></tr>
                        <tr><td>{t('airports.parking.rows.cleaning')}</td><td>{t('airports.parking.rows.extWash')}</td><td>50 MAD</td></tr>
                        <tr><td>{t('airports.parking.rows.cleaning')}</td><td>{t('airports.parking.rows.fullClean')}</td><td>150 MAD</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="modal-footer p-3 border-top text-end">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowParking(false)}>
                      {t('common.close', 'Close')}
                    </button>
                  </div>
                        <button
        type="button"
        className="scroll-fab"
        aria-label="Scroll to bottom"
        onClick={() =>
          parkingBodyRef.current?.scrollTo({
            top: parkingBodyRef.current.scrollHeight,
            behavior: 'smooth'
          })
        }
      >
                <i className="fas fa-arrow-down"></i>
      </button>
                </div>
                <div className="rak-restaurants-modal-backdrop" onClick={() => setShowParking(false)}></div>
              </div>
            )}
          </div>

          <div className="col-lg-4">
            <div className="airport-sidebar">
              <div className="mb-4">
                <WeatherWidget city={t(`cities.${airport.city}`)} />
              </div>

              <div className="card mb-4 shadow-sm">
                <div className="card-header bg-primary text-white">
                  <h3 className="h6 mb-0">{t('airports.quickInfo', 'Quick Information')}</h3>
                </div>
                <div className="card-body">
                  <div className="info-item mb-2">
                    <div className="info-label fw-bold text-muted">{t('airports.code', 'Airport Code')}</div>
                    <div className="info-value">{airport.code}</div>
                  </div>
                  <div className="info-item mb-2">
                    <div className="info-label fw-bold text-muted">{t('airports.location', 'Location')}</div>
                    <div className="info-value">{t(`cities.${airport.city}`)}</div>
                  </div>
                  <div className="info-item">
                    <div className="info-label fw-bold text-muted">{t('airports.type', 'Type')}</div>
                    <div className="info-value">{t(`airports.types.${airport.type}`)}</div>
                  </div>
                </div>
              </div>

              <div className="card mb-4 shadow-sm">
                <div className="card-header text-white" id="useful_links">
                  <h3 className="h6 mb-0">{t('airports.links', 'Useful Links')}</h3>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <Link to="/flights" className="text-decoration-none">
                        <i className="fas fa-plane me-2"></i> {t('airports.flightSchedules', 'Flight Schedules')}
                      </Link>
                    </li>
                    <li className="list-group-item">
                      <Link to="/services" className="text-decoration-none">
                        <i className="fas fa-concierge-bell me-2"></i> {t('airports.services', 'Airport Services')}
                      </Link>
                    </li>
                    <li className="list-group-item">
                      <Link to="/contact" className="text-decoration-none">
                        <i className="fas fa-envelope me-2"></i> {t('airports.contact', 'Contact')}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="my-4">
          <Link to="/airports" className="btn btn-outline-primary">
            <i className="fas fa-arrow-left me-2"></i> {t('common.backToList', 'Back to Airports')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AirportDetail;
