import React, { useEffect, useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import WeatherWidget from '../weather/WeatherWidget';
import { airports } from './AirportList';
import './AirportDetail.css';

/* ---------- Small utilities ---------- */
const useToggle = (initial = false) => {
  const [open, setOpen] = useState(initial);
  return [open, () => setOpen(true), () => setOpen(false)];
};

const FacilityCard = ({ icon, title, desc, enabled = true, onClick, hint }) => (
  <div className="col d-flex">
    <button
      type="button"
      className={`card facility-card clickable h-100 w-100 ${enabled ? '' : 'disabled-card'}`}
      onClick={onClick}
      disabled={!enabled}
      aria-disabled={!enabled}
    >
      <i className={`fas ${icon} icon mb-3`} aria-hidden="true"></i>
      <h5 className="card-title">{title}</h5>
      <p className="card-text text-muted">{desc}</p>
      {enabled && hint ? <span className="hint">{hint}</span> : null}
    </button>
  </div>
);

FacilityCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  desc: PropTypes.node.isRequired,
  enabled: PropTypes.bool,
  onClick: PropTypes.func,
  hint: PropTypes.node,
};

/** Accessible native <dialog> */
const Modal = ({ title, open, onClose, children, wide = false, bodyRef, closeLabel = 'Close' }) => {
  const dialogRef = useRef(null);
  const titleId = useMemo(() => `dlg-${Math.random().toString(36).slice(2)}`, []);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    
    if (open) {
      dlg.showModal();
    }

    const handleCancel = (e) => {
      e.preventDefault();
      onClose?.();
    };
    
    dlg.addEventListener('cancel', handleCancel);
    return () => {
      dlg.removeEventListener('cancel', handleCancel);
      dlg.close();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      className={`rak-dialog ${wide ? 'container-fluid' : ''}`}
      aria-labelledby={titleId}
    >
      <div className="modal-header d-flex justify-content-between align-items-center p-3 border-bottom">
        <h5 id={titleId} className="modal-title fw-bold">{title}</h5>
        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
      </div>

      <div className="modal-body p-4" style={{ maxHeight: '80vh', overflowY: 'auto' }} ref={bodyRef}>
        {children}
      </div>

      <div className="modal-footer p-3 border-top text-end">
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          {closeLabel}
        </button>
      </div>
    </dialog>
  );
};

Modal.propTypes = {
  title: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  wide: PropTypes.bool,
  bodyRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]),
  closeLabel: PropTypes.node,
};

const SimpleTable = ({ columns, rows, rowKey }) => (
  <table className="table table-bordered">
    <thead>
      <tr>{columns.map((c) => <th key={c.key || String(c.label)}>{c.label}</th>)}</tr>
    </thead>
    <tbody>
      {rows.map((r, i) => {
        const key = rowKey ? rowKey(r, i) : i;
        return (
          <tr key={key}>
            {columns.map((c, j) => (
              <td key={(c.key || String(c.label)) + '-' + j}>{c.render ? c.render(r) : r[c.key]}</td>
            ))}
          </tr>
        );
      })}
    </tbody>
  </table>
);

SimpleTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    label: PropTypes.node.isRequired,
    render: PropTypes.func,
  })).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowKey: PropTypes.func,
};

/* ---------- Static data (RAK) ---------- */
const rakRestaurants = [
  { name: 'Illy', zone: 'Hall Public / Sous Douane' },
  { name: 'MAZAR', zone: 'Hall Public' },
  { name: 'PAUL', zone: 'Sous Douane' },
  { name: 'SEGAFREDO', zone: 'Sous Douane' },
  { name: 'STARBUCKS COFFEE', zone: 'Sous Douane' },
  { name: 'MEDINA', zone: 'Sous Douane' },
  { name: 'LA TABLE DU MARCHE', zone: 'Hall Public / Sous Douane' },
  { name: 'MATSURI', zone: 'Sous Douane' },
  { name: 'POMME DE PAIN', zone: 'Sous Douane' }
];

