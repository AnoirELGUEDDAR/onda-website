import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './AirportList.css';

// Complete list of all Moroccan airports
// Added "export" keyword here to fix the error
export const airports = [
  {
    code: 'CMN',
    city: 'casablanca',
    name: 'mohammed_v',
    type: 'international',
    image: '/images/airports/casablanca-airport.jpg',
  },
  {
    code: 'RAK',
    city: 'marrakech',
    name: 'menara',
    type: 'international',
    image: '/images/airports/marrakech-airport.jpg',
  },
  {
    code: 'AGA',
    city: 'agadir',
    name: 'al_massira',
    type: 'international',
    image: '/images/airports/agadir-airport.jpg',
  },
  {
    code: 'AHU',
    city: 'al_hoceima',
    name: 'cherif_al_idrissi',
    type: 'regional',
    image: '/images/airports/cherif-al-idrissi-airport.jpg',
  },
  {
    code: 'BEM',
    city: 'beni_mellal',
    name: 'beni_mellal',
    type: 'regional',
    image: '/images/airports/beni-mellal-airport.jpg',
  },
  {
    code: 'ERH',
    city: 'errachidia',
    name: 'moulay_ali_cherif',
    type: 'regional',
    image: '/images/airports/moulay-ali-cherif-airport.jpg',
  },
  {
    code: 'ESU',
    city: 'essaouira',
    name: 'essaouira_mogador',
    type: 'regional',
    image: '/images/airports/essaouira-airport.jpg',
  },
  {
    code: 'FEZ',
    city: 'fes',
    name: 'fes_sais',
    type: 'international',
    image: '/images/airports/fes-airport.jpg',
  },
  {
    code: 'NDR',
    city: 'nador',
    name: 'nador_international',
    type: 'international',
    image: '/images/airports/nador-airport.jpg',
  },
  {
    code: 'OZZ',
    city: 'ouarzazate',
    name: 'ouarzazate',
    type: 'regional',
    image: '/images/airports/ouarzazate-airport.jpg',
  },
  {
    code: 'OUD',
    city: 'oujda',
    name: 'oujda_angads',
    type: 'international',
    image: '/images/airports/oujda-airport.jpg',
  },
  {
    code: 'RBA',
    city: 'rabat',
    name: 'rabat_sale',
    type: 'international',
    image: '/images/airports/rabat-airport.jpg',
  },
  {
    code: 'TNG',
    city: 'tangier',
    name: 'tangier_ibn_battouta',
    type: 'international',
    image: '/images/airports/tangier-airport.jpg',
  },
  {
    code: 'TTU',
    city: 'tetouan',
    name: 'tetouan_sania_ramel',
    type: 'regional',
    image: '/images/airports/tetouan-airport.jpg',
  },
  {
    code: 'VIL',
    city: 'dakhla',
    name: 'dakhla',
    type: 'regional',
    image: '/images/airports/dakhla-airport.jpg',
  },
  {
    code: 'EUN',
    city: 'laayoune',
    name: 'hassan_i',
    type: 'international',
    image: '/images/airports/laayoune-airport.jpg',
  },
  {
    code: 'TTA',
    city: 'tan_tan',
    name: 'tan_tan_plage_blanche',
    type: 'regional',
    image: '/images/airports/tan-tan-airport.jpg',
  },
  {
    code: 'GLN',
    city: 'guelmim',
    name: 'guelmim',
    type: 'regional',
    image: '/images/airports/guelmim-airport.jpg',
  },
  {
    code: 'OZG',
    city: 'zagora',
    name: 'zagora',
    type: 'regional',
    image: '/images/airports/zagora-airport.jpg',
  },
  {
    code: 'UAR',
    city: 'bouarfa',
    name: 'bouarfa',
    type: 'regional',
    image: '/images/airports/bouarfa-airport.jpg',
  }
];

const AirportList = () => {
  const { t } = useTranslation();

  return (
      <div className="airports-page" style={{backgroundColor: 'white'}}>
        <div className="container py-5">
          <h1 className="mb-5">{t('airports.pageTitle', 'Morocco Airports')}</h1>

          <div className="row g-4">
            {airports.map((airport) => (
                <div className="col-lg-4 col-md-6" key={airport.code}>
                  <div className="airport-card h-100">
                    <img
                        src={airport.image}
                        alt={t(`airports.names.${airport.name}`)}
                        className="airport-image"
                    />
                    <div className="airport-content">
                      <h2 className="airport-title">
                        {t(`airports.names.${airport.name}`)}
                      </h2>
                      <div className="airport-code-city">
                        {airport.code} - {t(`cities.${airport.city}`)}
                      </div>
                      <p className="airport-description">
                        {t(`airports.descriptions.${airport.code}`, {
                          city: t(`cities.${airport.city}`),
                          type: t(`airports.types.${airport.type}`)
                        })}
                      </p>
                      <div className="airport-actions">
                        {/* Update link to match your route in App.js */}
                        <Link to={`/airports/${airport.code}`} className="btn btn-primary">
                          {t('airports.viewDetails')}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default AirportList;