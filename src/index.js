import eventListener from './eventListener';
import domPropertyGetter from './domPropertyGetter';
import dataFetcher from './dataFetcher';
import dataProcessor from './dataProcessor';
import domHandler from './domHandler';
import geolocation from './geoLocation';

eventListener.start();
domPropertyGetter().start();
dataFetcher.start();
dataProcessor.start();
domHandler.start();
geolocation.start();
