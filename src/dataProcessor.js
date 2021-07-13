import pubSub from 'pubsub-js';

const dataProcessor = (function dataProcessor() {
  function roundNumber(number) {
    return Math.round(number);
  }

  function getCurrentWeather() {
    const TOPIC = 'dataFetched';

    pubSub.subscribe(TOPIC, (msg, data) => {
      const weather = {
        description: data.weather[0].description,
        city: data.name,
        country: data.sys.country,
        temperature: roundNumber(data.main.temp),
        feeling: roundNumber(data.main.feels_like),
        wind: data.wind.speed,
        humidity: data.main.humidity,
        units: data.units,
      };

      const NEW_TOPIC = 'dataProcessed';
      pubSub.publish(NEW_TOPIC, weather);
    });
  }

  function start() {
    getCurrentWeather();
  }

  return {
    start,
  };
})();

export default dataProcessor;
