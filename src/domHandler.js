import pubSub from 'pubsub-js';
import {
  error,
  description,
  city,
  temperature,
  feeling,
  wind,
  humidity,
} from './domElements';

const domHandler = (function domHandler() {
  function changeWeatherCard() {
    const TOPIC = 'dataProcessed';

    pubSub.subscribe(TOPIC, (msg, data) => {
      description.textContent = data.description;
      city.textContent = `${data.city}, ${data.country}`;
      temperature.textContent = `${data.temperature}ºc`;
      feeling.textContent = `${data.feeling}ºc`;
      wind.textContent = `${data.wind} Kph`;
      humidity.textContent = `${data.humidity}%`;
    });
  }

  function triggerError() {
    const TOPIC = 'fetchFailed';

    pubSub.subscribe(TOPIC, () => {
      error.classList.toggle('active');

      setTimeout(() => {
        error.classList.toggle('active');
      }, 3000);
    });
  }

  function start() {
    changeWeatherCard();
    triggerError();
  }

  return {
    start,
  };
})();

export default domHandler;
