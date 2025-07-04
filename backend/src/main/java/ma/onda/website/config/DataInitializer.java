package ma.onda.website.config;

import ma.onda.website.models.Airline;
import ma.onda.website.models.Airport;
import ma.onda.website.models.Flight;
import ma.onda.website.repositories.AirlineRepository;
import ma.onda.website.repositories.AirportRepository;
import ma.onda.website.repositories.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Component
@Profile("dev") // Only run in development mode
public class DataInitializer implements CommandLineRunner {

    private final AirportRepository airportRepository;
    private final AirlineRepository airlineRepository;
    private final FlightRepository flightRepository;
    private final Random random = new Random();

    @Autowired
    public DataInitializer(
        AirportRepository airportRepository,
        AirlineRepository airlineRepository,
        FlightRepository flightRepository
    ) {
        this.airportRepository = airportRepository;
        this.airlineRepository = airlineRepository;
        this.flightRepository = flightRepository;
    }

    @Override
    public void run(String... args) {
        // Only initialize if the database is empty
        if (airportRepository.count() == 0) {
            // Create airports
            List<Airport> airports = createAllMoroccanAirports();
            airportRepository.saveAll(airports);
            
            // Create airlines
            List<Airline> airlines = createAirlines();
            airlineRepository.saveAll(airlines);
            
            // Create flights (sample data)
            List<Flight> flights = createFlights(airports, airlines);
            flightRepository.saveAll(flights);
            
            System.out.println("Test data initialized successfully!");
        }
    }
    
