/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/pubsub-js/src/pubsub.js":
/*!**********************************************!*\
  !*** ./node_modules/pubsub-js/src/pubsub.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("/* module decorator */ module = __webpack_require__.nmd(module);\n/**\n * Copyright (c) 2010,2011,2012,2013,2014 Morgan Roderick http://roderick.dk\n * License: MIT - http://mrgnrdrck.mit-license.org\n *\n * https://github.com/mroderick/PubSubJS\n */\n\n(function (root, factory){\n    'use strict';\n\n    var PubSub = {};\n    root.PubSub = PubSub;\n    factory(PubSub);\n    // CommonJS and Node.js module support\n    if (true){\n        if (module !== undefined && module.exports) {\n            exports = module.exports = PubSub; // Node.js specific `module.exports`\n        }\n        exports.PubSub = PubSub; // CommonJS module 1.1.1 spec\n        module.exports = exports = PubSub; // CommonJS\n    }\n    // AMD support\n    /* eslint-disable no-undef */\n    else {}\n\n}(( typeof window === 'object' && window ) || this, function (PubSub){\n    'use strict';\n\n    var messages = {},\n        lastUid = -1,\n        ALL_SUBSCRIBING_MSG = '*';\n\n    function hasKeys(obj){\n        var key;\n\n        for (key in obj){\n            if ( Object.prototype.hasOwnProperty.call(obj, key) ){\n                return true;\n            }\n        }\n        return false;\n    }\n\n    /**\n     * Returns a function that throws the passed exception, for use as argument for setTimeout\n     * @alias throwException\n     * @function\n     * @param { Object } ex An Error object\n     */\n    function throwException( ex ){\n        return function reThrowException(){\n            throw ex;\n        };\n    }\n\n    function callSubscriberWithDelayedExceptions( subscriber, message, data ){\n        try {\n            subscriber( message, data );\n        } catch( ex ){\n            setTimeout( throwException( ex ), 0);\n        }\n    }\n\n    function callSubscriberWithImmediateExceptions( subscriber, message, data ){\n        subscriber( message, data );\n    }\n\n    function deliverMessage( originalMessage, matchedMessage, data, immediateExceptions ){\n        var subscribers = messages[matchedMessage],\n            callSubscriber = immediateExceptions ? callSubscriberWithImmediateExceptions : callSubscriberWithDelayedExceptions,\n            s;\n\n        if ( !Object.prototype.hasOwnProperty.call( messages, matchedMessage ) ) {\n            return;\n        }\n\n        for (s in subscribers){\n            if ( Object.prototype.hasOwnProperty.call(subscribers, s)){\n                callSubscriber( subscribers[s], originalMessage, data );\n            }\n        }\n    }\n\n    function createDeliveryFunction( message, data, immediateExceptions ){\n        return function deliverNamespaced(){\n            var topic = String( message ),\n                position = topic.lastIndexOf( '.' );\n\n            // deliver the message as it is now\n            deliverMessage(message, message, data, immediateExceptions);\n\n            // trim the hierarchy and deliver message to each level\n            while( position !== -1 ){\n                topic = topic.substr( 0, position );\n                position = topic.lastIndexOf('.');\n                deliverMessage( message, topic, data, immediateExceptions );\n            }\n\n            deliverMessage(message, ALL_SUBSCRIBING_MSG, data, immediateExceptions);\n        };\n    }\n\n    function hasDirectSubscribersFor( message ) {\n        var topic = String( message ),\n            found = Boolean(Object.prototype.hasOwnProperty.call( messages, topic ) && hasKeys(messages[topic]));\n\n        return found;\n    }\n\n    function messageHasSubscribers( message ){\n        var topic = String( message ),\n            found = hasDirectSubscribersFor(topic) || hasDirectSubscribersFor(ALL_SUBSCRIBING_MSG),\n            position = topic.lastIndexOf( '.' );\n\n        while ( !found && position !== -1 ){\n            topic = topic.substr( 0, position );\n            position = topic.lastIndexOf( '.' );\n            found = hasDirectSubscribersFor(topic);\n        }\n\n        return found;\n    }\n\n    function publish( message, data, sync, immediateExceptions ){\n        message = (typeof message === 'symbol') ? message.toString() : message;\n\n        var deliver = createDeliveryFunction( message, data, immediateExceptions ),\n            hasSubscribers = messageHasSubscribers( message );\n\n        if ( !hasSubscribers ){\n            return false;\n        }\n\n        if ( sync === true ){\n            deliver();\n        } else {\n            setTimeout( deliver, 0 );\n        }\n        return true;\n    }\n\n    /**\n     * Publishes the message, passing the data to it's subscribers\n     * @function\n     * @alias publish\n     * @param { String } message The message to publish\n     * @param {} data The data to pass to subscribers\n     * @return { Boolean }\n     */\n    PubSub.publish = function( message, data ){\n        return publish( message, data, false, PubSub.immediateExceptions );\n    };\n\n    /**\n     * Publishes the message synchronously, passing the data to it's subscribers\n     * @function\n     * @alias publishSync\n     * @param { String } message The message to publish\n     * @param {} data The data to pass to subscribers\n     * @return { Boolean }\n     */\n    PubSub.publishSync = function( message, data ){\n        return publish( message, data, true, PubSub.immediateExceptions );\n    };\n\n    /**\n     * Subscribes the passed function to the passed message. Every returned token is unique and should be stored if you need to unsubscribe\n     * @function\n     * @alias subscribe\n     * @param { String } message The message to subscribe to\n     * @param { Function } func The function to call when a new message is published\n     * @return { String }\n     */\n    PubSub.subscribe = function( message, func ){\n        if ( typeof func !== 'function'){\n            return false;\n        }\n\n        message = (typeof message === 'symbol') ? message.toString() : message;\n\n        // message is not registered yet\n        if ( !Object.prototype.hasOwnProperty.call( messages, message ) ){\n            messages[message] = {};\n        }\n\n        // forcing token as String, to allow for future expansions without breaking usage\n        // and allow for easy use as key names for the 'messages' object\n        var token = 'uid_' + String(++lastUid);\n        messages[message][token] = func;\n\n        // return token for unsubscribing\n        return token;\n    };\n\n    PubSub.subscribeAll = function( func ){\n        return PubSub.subscribe(ALL_SUBSCRIBING_MSG, func);\n    };\n\n    /**\n     * Subscribes the passed function to the passed message once\n     * @function\n     * @alias subscribeOnce\n     * @param { String } message The message to subscribe to\n     * @param { Function } func The function to call when a new message is published\n     * @return { PubSub }\n     */\n    PubSub.subscribeOnce = function( message, func ){\n        var token = PubSub.subscribe( message, function(){\n            // before func apply, unsubscribe message\n            PubSub.unsubscribe( token );\n            func.apply( this, arguments );\n        });\n        return PubSub;\n    };\n\n    /**\n     * Clears all subscriptions\n     * @function\n     * @public\n     * @alias clearAllSubscriptions\n     */\n    PubSub.clearAllSubscriptions = function clearAllSubscriptions(){\n        messages = {};\n    };\n\n    /**\n     * Clear subscriptions by the topic\n     * @function\n     * @public\n     * @alias clearAllSubscriptions\n     * @return { int }\n     */\n    PubSub.clearSubscriptions = function clearSubscriptions(topic){\n        var m;\n        for (m in messages){\n            if (Object.prototype.hasOwnProperty.call(messages, m) && m.indexOf(topic) === 0){\n                delete messages[m];\n            }\n        }\n    };\n\n    /**\n       Count subscriptions by the topic\n     * @function\n     * @public\n     * @alias countSubscriptions\n     * @return { Array }\n    */\n    PubSub.countSubscriptions = function countSubscriptions(topic){\n        var m;\n        // eslint-disable-next-line no-unused-vars\n        var token;\n        var count = 0;\n        for (m in messages) {\n            if (Object.prototype.hasOwnProperty.call(messages, m) && m.indexOf(topic) === 0) {\n                for (token in messages[m]) {\n                    count++;\n                }\n                break;\n            }\n        }\n        return count;\n    };\n\n\n    /**\n       Gets subscriptions by the topic\n     * @function\n     * @public\n     * @alias getSubscriptions\n    */\n    PubSub.getSubscriptions = function getSubscriptions(topic){\n        var m;\n        var list = [];\n        for (m in messages){\n            if (Object.prototype.hasOwnProperty.call(messages, m) && m.indexOf(topic) === 0){\n                list.push(m);\n            }\n        }\n        return list;\n    };\n\n    /**\n     * Removes subscriptions\n     *\n     * - When passed a token, removes a specific subscription.\n     *\n\t * - When passed a function, removes all subscriptions for that function\n     *\n\t * - When passed a topic, removes all subscriptions for that topic (hierarchy)\n     * @function\n     * @public\n     * @alias subscribeOnce\n     * @param { String | Function } value A token, function or topic to unsubscribe from\n     * @example // Unsubscribing with a token\n     * var token = PubSub.subscribe('mytopic', myFunc);\n     * PubSub.unsubscribe(token);\n     * @example // Unsubscribing with a function\n     * PubSub.unsubscribe(myFunc);\n     * @example // Unsubscribing from a topic\n     * PubSub.unsubscribe('mytopic');\n     */\n    PubSub.unsubscribe = function(value){\n        var descendantTopicExists = function(topic) {\n                var m;\n                for ( m in messages ){\n                    if ( Object.prototype.hasOwnProperty.call(messages, m) && m.indexOf(topic) === 0 ){\n                        // a descendant of the topic exists:\n                        return true;\n                    }\n                }\n\n                return false;\n            },\n            isTopic    = typeof value === 'string' && ( Object.prototype.hasOwnProperty.call(messages, value) || descendantTopicExists(value) ),\n            isToken    = !isTopic && typeof value === 'string',\n            isFunction = typeof value === 'function',\n            result = false,\n            m, message, t;\n\n        if (isTopic){\n            PubSub.clearSubscriptions(value);\n            return;\n        }\n\n        for ( m in messages ){\n            if ( Object.prototype.hasOwnProperty.call( messages, m ) ){\n                message = messages[m];\n\n                if ( isToken && message[value] ){\n                    delete message[value];\n                    result = value;\n                    // tokens are unique, so we can just stop here\n                    break;\n                }\n\n                if (isFunction) {\n                    for ( t in message ){\n                        if (Object.prototype.hasOwnProperty.call(message, t) && message[t] === value){\n                            delete message[t];\n                            result = true;\n                        }\n                    }\n                }\n            }\n        }\n\n        return result;\n    };\n}));\n\n\n//# sourceURL=webpack://weather-app/./node_modules/pubsub-js/src/pubsub.js?");

/***/ }),

