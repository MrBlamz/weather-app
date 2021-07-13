import pubSub from 'pubsub-js';

const dataFetcher = (function dataFetcher() {
  const API_KEY = '9611e63a364330a164a7c9a943fef32e';

  function handleErrors(response) {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response;
  }

  function fetchWeatherDataByCoordinates() {
    const TOPIC = 'locationAcquired';

    pubSub.subscribe(TOPIC, async (msg, coordinates) => {
      try {
        const { latitude, longitude } = coordinates;
        const data = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
        )
          .then(handleErrors)
          .then((response) => response.json());
        data.units = 'metric';

        const NEW_TOPIC = 'dataFetched';
        pubSub.publish(NEW_TOPIC, data);
      } catch (error) {
        console.log(error);
      }
    });
  }

  function fetchWeatherDataByCity() {
    const TOPIC = 'fetchData';

    pubSub.subscribe(TOPIC, async (msg, info) => {
      try {
        const { city, units } = info;
        const data = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${API_KEY}`
        )
          .then(handleErrors)
          .then((response) => response.json());
        data.units = units;

        const NEW_TOPIC = 'dataFetched';
        pubSub.publish(NEW_TOPIC, data);
      } catch (error) {
        const NEW_TOPIC = 'fetchFailed';
        pubSub.publish(NEW_TOPIC);
      }
    });
  }

  function start() {
    fetchWeatherDataByCoordinates();
    fetchWeatherDataByCity();
  }

  return {
    start,
  };
})();

export default dataFetcher;
