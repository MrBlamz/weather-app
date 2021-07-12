import pubSub from 'pubsub-js';
import { form } from './domElements';

const eventListener = (function eventListener() {
  function pageLoaded() {
    const TOPIC = 'pageLoaded';

    document.addEventListener('DOMContentLoaded', () => {
      pubSub.publish(TOPIC);
    });
  }

  function formSubmitted() {
    const TOPIC = 'fetchData';

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      pubSub.publish(TOPIC, event);
    });
  }

  function start() {
    pageLoaded();
    formSubmitted();
  }

  return { start };
})();

export default eventListener;