/***/ "./src/dataFetcher.js":
/*!****************************!*\
  !*** ./src/dataFetcher.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var pubsub_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pubsub-js */ \"./node_modules/pubsub-js/src/pubsub.js\");\n/* harmony import */ var pubsub_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pubsub_js__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst dataFetcher = (function dataFetcher() {\n  const API_KEY = '9611e63a364330a164a7c9a943fef32e';\n\n  function handleErrors(response) {\n    if (!response.ok) {\n      throw new Error(response.statusText);\n    }\n\n    return response;\n  }\n\n  function fetchWeatherDataByCoordinates() {\n    const TOPIC = 'locationAcquired';\n\n    pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().subscribe(TOPIC, async (msg, coordinates) => {\n      try {\n        const { latitude, longitude } = coordinates;\n        const data = await fetch(\n          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`\n        )\n          .then(handleErrors)\n          .then((response) => response.json());\n\n        const NEW_TOPIC = 'dataFetched';\n        pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().publish(NEW_TOPIC, data);\n      } catch (error) {\n        console.log(error);\n      }\n    });\n  }\n\n  function fetchWeatherDataByCity() {\n    const TOPIC = 'fetchData';\n\n    pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().subscribe(TOPIC, async (msg, event) => {\n      try {\n        const city = event.target.querySelector('input').value;\n        const data = await fetch(\n          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`\n        )\n          .then(handleErrors)\n          .then((response) => response.json());\n\n        const NEW_TOPIC = 'dataFetched';\n        pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().publish(NEW_TOPIC, data);\n      } catch (error) {\n        const NEW_TOPIC = 'fetchFailed';\n        pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().publish(NEW_TOPIC);\n      }\n    });\n  }\n\n  function start() {\n    fetchWeatherDataByCoordinates();\n    fetchWeatherDataByCity();\n  }\n\n  return {\n    start,\n  };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dataFetcher);\n\n\n//# sourceURL=webpack://weather-app/./src/dataFetcher.js?");

