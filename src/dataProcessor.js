const dataProcessor = (function dataProcessor() {
  async function getCurrentWeather(data) {
    return data.current;
  }

  async function getDailyForecast(data) {
    return data.daily;
  }

  return {
    getCurrentWeather,
    getDailyForecast,
  };
})();

export default dataProcessor;
