const NS_PER_MS = 1e6;
let eventLoopDelay = [0, 0];

function measureEventLoopDelay() {
  var interval = 500;
  var interval = setInterval(() => {
      const last = process.hrtime();
      setImmediate(() => {
          eventLoopDelay = process.hrtime(last);
          // console.log('eventloop tick!')
      });
  }, interval);
  return interval;
}



export default function factory(onChange, eventLoopDelayThresholdMS=40) {
  const eventLoopDelayThresholdNS = NS_PER_MS * eventLoopDelayThresholdMS;
  const eventLoopTicker = measureEventLoopDelay();

  return function(req, res, next) {
    const eventLoopDelayNS = eventLoopDelay[0] * NS_PER_SEC + eventLoopDelay[1];

    req.eventLoopDelay = eventLoopDelayNS;
    req.highServerLoad = eventLoopDelayThresholdNS > eventLoopDelayNS;

    next()
  }
}