/***/ }),

/***/ "./src/dataProcessor.js":
/*!******************************!*\
  !*** ./src/dataProcessor.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var pubsub_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pubsub-js */ \"./node_modules/pubsub-js/src/pubsub.js\");\n/* harmony import */ var pubsub_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pubsub_js__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst dataProcessor = (function dataProcessor() {\n  function roundNumber(number) {\n    return Math.round(number);\n  }\n\n  function getCurrentWeather() {\n    const TOPIC = 'dataFetched';\n\n    pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().subscribe(TOPIC, (msg, data) => {\n      const weather = {\n        description: data.weather[0].description,\n        city: data.name,\n        country: data.sys.country,\n        temperature: roundNumber(data.main.temp),\n        feeling: roundNumber(data.main.feels_like),\n        wind: data.wind.speed,\n        humidity: data.main.humidity,\n      };\n\n      const NEW_TOPIC = 'dataProcessed';\n      pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().publish(NEW_TOPIC, weather);\n    });\n  }\n\n  function start() {\n    getCurrentWeather();\n  }\n\n  return {\n    start,\n  };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dataProcessor);\n\n\n//# sourceURL=webpack://weather-app/./src/dataProcessor.js?");

/***/ }),

/***/ "./src/domElements.js":
/*!****************************!*\
  !*** ./src/domElements.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"body\": () => (/* binding */ body),\n/* harmony export */   \"loaderBackground\": () => (/* binding */ loaderBackground),\n/* harmony export */   \"form\": () => (/* binding */ form),\n/* harmony export */   \"search\": () => (/* binding */ search),\n/* harmony export */   \"error\": () => (/* binding */ error),\n/* harmony export */   \"weatherCard\": () => (/* binding */ weatherCard),\n/* harmony export */   \"description\": () => (/* binding */ description),\n/* harmony export */   \"city\": () => (/* binding */ city),\n/* harmony export */   \"temperature\": () => (/* binding */ temperature),\n/* harmony export */   \"feeling\": () => (/* binding */ feeling),\n/* harmony export */   \"wind\": () => (/* binding */ wind),\n/* harmony export */   \"humidity\": () => (/* binding */ humidity)\n/* harmony export */ });\nconst body = document.querySelector('body');\nconst loaderBackground = document.getElementById('loader-background');\nconst form = document.getElementById('form');\nconst search = document.querySelector('.search');\nconst error = document.getElementById('error');\nconst weatherCard = document.querySelector('.weather-card');\nconst description = document.getElementById('description');\nconst city = document.getElementById('city');\nconst temperature = document.getElementById('temperature');\nconst feeling = document.getElementById('feeling');\nconst wind = document.getElementById('wind');\nconst humidity = document.getElementById('humidity');\n\n\n//# sourceURL=webpack://weather-app/./src/domElements.js?");