    private List<Airport> createAllMoroccanAirports() {
        List<Airport> airports = new ArrayList<>();
        
        // 1. Casablanca - Mohammed V International Airport
        Airport cmn = new Airport();
        cmn.setCode("CMN");
        cmn.setName("Mohammed V International Airport");
        cmn.setCity("Casablanca");
        cmn.setInternational(true);
        cmn.setLatitude(33.3675);
        cmn.setLongitude(-7.5900);
        cmn.setDescriptionEn("Mohammed V International Airport is Morocco's main international gateway located near Casablanca, serving millions of passengers annually.");
        cmn.setDescriptionFr("L'aéroport international Mohammed V est la principale porte d'entrée internationale du Maroc près de Casablanca, accueillant des millions de passagers chaque année.");
        cmn.setDescriptionAr("مطار محمد الخامس الدولي هو البوابة الدولية الرئيسية للمغرب بالقرب من الدار البيضاء، ويخدم ملايين المسافرين سنوياً.");
        airports.add(cmn);
        
        // 2. Marrakech - Marrakech Menara Airport
        Airport rak = new Airport();
        rak.setCode("RAK");
        rak.setName("Marrakech Menara Airport");
        rak.setCity("Marrakech");
        rak.setInternational(true);
        rak.setLatitude(31.6069);
        rak.setLongitude(-8.0369);
        rak.setDescriptionEn("Marrakech Menara Airport is a major international airport serving the popular tourist destination of Marrakech.");
        rak.setDescriptionFr("L'aéroport de Marrakech Ménara est un aéroport international majeur desservant la destination touristique populaire de Marrakech.");
        rak.setDescriptionAr("مطار مراكش المنارة هو مطار دولي رئيسي يخدم وجهة مراكش السياحية الشهيرة.");
        airports.add(rak);
        
        // 3. Agadir - Al Massira Airport
        Airport aga = new Airport();
        aga.setCode("AGA");
        aga.setName("Al Massira Airport");
        aga.setCity("Agadir");
        aga.setInternational(true);
        aga.setLatitude(30.3250);
        aga.setLongitude(-9.4128);
        aga.setDescriptionEn("Al Massira Airport serves Agadir, a major beach resort destination on Morocco's southern Atlantic coast.");
        aga.setDescriptionFr("L'aéroport Al Massira dessert Agadir, une destination balnéaire majeure sur la côte atlantique sud du Maroc.");
        aga.setDescriptionAr("مطار المسيرة يخدم أغادير، وهي وجهة منتجع شاطئي رئيسي على ساحل المحيط الأطلسي الجنوبي للمغرب.");
        airports.add(aga);
        
        // 4. Al Hoceima - Cherif Al Idrissi Airport
        Airport ahu = new Airport();
        ahu.setCode("AHU");
        ahu.setName("Cherif Al Idrissi Airport");
        ahu.setCity("Al Hoceima");
        ahu.setInternational(true);
        ahu.setLatitude(35.1771);
        ahu.setLongitude(-3.8394);
        ahu.setDescriptionEn("Cherif Al Idrissi Airport is a regional airport serving Al Hoceima and the surrounding area in northern Morocco.");
        ahu.setDescriptionFr("L'aéroport Cherif Al Idrissi est un aéroport régional desservant Al Hoceima et ses environs dans le nord du Maroc.");
        ahu.setDescriptionAr("مطار الشريف الإدريسي هو مطار إقليمي يخدم الحسيمة والمناطق المحيطة بها في شمال المغرب.");
        airports.add(ahu);
        
        // 5. Beni Mellal - Beni Mellal Airport
        Airport bem = new Airport();
        bem.setCode("BEM");
        bem.setName("Beni Mellal Airport");
        bem.setCity("Beni Mellal");
        bem.setInternational(false);
        bem.setLatitude(32.4014);
        bem.setLongitude(-6.3158);
        bem.setDescriptionEn("Beni Mellal Airport is a small regional airport serving the Beni Mellal-Khenifra region.");
        bem.setDescriptionFr("L'aéroport de Beni Mellal est un petit aéroport régional desservant la région de Béni Mellal-Khénifra.");
        bem.setDescriptionAr("مطار بني ملال هو مطار إقليمي صغير يخدم منطقة بني ملال-خنيفرة.");
        airports.add(bem);
        
        // 6. Errachidia - Moulay Ali Cherif Airport
        Airport erh = new Airport();
        erh.setCode("ERH");
        erh.setName("Moulay Ali Cherif Airport");
        erh.setCity("Errachidia");
        erh.setInternational(false);
        erh.setLatitude(31.9475);
        erh.setLongitude(-4.3983);
        erh.setDescriptionEn("Moulay Ali Cherif Airport serves the city of Errachidia and surrounding areas in eastern Morocco.");
        erh.setDescriptionFr("L'aéroport Moulay Ali Cherif dessert la ville d'Errachidia et ses environs dans l'est du Maroc.");
        erh.setDescriptionAr("مطار مولاي علي الشريف يخدم مدينة الرشيدية والمناطق المحيطة بها في شرق المغرب.");
        airports.add(erh);
        
        // 7. Essaouira - Essaouira Mogador Airport
        Airport esu = new Airport();
        esu.setCode("ESU");
        esu.setName("Essaouira Mogador Airport");
        esu.setCity("Essaouira");
        esu.setInternational(true);
        esu.setLatitude(31.3969);
        esu.setLongitude(-9.6817);
        esu.setDescriptionEn("Essaouira Mogador Airport connects the coastal city of Essaouira to other Moroccan destinations.");
        esu.setDescriptionFr("L'aéroport d'Essaouira Mogador relie la ville côtière d'Essaouira à d'autres destinations marocaines.");
        esu.setDescriptionAr("مطار الصويرة موكادور يربط مدينة الصويرة الساحلية بوجهات مغربية أخرى.");
        airports.add(esu);
        
        // 8. Fes - Fes Sais International Airport
        Airport fez = new Airport();
        fez.setCode("FEZ");
        fez.setName("Fes Sais International Airport");
        fez.setCity("Fes");
        fez.setInternational(true);
        fez.setLatitude(33.9272);
        fez.setLongitude(-4.9778);
        fez.setDescriptionEn("Fes Sais International Airport serves Morocco's cultural and spiritual capital, Fes.");
        fez.setDescriptionFr("L'aéroport international Fès-Saïss dessert la capitale culturelle et spirituelle du Maroc, Fès.");
        fez.setDescriptionAr("مطار فاس سايس الدولي يخدم العاصمة الثقافية والروحية للمغرب، فاس.");
        airports.add(fez);
        
        // 9. Nador - Nador International Airport
        Airport ndr = new Airport();
        ndr.setCode("NDR");
        ndr.setName("Nador International Airport");
        ndr.setCity("Nador");
        ndr.setInternational(true);
        ndr.setLatitude(34.9886);
        ndr.setLongitude(-3.0286);
        ndr.setDescriptionEn("Nador International Airport serves the northeastern Rif region of Morocco.");
        ndr.setDescriptionFr("L'aéroport international de Nador dessert la région nord-est du Rif au Maroc.");
        ndr.setDescriptionAr("مطار الناظور الدولي يخدم منطقة الريف الشمالية الشرقية من المغرب.");
        airports.add(ndr);
        
        // 10. Ouarzazate - Ouarzazate Airport
        Airport ozz = new Airport();
        ozz.setCode("OZZ");
        ozz.setName("Ouarzazate Airport");
        ozz.setCity("Ouarzazate");
        ozz.setInternational(true);
        ozz.setLatitude(30.9391);
        ozz.setLongitude(-6.9094);
        ozz.setDescriptionEn("Ouarzazate Airport serves as a gateway to the Sahara Desert and Morocco's southeastern regions.");
        ozz.setDescriptionFr("L'aéroport d'Ouarzazate sert de porte d'entrée vers le désert du Sahara et les régions sud-est du Maroc.");
        ozz.setDescriptionAr("مطار ورزازات يعمل كبوابة إلى الصحراء الكبرى ومناطق جنوب شرق المغرب.");
        airports.add(ozz);
        
        // 11. Oujda - Oujda Angads International Airport
        Airport oud = new Airport();
        oud.setCode("OUD");
        oud.setName("Oujda Angads International Airport");
        oud.setCity("Oujda");
        oud.setInternational(true);
        oud.setLatitude(34.7872);
        oud.setLongitude(-1.9239);
        oud.setDescriptionEn("Oujda Angads International Airport serves the eastern Moroccan city of Oujda and nearby areas.");
        oud.setDescriptionFr("L'aéroport international d'Oujda Angads dessert la ville marocaine orientale d'Oujda et les zones environnantes.");
        oud.setDescriptionAr("مطار وجدة أنكاد الدولي يخدم مدينة وجدة المغربية الشرقية والمناطق المجاورة.");
        airports.add(oud);
        
        // 12. Rabat - Rabat-Salé Airport
        Airport rba = new Airport();
        rba.setCode("RBA");
        rba.setName("Rabat-Salé Airport");
        rba.setCity("Rabat");
        rba.setInternational(true);
        rba.setLatitude(34.0487);
        rba.setLongitude(-6.7516);
        rba.setDescriptionEn("Rabat-Salé Airport serves Morocco's capital city Rabat and the twin city of Salé.");
        rba.setDescriptionFr("L'aéroport de Rabat-Salé dessert la capitale du Maroc, Rabat, et la ville jumelle de Salé.");
        rba.setDescriptionAr("مطار الرباط-سلا يخدم العاصمة المغربية الرباط والمدينة التوأم سلا.");
        airports.add(rba);
        
        // 13. Tangier - Tangier Ibn Battouta Airport
        Airport tng = new Airport();
        tng.setCode("TNG");
        tng.setName("Tangier Ibn Battouta Airport");
        tng.setCity("Tangier");
        tng.setInternational(true);
        tng.setLatitude(35.7267);
        tng.setLongitude(-5.9000);
        tng.setDescriptionEn("Tangier Ibn Battouta Airport connects northern Morocco to destinations across Europe and the Middle East.");
        tng.setDescriptionFr("L'aéroport Ibn Battouta de Tanger relie le nord du Maroc aux destinations d'Europe et du Moyen-Orient.");
        tng.setDescriptionAr("مطار طنجة ابن بطوطة يربط شمال المغرب بوجهات في جميع أنحاء أوروبا والشرق الأوسط.");
        airports.add(tng);
        
        // 14. Tetouan - Tetouan Sania Ramel Airport
        Airport ttu = new Airport();
        ttu.setCode("TTU");
        ttu.setName("Tetouan Sania Ramel Airport");
        ttu.setCity("Tetouan");
        ttu.setInternational(true);
        ttu.setLatitude(35.5944);
        ttu.setLongitude(-5.3203);
        ttu.setDescriptionEn("Tetouan Sania Ramel Airport serves the northern Moroccan city of Tetouan.");
        ttu.setDescriptionFr("L'aéroport Sania Ramel de Tétouan dessert la ville marocaine du nord de Tétouan.");
        ttu.setDescriptionAr("مطار تطوان سانية الرمل يخدم مدينة تطوان المغربية الشمالية.");
        airports.add(ttu);
        
        // 15. Dakhla - Dakhla Airport
        Airport vil = new Airport();
        vil.setCode("VIL");
        vil.setName("Dakhla Airport");
        vil.setCity("Dakhla");
        vil.setInternational(true);
        vil.setLatitude(23.7183);
        vil.setLongitude(-15.9322);
        vil.setDescriptionEn("Dakhla Airport serves the coastal city of Dakhla in southern Morocco.");
        vil.setDescriptionFr("L'aéroport de Dakhla dessert la ville côtière de Dakhla dans le sud du Maroc.");
        vil.setDescriptionAr("مطار الداخلة يخدم مدينة الداخلة الساحلية في جنوب المغرب.");
        airports.add(vil);
        
        // 16. Laayoune - Hassan I Airport
        Airport eun = new Airport();
        eun.setCode("EUN");
        eun.setName("Hassan I Airport");
        eun.setCity("Laayoune");
        eun.setInternational(true);
        eun.setLatitude(27.1517);
        eun.setLongitude(-13.2192);
        eun.setDescriptionEn("Hassan I Airport serves Laayoune, the largest city in the Western Sahara territory.");
        eun.setDescriptionFr("L'aéroport Hassan Ier dessert Laâyoune, la plus grande ville du territoire du Sahara occidental.");
        eun.setDescriptionAr("مطار الحسن الأول يخدم العيون، أكبر مدينة في إقليم الصحراء الغربية.");
        airports.add(eun);
        
        // 17. Tan Tan - Tan Tan Plage Blanche Airport
        Airport tta = new Airport();
        tta.setCode("TTA");
        tta.setName("Tan Tan Plage Blanche Airport");
        tta.setCity("Tan Tan");
        tta.setInternational(false);
        tta.setLatitude(28.4481);
        tta.setLongitude(-11.1617);
        tta.setDescriptionEn("Tan Tan Plage Blanche Airport serves the southwestern coastal town of Tan Tan.");
        tta.setDescriptionFr("L'aéroport Plage Blanche de Tan Tan dessert la ville côtière sud-ouest de Tan Tan.");
        tta.setDescriptionAr("مطار طان طان بلاج بلانش يخدم مدينة طان طان الساحلية الجنوبية الغربية.");
        airports.add(tta);
        
        // 18. Guelmim - Guelmim Airport
        Airport gln = new Airport();
        gln.setCode("GLN");
        gln.setName("Guelmim Airport");
        gln.setCity("Guelmim");
        gln.setInternational(false);
        gln.setLatitude(29.0267);
        gln.setLongitude(-10.0500);
        gln.setDescriptionEn("Guelmim Airport serves the southern Moroccan city known as the gateway to the desert.");
        gln.setDescriptionFr("L'aéroport de Guelmim dessert la ville marocaine du sud connue comme la porte du désert.");
        gln.setDescriptionAr("مطار كلميم يخدم المدينة المغربية الجنوبية المعروفة باسم بوابة الصحراء.");
        airports.add(gln);
        
        // 19. Zagora - Zagora Airport
        Airport ozg = new Airport();
        ozg.setCode("OZG");
        ozg.setName("Zagora Airport");
        ozg.setCity("Zagora");
        ozg.setInternational(false);
        ozg.setLatitude(30.3200);
        ozg.setLongitude(-5.8667);
        ozg.setDescriptionEn("Zagora Airport provides access to the southeastern desert regions of Morocco.");
        ozg.setDescriptionFr("L'aéroport de Zagora donne accès aux régions désertiques du sud-est du Maroc.");
        ozg.setDescriptionAr("مطار زاكورة يوفر الوصول إلى مناطق الصحراء الجنوبية الشرقية من المغرب.");
        airports.add(ozg);
        
        // 20. Bouarfa - Bouarfa Airport
        Airport uar = new Airport();
        uar.setCode("UAR");
        uar.setName("Bouarfa Airport");
        uar.setCity("Bouarfa");
        uar.setInternational(false);
        uar.setLatitude(32.5144);
        uar.setLongitude(-1.9831);
        uar.setDescriptionEn("Bouarfa Airport is a small regional airport serving the eastern Moroccan town of Bouarfa.");
        uar.setDescriptionFr("L'aéroport de Bouarfa est un petit aéroport régional desservant la ville marocaine orientale de Bouarfa.");
        uar.setDescriptionAr("مطار بوعرفة هو مطار إقليمي صغير يخدم مدينة بوعرفة المغربية الشرقية.");
        airports.add(uar);
        
        return airports;
    }
    