const rakCurrencyAgencies = [
  { name: 'BANQUE CENTRALE POPULAIRE', zone: 'Hall Public' },
  { name: 'AL BARID BANK', zone: 'Hall Public' },
  { name: 'BMCE BANK', zone: 'Hall Public / Sous Douane' },
  { name: 'GLOBAL BLUE MAROC', zone: 'Hall Public' },
  { name: 'GLOBAL EXCHANGE FOREING EXCHANGE MAROC', zone: 'Hall Public / Sous Douane' }
];

// key matches i18n: airports.dutyfree.<key>.{name,desc}
const DUTYFREE_ITEMS = [
  ['atelierM', 'atelierm.jpg', 'Atelier M'],
  ['attitude', 'attitude.jpg', 'Attitude'],
  ['hudson', 'hudson.jpg', 'Hudson'],
  ['tableDuMarche', 'tabledumarche.jpg', 'Table du Marché'],
  ['montblanc', 'montblanc.jpg', 'Montblanc'],
  ['matsuri', 'matsuri.jpg', 'Matsuri'],
  ['paul', 'paul.jpg', 'Paul'],
  ['segafredo', 'segafredo.jpg', 'Segafredo'],
  ['starbucks', 'starbucks.jpg', 'Starbucks'],
  ['sunCatcher', 'suncatcher.jpg', 'Sun Catcher'],
  ['travelStar', 'travelstar.jpg', 'Travel Star'],
  ['victoriasSecret', 'victoriassecret.jpg', "Victoria's Secret"],
  ['dutyFree', 'dutyfree.jpg', 'Duty-Free'],
];

