const dataFetcher = (function dataFetcher() {
  const API_KEY = '9611e63a364330a164a7c9a943fef32e';

  async function getCoordinates(city) {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
    );
    return response.json();
  }

  async function fetchWeatherData(city) {
    const coordinates = await getCoordinates(city);
    const { lat } = coordinates[0];
    const { lon } = coordinates[0];

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${API_KEY}`
    );
    return response.json();
  }

  return {
    fetchWeatherData,
  };
})();

export default dataFetcher;