    private List<Airline> createAirlines() {
        List<Airline> airlines = new ArrayList<>();
        
        // Royal Air Maroc
        Airline ram = new Airline();
        ram.setCode("AT");
        ram.setName("Royal Air Maroc");
        ram.setCountry("Morocco");
        ram.setLogoUrl("/images/airlines/royal-air-maroc.png");
        airlines.add(ram);
        
        // Air Arabia Maroc
        Airline airarabia = new Airline();
        airarabia.setCode("3O");
        airarabia.setName("Air Arabia Maroc");
        airarabia.setCountry("Morocco");
        airarabia.setLogoUrl("/images/airlines/air-arabia.png");
        airlines.add(airarabia);
        
        // TUI fly
        Airline tuifly = new Airline();
        tuifly.setCode("TB");
        tuifly.setName("TUI fly");
        tuifly.setCountry("Morocco");
        tuifly.setLogoUrl("/images/airlines/tuifly.png");
        airlines.add(tuifly);
        
        // Additional international airlines
        Airline airfrance = new Airline();
        airfrance.setCode("AF");
        airfrance.setName("Air France");
        airfrance.setCountry("France");
        airfrance.setLogoUrl("/images/airlines/air-france.png");
        airlines.add(airfrance);
        
        return airlines;
    }
    
