import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import FlightSearchForm from './FlightSearchForm';
import FlightResults from './FlightResults';
import './flights.css';

const FlightPage = () => {
  const { t, i18n } = useTranslation();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);
  const [airports, setAirports] = useState([]);
  const [searchParams, setSearchParams] = useState(null);

  // Fetch airport data on component mount
  useEffect(() => {
    axios.get('http://localhost:8080/api/airports')
        .then(response => {
          if (Array.isArray(response.data)) {
            setAirports(response.data);
            console.log(t('flight.airportsLoaded', { count: response.data.length }));
          } else {
            console.warn(t('flight.invalidAirportData'));
          }
        })
        .catch(error => {
          console.error(t('flight.airportLoadError'), error);
        });
  }, [t]);

  const handleSearch = (params) => {
    setLoading(true);
    setSearched(true);
    setError('');
    setSearchParams(params);

    const url = `http://localhost:8080/api/flights/search?departure=${params.departure}&arrival=${params.arrival}&date=${params.date}`;

    axios.get(url)
        .then(response => {
          let processedData = Array.isArray(response.data) ? response.data : [];

          processedData = processedData.map(flight => {
            const departureAirport = airports.find(a =>
                a.code === flight.departure_airport_id ||
                a.id === flight.departure_airport_id ||
                a.code === params.departure
            );

            const arrivalAirport = airports.find(a =>
                a.code === flight.arrival_airport_id ||
                a.id === flight.arrival_airport_id ||
                a.code === params.arrival
            );

            const flightNumber = flight.flight_number || flight.flightNumber;
            let airlineName = flight.airline_name || flight.airlineName;

            // Fallback: try to get airline name from prefix translation
            if (!airlineName && flightNumber) {
              const prefix = flightNumber.substring(0, 2);
              airlineName = t(`airlines.${prefix}`, {
                defaultValue: t('airlines.default', { prefix }),
              });
            }

            return {
              ...flight,
              origin_code: departureAirport?.code || flight.origin_code || params.departure,
              origin_city: departureAirport?.city || flight.origin_city,
              destination_code: arrivalAirport?.code || flight.destination_code || params.arrival,
              destination_city: arrivalAirport?.city || flight.destination_city,
              airline_name: airlineName,
            };
          });

          setFlights(processedData);
          setLoading(false);
        })
        .catch(error => {
          console.error(t('flight.searchError'), error);
          setError(t('flight.searchErrorMessage'));
          setFlights([]);
          setLoading(false);
        });
  };

  return (
      <div className={`container py-4 ${i18n.language === 'ar' ? 'rtl' : ''}`}>
        <h2 className="mb-4">{t('flight.title')}</h2>

        <FlightSearchForm onSearch={handleSearch} airports={airports} />

        {searched && (
            <FlightResults
                flights={flights}
                loading={loading}
                error={error}
                searchParams={searchParams}
            />
        )}
      </div>
  );
};

export default FlightPage;
