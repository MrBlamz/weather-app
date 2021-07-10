import dataFetcher from './dataFetcher';
import dataProcessor from './dataProcessor';

dataFetcher
  .fetchWeatherData('Lisboa')
  .then((data) =>
    dataProcessor
      .getDailyForecast(data)
      .then((forecast) => console.log(forecast))
  )
  .catch((error) => console.log(error));
