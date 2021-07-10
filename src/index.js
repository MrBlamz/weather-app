import dataFetcher from './dataFetcher';

dataFetcher.fetchWeatherData('Lisboa').then((data) => console.log(data));
