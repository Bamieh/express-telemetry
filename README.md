[![npm version](https://badge.fury.io/js/express-telemetry-middleware.svg)](https://badge.fury.io/js/express-telemetry-middleware)
[![Build Status](https://travis-ci.org/Bamieh/express-telemetry.svg?branch=master)](https://travis-ci.org/Bamieh/express-telemetry)
[![Coverage Status](https://coveralls.io/repos/github/Bamieh/express-telemetry/badge.svg?branch=master)](https://coveralls.io/github/Bamieh/express-telemetry?branch=master)

# Express Telemetry

- Express Middleware
- Triggers
  - on high server load (long delays in the eventLoop)
  - on high response times (high response times)
  - on high machine load (high cpu or memory usage)


Inspired from Electrode's auto-ssr for Hapi.

## Installation 

```
npm install --save express-telemetry-middleware
```

## Usage
The `installTelemetry` instructs the app to use the 3 triggers as middlewares.

if any of the triggers hits a threshold, `appOnHighLoad` will be set to true.

```
import installTelemetry from 'express-telemetry-middleware'
import express from 'express';

const app = express();
installTelemetry(app, options);

route("/home", function(req, res) {
  console.log(req.appOnHighLoad);
})

```


## Options

Machine load:
- loadThreshold || 4;
- memoryThreshold || 80%;

Server Load:
- delayThresholdMS || 20


Response Time:
- longResponseThreshold || 5000;
- longResponseAmount || 6;
- disableExpiryMins || 2;

- headerDigits (3)
- headerName (X-Response-Time)
- suffix (false)


## added req attributes

Machine load:
- req.highMachineLoad

Server Load:
- req.eventLoopDelay
- req.highServerLoad

Response Time:
- req.highResponseTimeExpiration
- req.highResponseTime
- req.numberOfLongResponses