/***/ }),

/***/ "./src/domHandler.js":
/*!***************************!*\
  !*** ./src/domHandler.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var pubsub_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pubsub-js */ \"./node_modules/pubsub-js/src/pubsub.js\");\n/* harmony import */ var pubsub_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pubsub_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _domElements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domElements */ \"./src/domElements.js\");\n\n\n\nconst domHandler = (function domHandler() {\n  function changeCSSVariable(root, name, value) {\n    root.style.setProperty(name, value);\n  }\n\n  function getBackgroundColorBasedOnLocalTime(hour) {\n    let color;\n\n    switch (true) {\n      case hour === 1 || hour === 2:\n        color = '#0d1237';\n        break;\n      case hour === 3 || hour === 4:\n        color = '#1a1941';\n        break;\n      case hour === 5 || hour === 6:\n        color = '#33224f';\n        break;\n      case hour === 7:\n        color = '#6a3970';\n        break;\n      case hour === 8:\n        color = '#29799e';\n        break;\n      case hour === 9 || hour === 10:\n        color = '#2a6c9e';\n        break;\n      case hour === 11 || hour === 12:\n        color = '#2f6aa2';\n        break;\n      case hour >= 13 && hour <= 15:\n        color = '#4574a2';\n        break;\n      case hour === 16 || hour === 17:\n        color = '#456795';\n        break;\n      case hour === 18 || hour === 19:\n        color = '#33416d';\n        break;\n      case hour === 20 || hour === 21:\n        color = '#1f2444';\n        break;\n      case hour >= 22 || hour === 0:\n        color = '#0a1236';\n        break;\n      default:\n        break;\n    }\n\n    return color;\n  }\n\n  function changeSearchBackgroundColor() {\n    const TOPIC = 'pageLoaded';\n\n    pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().subscribe(TOPIC, () => {\n      const hour = new Date().getHours();\n      const color = getBackgroundColorBasedOnLocalTime(hour);\n      changeCSSVariable(_domElements__WEBPACK_IMPORTED_MODULE_1__.search, '--primary-color', color);\n      changeCSSVariable(_domElements__WEBPACK_IMPORTED_MODULE_1__.search, '--background', color);\n    });\n  }\n\n  function makeElementVisible(element) {\n    element.classList.add('active');\n  }\n\n  function makeElementInvisible(element) {\n    element.classList.remove('active');\n  }\n\n  function triggerLoader() {\n    const TOPIC = 'fetchData';\n\n    pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().subscribe(TOPIC, () => {\n      makeElementInvisible(_domElements__WEBPACK_IMPORTED_MODULE_1__.weatherCard);\n      makeElementVisible(_domElements__WEBPACK_IMPORTED_MODULE_1__.loaderBackground);\n    });\n  }\n\n  function closeLoader() {\n    const TOPIC = 'dataProcessed';\n    const SECOND_TOPIC = 'fetchFailed';\n\n    pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().subscribe(TOPIC, () => {\n      makeElementInvisible(_domElements__WEBPACK_IMPORTED_MODULE_1__.loaderBackground);\n      makeElementVisible(_domElements__WEBPACK_IMPORTED_MODULE_1__.weatherCard);\n    });\n\n    pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().subscribe(SECOND_TOPIC, () => {\n      makeElementInvisible(_domElements__WEBPACK_IMPORTED_MODULE_1__.loaderBackground);\n      makeElementVisible(_domElements__WEBPACK_IMPORTED_MODULE_1__.weatherCard);\n    });\n  }\n\n  function changeBackground(path) {\n    _domElements__WEBPACK_IMPORTED_MODULE_1__.body.style.background = `url(${path})`;\n  }\n\n  function changeBackgroundBasedOnLocalTime() {\n    const hour = new Date().getHours();\n    changeBackground(`./images/background/${hour}.jpg`);\n  }\n\n  function updateCard(data) {\n    _domElements__WEBPACK_IMPORTED_MODULE_1__.description.textContent = data.description;\n    _domElements__WEBPACK_IMPORTED_MODULE_1__.city.textContent = `${data.city}, ${data.country}`;\n    _domElements__WEBPACK_IMPORTED_MODULE_1__.temperature.textContent = `${data.temperature}ºc`;\n    _domElements__WEBPACK_IMPORTED_MODULE_1__.feeling.textContent = `${data.feeling}ºc`;\n    _domElements__WEBPACK_IMPORTED_MODULE_1__.wind.textContent = `${data.wind} Kph`;\n    _domElements__WEBPACK_IMPORTED_MODULE_1__.humidity.textContent = `${data.humidity}%`;\n  }\n\n  function changeWeatherCard() {\n    const TOPIC = 'dataProcessed';\n\n    pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().subscribe(TOPIC, (msg, data) => {\n      updateCard(data);\n    });\n  }\n\n  function clearForm() {\n    const TOPIC = 'dataProcessed';\n\n    pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().subscribe(TOPIC, () => {\n      _domElements__WEBPACK_IMPORTED_MODULE_1__.form.reset();\n    });\n  }\n\n  function triggerError() {\n    const TOPIC = 'fetchFailed';\n\n    pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().subscribe(TOPIC, () => {\n      _domElements__WEBPACK_IMPORTED_MODULE_1__.error.classList.toggle('active');\n\n      setTimeout(() => {\n        _domElements__WEBPACK_IMPORTED_MODULE_1__.error.classList.toggle('active');\n      }, 3000);\n    });\n  }\n\n  function start() {\n    changeBackgroundBasedOnLocalTime();\n    changeSearchBackgroundColor();\n    triggerLoader();\n    closeLoader();\n    changeWeatherCard();\n    clearForm();\n    triggerError();\n  }\n\n  return {\n    start,\n  };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (domHandler);\n\n\n//# sourceURL=webpack://weather-app/./src/domHandler.js?");

