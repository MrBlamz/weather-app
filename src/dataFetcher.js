import pubSub from 'pubsub-js';

const dataFetcher = (function dataFetcher() {
  const API_KEY = '9611e63a364330a164a7c9a943fef32e';

  function handleErrors(response) {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response;
  }

  function fetchWeatherData() {
    const TOPIC = 'fetchData';

    pubSub.subscribe(TOPIC, async (msg, event) => {
      try {
        const city = event.target.querySelector('input').value;
        const data = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        )
          .then(handleErrors)
          .then((response) => response.json());

        const NEW_TOPIC = 'dataFetched';
        pubSub.publish(NEW_TOPIC, data);
      } catch (error) {
        const NEW_TOPIC = 'fetchFailed';
        pubSub.publish(NEW_TOPIC);
      }
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