const AirportDetail = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const parkingBodyRef = useRef(null);

  const [airport, setAirport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Toggles
  const [showRestaurants, openRestaurants, closeRestaurants] = useToggle(false);
  const [showCurrency, openCurrency, closeCurrency] = useToggle(false);
  const [showDutyFree, openDutyFree, closeDutyFree] = useToggle(false);
  const [showWifi, openWifi, closeWifi] = useToggle(false);
  const [showParking, openParking, closeParking] = useToggle(false);

  useEffect(() => {
    try {
      const found = airports.find((a) => a.code === id.toUpperCase());
      if (!found) setError(true);
      else {
        setAirport(found);
        setError(false);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const isRAK = airport?.code === 'RAK';

  const parkingRows = useMemo(
    () => [
      { type: t('airports.parking.rows.short'),  duration: t('airports.parking.rows.perHour'),    price: '5 MAD' },
      { type: t('airports.parking.rows.short'),  duration: t('airports.parking.rows.perDay'),     price: '60 MAD' },
      { type: t('airports.parking.rows.long'),   duration: t('airports.parking.rows.oneDay'),     price: '60 MAD' },
      { type: t('airports.parking.rows.long'),   duration: `${t('airports.parking.rows.multiDay')} / ${t('airports.parking.rows.perDayShort')}`, price: '60 MAD' },
      { type: t('airports.parking.rows.cleaning'), duration: t('airports.parking.rows.extWash'),  price: '50 MAD' },
      { type: t('airports.parking.rows.cleaning'), duration: t('airports.parking.rows.fullClean'), price: '150 MAD' },
    ],
    [i18n.language, t] 
  );

  if (loading) {
    return (
      <div className="airport-detail-container">
        <div className="container py-5">
          <div className="loading-indicator text-center">
            <output className="spinner-border text-primary" aria-live="polite">
              <span className="visually-hidden">{t('common.loading', 'Loading...')}</span>
            </output>
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

  return (
    <div className="airport-detail-container">
      <div className="container py-5">
        <div className="row">
          {/* Main content */}
          <div className="col-lg-8">
            <h1 className="airport-title mb-4 display-5 fw-bold">{t(`airports.names.${airport.name}`)}</h1>

            <div className="airport-code-location mb-3">
              <span className="airport-code h5 text-primary">{airport.code}</span>
              <span className="mx-2" aria-hidden="true">&ndash;</span>
              <span className="airport-city h5">{t(`cities.${airport.city}`)}</span>
            </div>

            <div className="airport-image-main mb-4">
              <img
                src={airport.image}
                alt={t(`airports.names.${airport.name}`)}
                className="img-fluid rounded shadow-sm"
                loading="lazy"
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

            {/* Facilities */}
            <div className="airport-facilities mb-5">
              <h2 className="h4 fw-semibold mb-4 text-center">
                {t('airports.facilitiesTitleI', 'Facilities & Services')}
              </h2>

              <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 justify-content-center">
                <FacilityCard
                  icon="fa-shopping-bag"
                  title={t('airports.facilitiesTitle.shops', 'Duty-Free Shops')}
                  desc={t('airports.facilitiesDescriptions.shops', 'Find exclusive goods and great deals.')}
                  enabled={isRAK}
                  onClick={openDutyFree}
                  hint={t('airports.clickForDetails', 'Click for details')}
                />
                <FacilityCard
                  icon="fa-utensils"
                  title={t('airports.facilitiesTitle.restaurants', 'Restaurants & Cafés')}
                  desc={t('airports.facilitiesDescriptions.restaurants', 'A wide selection of dining options for all tastes.')}
                  enabled={isRAK}
                  onClick={openRestaurants}
                  hint={t('airports.clickForDetails', 'Click for details')}
                />
                <FacilityCard
                  icon="fa-wifi"
                  title={t('airports.facilitiesTitle.wifi', 'Free Wi-Fi')}
                  desc={t('airports.facilitiesDescriptions.wifi', 'Enjoy fast and reliable internet access.')}
                  enabled
                  onClick={openWifi}
                  hint={t('airports.clickForDetails', 'Click for details')}
                />
                <FacilityCard
                  icon="fa-parking"
                  title={t('airports.facilitiesTitle.parking', 'Parking')}
                  desc={t('airports.facilitiesDescriptions.parking', 'Short-term and long-term parking available.')}
                  enabled={isRAK}
                  onClick={openParking}
                  hint={t('airports.clickForDetails', 'Click for details')}
                />
                <FacilityCard
                  icon="fa-exchange-alt"
                  title={t('airports.facilitiesTitle.currency', 'Currency Exchange')}
                  desc={t('airports.facilitiesDescriptions.currency', 'Convenient services for international travelers.')}
                  enabled={isRAK}
                  onClick={openCurrency}
                  hint={t('airports.clickForDetails', 'Click for details')}
                />
              </div>
            </div>

            {/* --- RAK: Restaurants Modal --- */}
            <Modal
              title={`${t('airports.facilitiesTitle.restaurants', 'Restaurants & Cafés')} - ${airport.code}`}
              open={isRAK && showRestaurants}
              onClose={closeRestaurants}
              closeLabel={t('common.close', 'Close')}
            >
              <SimpleTable
                columns={[
                  { key: 'name', label: t('airports.restaurant.name', 'Restaurant') },
                  { key: 'zone', label: t('airports.restaurant.zone', 'Zone') },
                ]}
                rows={rakRestaurants}
                rowKey={(r, i) => r.name + i}
              />
            </Modal>

            {/* --- RAK: Currency Modal --- */}
            <Modal
              title={`${t('airports.facilitiesTitle.currency', 'Currency Exchange')} - ${airport.code}`}
              open={isRAK && showCurrency}
              onClose={closeCurrency}
              closeLabel={t('common.close', 'Close')}
            >
              <SimpleTable
                columns={[
                  { key: 'name', label: t('airports.currency.agency', 'Agency') },
                  { key: 'zone', label: t('airports.currency.zone', 'Zone') },
                ]}
                rows={rakCurrencyAgencies}
                rowKey={(r, i) => r.name + i}
              />
            </Modal>

            {/* --- All airports: Wi-Fi Modal --- */}
            <Modal
              title={t('airports.wifi.title', 'Free Wi-Fi')}
              open={showWifi}
              onClose={closeWifi}
              closeLabel={t('common.close', 'Close')}
            >
              <p style={{ whiteSpace: 'pre-line' }}>{t('airports.wifi.body')}</p>
            </Modal>

            {/* --- RAK: Duty-Free Modal --- */}
            <Modal
              title={`${t('airports.dutyfree.title', 'Duty-Free Shops')} - ${airport.code}`}
              open={isRAK && showDutyFree}
              onClose={closeDutyFree}
              closeLabel={t('common.close', 'Close')}
              wide
            >
              <div className="row g-4">
                {DUTYFREE_ITEMS.map(([key, img, alt]) => (
                  <div className="col-md-6 dutyfree-item" key={key}>
                    <img
                      src={`/images/dutyfree/${img}`}
                      alt={alt}
                      className="img-fluid rounded mb-2"
                      loading="lazy"
                    />
                    <h6 className="fw-bold">{t(`airports.dutyfree.${key}.name`)}</h6>
                    <p>{t(`airports.dutyfree.${key}.desc`)}</p>
                  </div>
                ))}
              </div>
            </Modal>

            {/* --- RAK: Parking Modal --- */}
            <Modal
              title={`${t('airports.facilitiesTitle.parking', 'Parking')} - ${airport.code}`}
              open={isRAK && showParking}
              onClose={closeParking}
              closeLabel={t('common.close', 'Close')}
              bodyRef={parkingBodyRef}
            >
              <p className="mb-3">{t('airports.parking.intro')}</p>
              <ul>
                <li>{t('airports.parking.short')}</li>
                <li>{t('airports.parking.long')}</li>
              </ul>
              <p className="mt-3">
                <strong>{t('airports.parking.cleaningTitle')}</strong> &mdash; {t('airports.parking.cleaningDesc')}
              </p>

              <h6 className="fw-bold mt-4">{t('airports.parking.tableTitle')}</h6>
              <div className="parking-images">
                <img src="/images/parking/parking.jpg" alt="Parking View 1" loading="lazy" />
              </div>

              <SimpleTable
                columns={[
                  { key: 'type', label: t('airports.parking.tableHeaders.type') },
                  { key: 'duration', label: t('airports.parking.tableHeaders.duration') },
                  { key: 'price', label: t('airports.parking.tableHeaders.price') },
                ]}
                rows={parkingRows}
                rowKey={(r, i) => r.type + r.duration + i}
              />

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
                <i className="fas fa-arrow-down" aria-hidden="true"></i>
              </button>
            </Modal>
          </div>

          {/* Sidebar */}
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
                <div className="card-header text-white bg-secondary" id="useful_links">
                  <h3 className="h6 mb-0">{t('airports.links', 'Useful Links')}</h3>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <Link to="/flights" className="text-decoration-none">
                        <i className="fas fa-plane me-2" aria-hidden="true"></i> {t('airports.flightSchedules', 'Flight Schedules')}
                      </Link>
                    </li>
                    <li className="list-group-item">
                      <Link to="/services" className="text-decoration-none">
                        <i className="fas fa-concierge-bell me-2" aria-hidden="true"></i> {t('airports.services', 'Airport Services')}
                      </Link>
                    </li>
                    <li className="list-group-item">
                      <Link to="/contact" className="text-decoration-none">
                        <i className="fas fa-envelope me-2" aria-hidden="true"></i> {t('airports.contact', 'Contact')}
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
            <i className="fas fa-arrow-left me-2" aria-hidden="true"></i> {t('common.backToList', 'Back to Airports')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AirportDetail;
