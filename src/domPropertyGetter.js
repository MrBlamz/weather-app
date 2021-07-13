import pubSub from 'pubsub-js';
import { unitsSwitchToggleCheckbox, form, city } from './domElements';

const domPropertyGetter = function domPropertyGetter() {
  function getSelectedUnits() {
    return unitsSwitchToggleCheckbox.checked ? 'imperial' : 'metric';
  }

  function getParametersFromFormToFetchWeatherData() {
    const TOPIC = 'formSubmitted';

    pubSub.subscribe(TOPIC, () => {
      const info = {
        city: form.querySelector('input').value,
        units: getSelectedUnits(),
      };

      const NEW_TOPIC = 'fetchData';
      pubSub.publish(NEW_TOPIC, info);
    });
  }

  function getParametersFromCardToFetchWeatherData() {
    const TOPIC = 'unitsSwitchToggleClicked';

    pubSub.subscribe(TOPIC, () => {
      const info = {
        city: city.textContent,
        units: getSelectedUnits(),
      };

      const NEW_TOPIC = 'fetchData';
      pubSub.publish(NEW_TOPIC, info);
    });
  }

  function start() {
    getParametersFromFormToFetchWeatherData();
    getParametersFromCardToFetchWeatherData();
  }

  return {
    start,
  };
};

export default domPropertyGetter;
