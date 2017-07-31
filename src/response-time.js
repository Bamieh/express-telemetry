import onHeaders from 'on-headers'
import hrtimeMs from './utils/hrtime-ms'

const DEFAULT_LONG_RESPONSE_THRESHOLD_MS = 5000;
const DEFAULT_LONG_RESPONSE_AMOUNT = 6;
const DEFAULT_DISABLE_EXPIRY_MINS = 2;
const MS_IN_MIN = 60000;
let numberOfLongResponses = 0;

export default function(options) {
  const longResponseThreshold = options.longResponseThreshold || DEFAULT_LONG_RESPONSE_THRESHOLD_MS;
  const longResponseAmount = options.longResponseAmount || DEFAULT_LONG_RESPONSE_AMOUNT;
  const disableExpiryMins = options.disableExpiryMins || DEFAULT_DISABLE_EXPIRY_MINS;
  const disableExpiryMs = disableExpiryMins * MS_IN_MIN;
  const setResponseTimeHeader = createSetHeader(options);

  let expires = Date.now();

  return function(req, res, next) {
    const startAt = process.hrtime()

    onHeaders(res, () => {
      var diffMS = hrtimeToMs(startAt);
      if(diffMS > longResponseThreshold) {
        ++numberOfLongResponses
      }
      setResponseTimeHeader(req, res, diffMS);
    })

    if(numberOfLongResponses > longResponseAmount) {
      expires = Date.now() + disableExpiryMs;
      numberOfLongResponses = 0;
    }
    if(Date.now() < expires) {
      req.highResponseTimeExpiration = expires;
      req.highResponseTime = true;
    }
    req.numberOfLongResponses = numberOfLongResponses;

    next();
  }
}



function createSetHeader (options) {
  const digits = typeof options.headerDigits === "number" ? options.headerDigits : 3
  const header = options.headerName || 'X-Response-Time'

  // display suffix
  var suffix = options.suffix;

  return function setResponseHeader (req, res, time) {
    if (res.getHeader(header)) return;
    res.setHeader(header, `${time.toFixed(digits)}${suffix? "ms" : ""}`)
  }
}

