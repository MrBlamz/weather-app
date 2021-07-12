import pubSub from 'pubsub-js';

const geoLocation = (function geoLocation() {
  function getCoordinates(options) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  function getUserLocation() {
    const TOPIC = 'pageLoaded';

    pubSub.subscribe(TOPIC, async () => {
      try {
        const location = await getCoordinates({ timeout: 10_000 });
        const { latitude, longitude } = location.coords;
        const NEW_TOPIC = 'locationAcquired';
        pubSub.publish(NEW_TOPIC, { latitude, longitude });
      } catch (error) {
        const NEW_TOPIC = 'failedToGetLocation';
        pubSub.publish(NEW_TOPIC);
      }
    });
  }

  function start() {
    getUserLocation();
  }

  return {
    start,
  };
})();

export default geoLocation;
