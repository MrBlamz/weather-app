import eventListener from './eventListener';
import dataFetcher from './dataFetcher';
import dataProcessor from './dataProcessor';
import domHandler from './domHandler';
import geolocation from './geoLocation';

eventListener.start();
dataFetcher.start();
dataProcessor.start();
domHandler.start();
geolocation.start();
