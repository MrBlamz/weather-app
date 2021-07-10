import pubSub from 'pubsub-js';

const dataProcessor = (function dataProcessor() {
  function getCurrentWeather() {
    const TOPIC = 'dataFetched';

    pubSub.subscribe(TOPIC, (msg, args) => {
      const currentWeather = args.data.current;
      console.log(currentWeather);
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
