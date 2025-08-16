import axios from 'axios';
import weatherService from './weatherService';

describe('weatherService (backend endpoints)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getWeatherByCity hits /api/weather/current and returns data', async () => {
    const city = 'Casablanca';
    const fake = { main: { temp: 27 }, weather: [{ icon: '01d', description: 'clear' }] };
    axios.get.mockResolvedValueOnce({ data: fake });

    const data = await weatherService.getWeatherByCity(city);

    expect(axios.get).toHaveBeenCalledWith(`/api/weather/current?city=${city}`);
    expect(data).toEqual(fake);
  });

  test('getForecastByCity hits /api/weather/forecast and returns data', async () => {
    const city = 'Rabat';
    const fake = { list: [{ dt: 123, main: { temp: 25 } }] };
    axios.get.mockResolvedValueOnce({ data: fake });

    const data = await weatherService.getForecastByCity(city);

    expect(axios.get).toHaveBeenCalledWith(`/api/weather/forecast?city=${city}`);
    expect(data).toEqual(fake);
  });

  test('getWeatherIconUrl builds OpenWeather url', () => {
    expect(weatherService.getWeatherIconUrl('10n'))
      .toBe('https://openweathermap.org/img/wn/10n@2x.png');
  });
});

