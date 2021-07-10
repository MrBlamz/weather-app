import pubSub from 'pubsub-js';

const eventListener = (function eventListener() {
  const form = document.getElementById('form');

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
