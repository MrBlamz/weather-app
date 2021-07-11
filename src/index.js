import eventListener from './eventListener';
import dataFetcher from './dataFetcher';
import dataProcessor from './dataProcessor';
import domHandler from './domHandler';

eventListener.start();
dataFetcher.start();
dataProcessor.start();
domHandler.start();
