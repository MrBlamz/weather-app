import pubSub from 'pubsub-js';
import { form } from './domElements';

const eventListener = (function eventListener() {
  function formSubmitted() {
    const TOPIC = 'fetchData';

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      pubSub.publish(TOPIC, event);
    });
  }

  function start() {
    formSubmitted();
  }

  return { start };
})();

export default eventListener;
