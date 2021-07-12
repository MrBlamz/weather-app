import pubSub from 'pubsub-js';
import {
  body,
  form,
  error,
  loaderBackground,
  weatherCard,
  description,
  city,
  temperature,
  feeling,
  wind,
  humidity,
} from './domElements';

const domHandler = (function domHandler() {
  function makeElementVisible(element) {
    element.classList.add('active');
  }

  function makeElementInvisible(element) {
    element.classList.remove('active');
  }

  function triggerLoader() {
    const TOPIC = 'fetchData';

    pubSub.subscribe(TOPIC, () => {
      makeElementInvisible(weatherCard);
      makeElementVisible(loaderBackground);
    });
  }

  function closeLoader() {
    const TOPIC = 'dataProcessed';
    const SECOND_TOPIC = 'fetchFailed';

    pubSub.subscribe(TOPIC, () => {
      makeElementInvisible(loaderBackground);
      makeElementVisible(weatherCard);
    });

    pubSub.subscribe(SECOND_TOPIC, () => {
      makeElementInvisible(loaderBackground);
      makeElementVisible(weatherCard);
    });
  }

  function changeBackground(path) {
    body.style.background = `url(${path})`;
  }

  function changeBackgroundBasedOnLocalTime() {
    const hour = new Date().getHours();
    changeBackground(`./images/background/${hour}.jpg`);
  }

  function updateCard(data) {
    description.textContent = data.description;
    city.textContent = `${data.city}, ${data.country}`;
    temperature.textContent = `${data.temperature}ºc`;
    feeling.textContent = `${data.feeling}ºc`;
    wind.textContent = `${data.wind} Kph`;
    humidity.textContent = `${data.humidity}%`;
  }

  function changeWeatherCard() {
    const TOPIC = 'dataProcessed';

    pubSub.subscribe(TOPIC, (msg, data) => {
      updateCard(data);
    });
  }

  function clearForm() {
    const TOPIC = 'dataProcessed';

    pubSub.subscribe(TOPIC, () => {
      form.reset();
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
    changeBackgroundBasedOnLocalTime();
    triggerLoader();
    closeLoader();
    changeWeatherCard();
    clearForm();
    triggerError();
  }

  return {
    start,
  };
})();

export default domHandler;