/***/ }),

/***/ "./src/eventListener.js":
/*!******************************!*\
  !*** ./src/eventListener.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var pubsub_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pubsub-js */ \"./node_modules/pubsub-js/src/pubsub.js\");\n/* harmony import */ var pubsub_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pubsub_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _domElements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domElements */ \"./src/domElements.js\");\n\n\n\nconst eventListener = (function eventListener() {\n  function pageLoaded() {\n    const TOPIC = 'pageLoaded';\n\n    document.addEventListener('DOMContentLoaded', () => {\n      pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().publish(TOPIC);\n    });\n  }\n\n  function formSubmitted() {\n    const TOPIC = 'fetchData';\n\n    _domElements__WEBPACK_IMPORTED_MODULE_1__.form.addEventListener('submit', (event) => {\n      event.preventDefault();\n      pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().publish(TOPIC, event);\n    });\n  }\n\n  function start() {\n    pageLoaded();\n    formSubmitted();\n  }\n\n  return { start };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (eventListener);\n\n\n//# sourceURL=webpack://weather-app/./src/eventListener.js?");

/***/ }),

/***/ "./src/geoLocation.js":
/*!****************************!*\
  !*** ./src/geoLocation.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var pubsub_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pubsub-js */ \"./node_modules/pubsub-js/src/pubsub.js\");\n/* harmony import */ var pubsub_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pubsub_js__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst geoLocation = (function geoLocation() {\n  function getCoordinates(options) {\n    return new Promise((resolve, reject) => {\n      navigator.geolocation.getCurrentPosition(resolve, reject, options);\n    });\n  }\n\n  function getUserLocation() {\n    const TOPIC = 'pageLoaded';\n\n    pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().subscribe(TOPIC, async () => {\n      try {\n        const location = await getCoordinates({ timeout: 10_000 });\n        const { latitude, longitude } = location.coords;\n        const NEW_TOPIC = 'locationAcquired';\n        pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().publish(NEW_TOPIC, { latitude, longitude });\n      } catch (error) {\n        const { latitude, longitude } = {\n          latitude: 51.509865,\n          longitude: -0.118092,\n        };\n        const NEW_TOPIC = 'locationAcquired';\n        pubsub_js__WEBPACK_IMPORTED_MODULE_0___default().publish(NEW_TOPIC, { latitude, longitude });\n      }\n    });\n  }\n\n  function start() {\n    getUserLocation();\n  }\n\n  return {\n    start,\n  };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (geoLocation);\n\n\n//# sourceURL=webpack://weather-app/./src/geoLocation.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _eventListener__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventListener */ \"./src/eventListener.js\");\n/* harmony import */ var _dataFetcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataFetcher */ \"./src/dataFetcher.js\");\n/* harmony import */ var _dataProcessor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dataProcessor */ \"./src/dataProcessor.js\");\n/* harmony import */ var _domHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./domHandler */ \"./src/domHandler.js\");\n/* harmony import */ var _geoLocation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./geoLocation */ \"./src/geoLocation.js\");\n\n\n\n\n\n\n_eventListener__WEBPACK_IMPORTED_MODULE_0__.default.start();\n_dataFetcher__WEBPACK_IMPORTED_MODULE_1__.default.start();\n_dataProcessor__WEBPACK_IMPORTED_MODULE_2__.default.start();\n_domHandler__WEBPACK_IMPORTED_MODULE_3__.default.start();\n_geoLocation__WEBPACK_IMPORTED_MODULE_4__.default.start();\n\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;