    private List<Flight> createFlights(List<Airport> airports, List<Airline> airlines) {
        List<Flight> flights = new ArrayList<>();
        LocalDate startDate = LocalDate.now();
        
        // Generate flights for next 30 days between major airports
        for (int day = 0; day < 30; day++) {
            LocalDate currentDate = startDate.plusDays(day);
            
            // Only create flights between major airports to keep sample data manageable
            List<Airport> majorAirports = Arrays.asList(
                airports.get(0),  // CMN - Casablanca
                airports.get(1),  // RAK - Marrakech
                airports.get(2),  // AGA - Agadir
                airports.get(7),  // FEZ - Fes
                airports.get(11), // RBA - Rabat
                airports.get(12)  // TNG - Tangier
            );
            
            for (Airport departure : majorAirports) {
                for (Airport arrival : majorAirports) {
                    if (departure.equals(arrival)) continue;
                    
                    // Create 2-4 flights per day between these airports
                    int flightsPerDay = 2 + random.nextInt(3);
                    
                    for (int i = 0; i < flightsPerDay; i++) {
                        Flight flight = new Flight();
                        
                        // Random airline
                        Airline airline = airlines.get(random.nextInt(airlines.size()));
                        flight.setAirline(airline);
                        
                        // Flight number
                        flight.setFlightNumber(airline.getCode() + (100 + random.nextInt(900)));
                        
                        // Airports
                        flight.setDepartureAirport(departure);
                        flight.setArrivalAirport(arrival);
                        
                        // Random departure time between 6AM and 10PM
                        int departureHour = 6 + random.nextInt(16);
                        int departureMinute = random.nextInt(60);
                        
                        LocalDateTime departureTime = currentDate.atTime(departureHour, departureMinute);
                        flight.setDepartureTime(departureTime);
                        
                        // Flight duration between 1-3 hours
                        int durationHours = 1 + random.nextInt(2);
                        int durationMinutes = random.nextInt(60);
                        
                        LocalDateTime arrivalTime = departureTime.plusHours(durationHours).plusMinutes(durationMinutes);
                        flight.setArrivalTime(arrivalTime);
                        
                        // Random flight details
                        flight.setPrice(new BigDecimal(500 + random.nextInt(3000))); // 500-3500 MAD
                        flight.setSeatsAvailable(10 + random.nextInt(120));
                        
                        String[] terminals = {"1", "2", "3", "A", "B"};
                        flight.setTerminal(terminals[random.nextInt(terminals.length)]);
                        
                        flight.setGate(String.valueOf(1 + random.nextInt(20)));
                        
                        // Status (mostly scheduled)
                        Flight.FlightStatus[] statuses = Flight.FlightStatus.values();
                        int statusRandom = random.nextInt(100);
                        Flight.FlightStatus status;
                        
                        if (statusRandom < 80) {
                            status = Flight.FlightStatus.SCHEDULED;
                        } else if (statusRandom < 90) {
                            status = Flight.FlightStatus.DELAYED;
                        } else if (statusRandom < 95) {
                            status = Flight.FlightStatus.DEPARTED;
                        } else if (statusRandom < 98) {
                            status = Flight.FlightStatus.ARRIVED;
                        } else {
                            status = Flight.FlightStatus.CANCELLED;
                        }
                        
                        flight.setStatus(status);
                        
                        // Aircraft type
                        String[] aircraftTypes = {
                            "Boeing 737-800", 
                            "Airbus A320", 
                            "Boeing 787-8",
                            "Airbus A330-300", 
                            "Embraer E190"
                        };
                        flight.setAircraftType(aircraftTypes[random.nextInt(aircraftTypes.length)]);
                        
                        flights.add(flight);
                    }
                }
            }
        }
        
        return flights;
    }
}
