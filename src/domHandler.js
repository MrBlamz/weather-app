import pubSub from 'pubsub-js';
import {
  body,
  form,
  search,
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
  function changeCSSVariable(root, name, value) {
    root.style.setProperty(name, value);
  }

  function getBackgroundColorBasedOnLocalTime(hour) {
    let color;

    switch (true) {
      case hour === 1 || hour === 2:
        color = '#0d1237';
        break;
      case hour === 3 || hour === 4:
        color = '#1a1941';
        break;
      case hour === 5 || hour === 6:
        color = '#33224f';
        break;
      case hour === 7:
        color = '#6a3970';
        break;
      case hour === 8:
        color = '#29799e';
        break;
      case hour === 9 || hour === 10:
        color = '#2a6c9e';
        break;
      case hour === 11 || hour === 12:
        color = '#2f6aa2';
        break;
      case hour >= 13 && hour <= 15:
        color = '#4574a2';
        break;
      case hour === 16 || hour === 17:
        color = '#456795';
        break;
      case hour === 18 || hour === 19:
        color = '#33416d';
        break;
      case hour === 20 || hour === 21:
        color = '#1f2444';
        break;
      case hour >= 22 || hour === 0:
        color = '#0a1236';
        break;
      default:
        break;
    }

    return color;
  }

  function changeSearchBackgroundColor() {
    const TOPIC = 'pageLoaded';

    pubSub.subscribe(TOPIC, () => {
      const hour = new Date().getHours();
      const color = getBackgroundColorBasedOnLocalTime(hour);
      changeCSSVariable(search, '--primary-color', color);
      changeCSSVariable(search, '--background', color);
    });
  }

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
    changeSearchBackgroundColor();
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
