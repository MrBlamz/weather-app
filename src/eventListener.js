import pubSub from 'pubsub-js';
import { form, unitsSwitchToggleCheckbox } from './domElements';

const eventListener = (function eventListener() {
  function pageLoaded() {
    const TOPIC = 'pageLoaded';

    document.addEventListener('DOMContentLoaded', () => {
      pubSub.publish(TOPIC);
    });
  }

  function formSubmitted() {
    const TOPIC = 'formSubmitted';

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      pubSub.publish(TOPIC, event);
    });
  }

  function unitsSwitchToggleClicked() {
    const TOPIC = 'unitsSwitchToggleClicked';

    unitsSwitchToggleCheckbox.addEventListener('change', (event) => {
      pubSub.publish(TOPIC, event);
    });
  }

  function start() {
    pageLoaded();
    formSubmitted();
    unitsSwitchToggleClicked();
  }

  return {
    start,
  };
})();

export default eventListener;
