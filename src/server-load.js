const NS_PER_MS = 1e6;
let eventLoopDelay = [0, 0];

import {convertToMs} from './utils/hrtime-ms'

function measureEventLoopDelay() {
  var interval = 500;
  var interval = setInterval(() => {
      const last = process.hrtime();
      setImmediate(() => {
          eventLoopDelay = process.hrtime(last);
      });
  }, interval);
  return interval;
}


const defaultOptions = {
  delayThresholdMS: 20,
}

export default function serverLoadMiddlewareRegistrar(options) {
  const {
    delayThresholdMS
  } = Object.assign({}, defaultOptions, options);

  const eventLoopTicker = measureEventLoopDelay();

  return function serverLoadMiddleware(req, res, next) {
    const eventLoopDelayMS = convertToMs(eventLoopDelay);

    req.eventLoopDelay = eventLoopDelayMS;
    req.highServerLoad = eventLoopDelayMS > delayThresholdMS;

    next()
  }
}
