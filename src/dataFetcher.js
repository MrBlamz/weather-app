import pubSub from 'pubsub-js';

const dataFetcher = (function dataFetcher() {
  const API_KEY = '9611e63a364330a164a7c9a943fef32e';

  async function getCoordinates(city) {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
    );
    return response.json();
  }

  function fetchWeatherData() {
    const TOPIC = 'fetchData';

    pubSub.subscribe(TOPIC, async (msg, event) => {
      const city = event.target.querySelector('input').value;
      const coordinates = await getCoordinates(city);
      const { lat } = coordinates[0];
      const { lon } = coordinates[0];

      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${API_KEY}`
      ).then((response) => response.json());

      const NEW_TOPIC = 'dataFetched';
      pubSub.publish(NEW_TOPIC, { event, data });
    });
  }

  function start() {
    fetchWeatherData();
  }

  return {
    start,
  };
})();

export default dataFetcher;
