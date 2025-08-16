// src/components/airports/AirportList.js
import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FlightLoader from '../../FlightLoader';
import './AirportList.css';

/**
 * Compact airport rows to reduce duplication
 * [code, city, nameKey, type, imageFile]
 */
const AIRPORT_ROWS = [
  ['RAK','marrakech','menara','international','marrakech-airport.jpg'],
  ['CMN','casablanca','mohammed_v','international','casablanca-airport.jpg'],
  ['AGA','agadir','al_massira','international','agadir-airport.jpg'],
  ['AHU','al_hoceima','cherif_al_idrissi','regional','cherif-al-idrissi-airport.jpg'],
  ['BEM','beni_mellal','beni_mellal','regional','beni-mellal-airport.jpg'],
  ['ERH','errachidia','moulay_ali_cherif','regional','moulay-ali-cherif-airport.jpg'],
  ['ESU','essaouira','essaouira_mogador','regional','essaouira-airport.jpg'],
  ['FEZ','fes','fes_sais','international','fes-airport.jpg'],
  ['NDR','nador','nador_international','international','nador-airport.jpg'],
  ['OZZ','ouarzazate','ouarzazate','regional','ouarzazate-airport.jpg'],
  ['OUD','oujda','oujda_angads','international','oujda-airport.jpg'],
  ['RBA','rabat','rabat_sale','international','rabat-airport.jpg'],
  ['TNG','tangier','tangier_ibn_battouta','international','tangier-airport.jpg'],
  ['TTU','tetouan','tetouan_sania_ramel','regional','tetouan-airport.jpg'],
  ['VIL','dakhla','dakhla','regional','dakhla-airport.jpg'],
  ['EUN','laayoune','hassan_i','international','laayoune-airport.jpg'],
  ['TTA','tan_tan','tan_tan_plage_blanche','regional','tan-tan-airport.jpg'],
  ['GLN','guelmim','guelmim','regional','guelmim-airport.jpg'],
  ['OZG','zagora','zagora','regional','zagora-airport.jpg'],
  ['UAR','bouarfa','bouarfa','regional','bouarfa-airport.jpg'],
];

// Single source of truth for airports as objects
export const airports = AIRPORT_ROWS.map(([code, city, name, type, imageFile]) => ({
  code,
  city,
  name,
  type,
  image: `/images/airports/${imageFile}`,
}));

const airportShape = PropTypes.shape({
  code: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
});

// Small presentational component to avoid JSX repetition
const AirportCard = memo(function AirportCard({ airport }) {
  const { t } = useTranslation();

  const title = t(`airports.names.${airport.name}`);
  const city = t(`cities.${airport.city}`);
  const type = t(`airports.types.${airport.type}`);

  return (
    <div className="col-lg-4 col-md-6">
      <div className="airport-card h-100">
        <img
          src={airport.image}
          alt={title}
          className="airport-image"
          loading="lazy"
        />
        <div className="airport-content">
          <h2 className="airport-title">{title}</h2>
          <div className="airport-code-city">
            {airport.code} - {city}
          </div>
          <p className="airport-description">
            {t(`airports.descriptions.${airport.code}`, { city, type })}
          </p>
          <div className="airport-actions">
            <Link to={`/airports/${airport.code}`} className="btn btn-primary">
              {t('airports.viewDetails')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});

AirportCard.propTypes = {
  airport: airportShape.isRequired,
};

const AirportList = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <FlightLoader />;

  return (
    <div className="airports-page" style={{ backgroundColor: 'white' }}>
      <div className="container py-5">
        <h1 className="mb-5">{t('airports.pageTitle', 'Morocco Airports')}</h1>
        <div className="row g-4">
          {airports.map((airport) => (
            <AirportCard key={airport.code} airport={airport} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AirportList;

