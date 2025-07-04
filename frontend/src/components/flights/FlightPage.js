import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlightSearchForm from './FlightSearchForm';
import FlightResults from './FlightResults';
import './flights.css';

const FlightPage = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);
  const [airports, setAirports] = useState([]);
  const [searchParams, setSearchParams] = useState(null);
  
  // Charger les aéroports au démarrage
  useEffect(() => {
    axios.get('http://localhost:8080/api/airports')
      .then(response => {
        if (Array.isArray(response.data)) {
          setAirports(response.data);
          console.log('Airports loaded:', response.data.length);
        } else {
          console.warn('API did not return an array for airports');
        }
      })
      .catch(error => {
        console.error('Error loading airports:', error);
      });
  }, []);
  
  const handleSearch = (params) => {
    setLoading(true);
    setSearched(true);
    setError('');
    setSearchParams(params); // Sauvegarder les paramètres de recherche
    
    console.log("Search params:", params);
    
    // Construction de l'URL de recherche
    const url = `http://localhost:8080/api/flights/search?departure=${params.departure}&arrival=${params.arrival}&date=${params.date}`;
    
    axios.get(url)
      .then(response => {
        console.log("API Response:", response.data);
        
        // Traitement des données
        let processedData = Array.isArray(response.data) ? response.data : [];
        
        // Enrichir les données avec les informations d'origine et de destination
        processedData = processedData.map(flight => {
          // Rechercher les aéroports par code ou ID
          const departureAirport = airports.find(a => 
            a.code === flight.departure_airport_id || 
            a.id === flight.departure_airport_id ||
            a.code === params.departure);
          
          const arrivalAirport = airports.find(a => 
            a.code === flight.arrival_airport_id || 
            a.id === flight.arrival_airport_id ||
            a.code === params.arrival);
          
          // Déterminer les compagnies aériennes à partir des numéros de vol
          const flightNumber = flight.flight_number || flight.flightNumber;
          let airlineName = flight.airline_name || flight.airlineName;
          
          if (!airlineName && flightNumber) {
            const prefix = flightNumber.substring(0, 2);
            switch(prefix) {
              case 'AT': airlineName = 'Royal Air Maroc'; break;
              case '3O': airlineName = 'Air Arabia Maroc'; break;
              case 'TB': airlineName = 'Turkish Airlines'; break;
              case 'AF': airlineName = 'Air France'; break;
              case 'EK': airlineName = 'Emirates'; break;
              default: airlineName = `Compagnie ${prefix}`;
            }
          }
          
          return {
            ...flight,
            // Informations d'origine
            origin_code: departureAirport?.code || flight.origin_code || params.departure,
            origin_city: departureAirport?.city || flight.origin_city,
            
            // Informations de destination
            destination_code: arrivalAirport?.code || flight.destination_code || params.arrival,
            destination_city: arrivalAirport?.city || flight.destination_city,
            
            // Informations de compagnie aérienne
            airline_name: airlineName
          };
        });
        
        setFlights(processedData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error searching flights:', error);
        setError('Impossible de trouver des vols. Veuillez réessayer plus tard.');
        setFlights([]);
        setLoading(false);
      });
  };
  
  return (
    <div className="container py-4">
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
