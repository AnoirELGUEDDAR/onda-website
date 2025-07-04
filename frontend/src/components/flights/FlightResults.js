import React from 'react';
import './flights.css';

const FlightResults = ({ flights, loading, error, searchParams }) => {
  // Obtenir la date et l'heure actuelles
  const currentTime = new Date();
  const formattedDate = currentTime.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  
  if (loading) {
    return <div className="loading-container">Recherche de vols...</div>;
  }
  
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }
  
  const flightArray = Array.isArray(flights) ? flights : [];
  
  // Utiliser les paramètres de recherche
  const defaultDeparture = searchParams?.departure || '';
  const defaultArrival = searchParams?.arrival || '';
  
  // Codes d'aéroports marocains
  const moroccanAirports = ['CMN', 'RAK', 'AGA', 'FEZ', 'TNG', 'OUD', 'ESU', 'NDR', 'TTU'];
  // Codes d'aéroports européens
  const europeanAirports = ['CDG', 'ORY', 'MAD', 'FCO', 'LHR', 'IST', 'FRA', 'AMS', 'BCN', 'MUC', 'BRU', 'LIS'];
  // Codes d'aéroports du Moyen-Orient
  const middleEastAirports = ['DXB', 'DOH', 'AUH', 'CAI', 'AMM', 'BEY'];
  
  // Vérifier si c'est un vol domestique (Maroc-Maroc)
  const isDomesticFlight = (departure, arrival) => {
    return moroccanAirports.includes(departure) && moroccanAirports.includes(arrival);
  };

  // Vérifier si c'est un vol Maroc-Europe ou Europe-Maroc
  const isMarocEuropeFlight = (departure, arrival) => {
    return (moroccanAirports.includes(departure) && europeanAirports.includes(arrival)) ||
           (europeanAirports.includes(departure) && moroccanAirports.includes(arrival));
  };
  
  // Vérifier si c'est un vol Maroc-Moyen-Orient ou Moyen-Orient-Maroc
  const isMarocMiddleEastFlight = (departure, arrival) => {
    return (moroccanAirports.includes(departure) && middleEastAirports.includes(arrival)) ||
           (middleEastAirports.includes(departure) && moroccanAirports.includes(arrival));
  };

  // Compagnies aériennes avec informations détaillées (structure par ID numérique et code)
  const airlineDataById = {
    // Compagnies nationales marocaines
    1: { 
      id: 1,
      code: 'AT',
      name: 'Royal Air Maroc', 
      logo: '/images/airlines/royal-air-maroc.png',
      domestic: true,
      international: true
    },
    2: { 
      id: 2,
      code: '3O',
      name: 'Air Arabia Maroc', 
      logo: '/images/airlines/air-arabia.png',
      domestic: true,
      international: true
    },
    
    // Autres compagnies
    3: { 
      id: 3,
      code: 'TB',
      name: 'TUI fly', 
      logo: '/images/airlines/tuifly.png',
      domestic: false,
      international: true
    },
    4: { 
      id: 4,
      code: 'AF',
      name: 'Air France', 
      logo: '/images/airlines/air-france.png',
      domestic: false,
      international: true
    },
    19: { 
      id: 19,
      code: 'EY',
      name: 'Etihad Airways', 
      logo: '/images/airlines/etihad-airways.png',
      domestic: false,
      international: true
    },
    20: { 
      id: 20,
      code: 'IB',
      name: 'Iberia', 
      logo: '/images/airlines/iberia.png',
      domestic: false,
      international: true
    },
    21: { 
      id: 21,
      code: 'FR',
      name: 'Ryanair', 
      logo: '/images/airlines/ryanair.png',
      domestic: false,
      international: true
    },
    22: { 
      id: 22,
      code: 'TK',
      name: 'Turkish Airlines', 
      logo: '/images/airlines/turkish-airlines.png',
      domestic: false,
      international: true
    },
    23: { 
      id: 23,
      code: 'VY',
      name: 'Vueling', 
      logo: '/images/airlines/vueling.png',
      domestic: false,
      international: true
    },
    24: { 
      id: 24,
      code: 'QR',
      name: 'Qatar Airways', 
      logo: '/images/airlines/qatar-airways.png',
      domestic: false,
      international: true
    },
    25: { 
      id: 25,
      code: 'BA',
      name: 'British Airways', 
      logo: '/images/airlines/british-airways.png',
      domestic: false,
      international: true
    },
    26: { 
      id: 26,
      code: 'EK',
      name: 'Emirates', 
      logo: '/images/airlines/emirates.png',
      domestic: false,
      international: true
    },
    27: { 
      id: 27,
      code: 'LH',
      name: 'Lufthansa', 
      logo: '/images/airlines/lufthansa.png',
      domestic: false,
      international: true
    }
  };
  
  // Version avec les codes comme clés pour la compatibilité
  const airlineDataByCode = {
    'AT': airlineDataById[1],
    '3O': airlineDataById[2],
    'TB': airlineDataById[3],
    'AF': airlineDataById[4],
    'EY': airlineDataById[19],
    'IB': airlineDataById[20],
    'FR': airlineDataById[21],
    'TK': airlineDataById[22],
    'VY': airlineDataById[23],
    'QR': airlineDataById[24],
    'BA': airlineDataById[25],
    'EK': airlineDataById[26],
    'LH': airlineDataById[27]
  };
  
  // Correspondance des codes d'aéroport aux villes
  const airportMap = {
    // Aéroports marocains
    'CMN': 'Casablanca',
    'RAK': 'Marrakech',
    'AGA': 'Agadir',
    'FEZ': 'Fès',
    'TNG': 'Tanger',
    'OUD': 'Oujda',
    'ESU': 'Essaouira',
    'NDR': 'Nador',
    'TTU': 'Tétouan',
    
    // Aéroports européens
    'CDG': 'Paris',
    'ORY': 'Paris',
    'MAD': 'Madrid',
    'FCO': 'Rome',
    'LHR': 'Londres',
    'IST': 'Istanbul',
    'FRA': 'Francfort',
    'AMS': 'Amsterdam',
    'BCN': 'Barcelone',
    'MUC': 'Munich',
    'BRU': 'Bruxelles',
    'LIS': 'Lisbonne',
    
    // Aéroports du Moyen-Orient
    'DXB': 'Dubaï',
    'DOH': 'Doha',
    'AUH': 'Abu Dhabi',
    'CAI': 'Le Caire',
    'AMM': 'Amman',
    'BEY': 'Beyrouth'
  };

  // Function to extract airline code from flight number
  const extractAirlineCode = (flightNumber) => {
    if (!flightNumber) return null;
    
    // Try to extract a 2-character code
    let airlineCode = flightNumber.substring(0, 2);
    if (airlineDataByCode[airlineCode]) {
      return airlineCode;
    }
    
    // Try to extract a 3-character code (like '3O')
    airlineCode = flightNumber.substring(0, 3);
    if (airlineDataByCode[airlineCode]) {
      return airlineCode;
    }
    
    return null;
  };
  
  // Updated function to handle both ID numbers and codes
  const getAirlineInfo = (airlineIdOrCode, flightNumber, originCode, destinationCode) => {
    const domestic = isDomesticFlight(originCode, destinationCode);
    const international = !domestic;
    
    // Try to get airline directly from ID if it's a number
    if (typeof airlineIdOrCode === 'number' || !isNaN(parseInt(airlineIdOrCode))) {
      const numericId = parseInt(airlineIdOrCode);
      if (airlineDataById[numericId]) {
        const airline = airlineDataById[numericId];
        if ((domestic && airline.domestic) || (international && airline.international)) {
          return airline;
        }
      }
    }
    
    // Try to get airline from code if it's a string
    if (typeof airlineIdOrCode === 'string') {
      if (airlineDataByCode[airlineIdOrCode]) {
        const airline = airlineDataByCode[airlineIdOrCode];
        if ((domestic && airline.domestic) || (international && airline.international)) {
          return airline;
        }
      }
    }
    
    // Try to extract airline code from flight number
    if (flightNumber) {
      const airlineCode = extractAirlineCode(flightNumber);
      if (airlineCode && airlineDataByCode[airlineCode]) {
        const airline = airlineDataByCode[airlineCode];
        if ((domestic && airline.domestic) || (international && airline.international)) {
          return airline;
        }
      }
    }
    
    // If we still don't have a valid airline, use Royal Air Maroc as default
    return airlineDataById[1] || {
      id: 'unknown',
      code: 'N/A',
      name: 'Compagnie inconnue',
      logo: '/images/airlines/default-airline.png'
    };
  };
  
  // Fonction pour construire le chemin d'image correct
  const getImagePath = (relativePath) => {
    // Si le chemin commence déjà par http ou https, c'est une URL absolue
    if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
      return relativePath;
    }
    
    // Sinon, on suppose que c'est un chemin relatif à la racine du site
    // On peut utiliser process.env.PUBLIC_URL pour les applications React
    return process.env.PUBLIC_URL ? `${process.env.PUBLIC_URL}${relativePath}` : relativePath;
  };
  
  return (
    <div className="flight-results-container">
      <div className="flights-header">
        <h2>Vols disponibles</h2>
        <div className="current-time">
          Date: {formattedDate} | Heure: {currentTime.toLocaleTimeString('fr-FR')}
        </div>
      </div>
      
      <div className="flight-results-table">
        <table className="flight-table">
          <thead>
            <tr>
              <th>Statut</th>
              <th>N° vol</th>
              <th>Via</th>
              <th>Destination</th>
              <th>Origine</th>
              <th>Compagnie</th>
              <th>depart</th>
              <th>arrive</th>
            </tr>
          </thead>
          <tbody>
            {flightArray.length > 0 ? (
              flightArray.map((flight, index) => {
                // Format de l'heure
                const formatTime = (timeString) => {
                  try {
                    const time = new Date(timeString);
                    const hours = time.getHours().toString().padStart(2, '0');
                    const minutes = time.getMinutes().toString().padStart(2, '0');
                    return `${hours}:${minutes}`;
                  } catch (e) {
                    return "N/A";
                  }
                };

                // Extraction des données du vol
                const departureTime = formatTime(flight.departure_time || flight.departureTime);
                const arrivalTime = formatTime(flight.arrival_time || flight.arrivalTime);
                
                // Détermination de l'origine et la destination
                let originCode, destinationCode;
                
                // Si le back-end renvoie des identifiants numériques pour les aéroports,
                // nous devons les convertir en codes d'aéroport
                if (typeof flight.departure_airport_id === 'number' || !isNaN(parseInt(flight.departure_airport_id))) {
                  // Ici vous auriez besoin d'une fonction de conversion d'ID en code d'aéroport
                  // Pour l'instant nous utilisons une solution temporaire
                  originCode = flight.origin_code || flight.originCode || flight.departure_airport_code || defaultDeparture;
                } else {
                  originCode = flight.departure_airport_id || flight.origin_code || flight.originCode || defaultDeparture;
                }
                
                if (typeof flight.arrival_airport_id === 'number' || !isNaN(parseInt(flight.arrival_airport_id))) {
                  destinationCode = flight.destination_code || flight.destinationCode || flight.arrival_airport_code || defaultArrival;
                } else {
                  destinationCode = flight.arrival_airport_id || flight.destination_code || flight.destinationCode || defaultArrival;
                }
                
                const origin = flight.origin_city || flight.originCity || flight.departureAirportCity || airportMap[originCode];
                const destination = flight.destination_city || flight.destinationCity || flight.arrivalAirportCity || airportMap[destinationCode];
                
                // Formatage de l'origine et de la destination
                const originDisplay = origin ? `${origin} (${originCode})` : originCode || 'N/A';
                const destinationDisplay = destination ? `${destination} (${destinationCode})` : destinationCode || 'N/A';
                
                const flightNumber = flight.flight_number || flight.flightNumber || 'N/A';
                const status = flight.status || 'SCHEDULED';
                const via = flight.via || 'Direct';
                
                // Obtenir les informations de la compagnie aérienne
                const airlineId = flight.airline_id || flight.airlineId;
                const airlineInfo = getAirlineInfo(airlineId, flightNumber, originCode, destinationCode);
                
                // Classe pour le statut
                const statusClass = 
                  status === 'SCHEDULED' ? 'status-scheduled' :
                  status === 'DELAYED' ? 'status-delayed' :
                  status === 'ARRIVED' ? 'status-arrived' :
                  status === 'DEPARTED' ? 'status-departed' :
                  status === 'CANCELLED' ? 'status-cancelled' : '';
                
                return (
                  <tr key={flight.id || index}>
                    <td className={statusClass}>{status}</td>
                    <td>{flightNumber}</td>
                    <td>{via}</td>
                    <td>{destinationDisplay}</td>
                    <td>{originDisplay}</td>
                    <td className="airline-cell">
                      {airlineInfo?.logo && (
                        <img 
                          src={getImagePath(airlineInfo.logo)} 
                          alt={airlineInfo.name} 
                          className="airline-logo"
                          onError={(e) => {
                            e.target.src = getImagePath('/images/airlines/default-airline.png');
                            e.target.onerror = () => {
                              e.target.style.display = 'none';
                            };
                          }}
                        />
                      )}
                      <span>{airlineInfo?.name || 'N/A'}</span>
                    </td>
                    <td>{departureTime}</td>
                    <td>{arrivalTime}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="no-flights">Il n'y a pas de vols à cette heure-ci</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FlightResults;
