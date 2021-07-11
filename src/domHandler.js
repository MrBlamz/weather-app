import pubSub from 'pubsub-js';
import {
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
      feeling.textContent = `Feels like: ${data.feeling}ºc`;
      wind.textContent = `Wind: ${data.wind} Kph`;
      humidity.textContent = `Humidity: ${data.humidity}%`;
    });
  }

  function start() {
    changeWeatherCard();
  }

  return {
    start,
  };
})();

export default domHandler;
