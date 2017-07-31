import machineLoadTelemetry from '../src/machine-load'
import serverLoadTelemetry from '../src/server-load'
import responseTimeTelemetry from '../src/response-time'

export function serverOnhighLoad(req, res, next) {
  if(req.highServerLoad || req.highMachineLoad || req.highResponseTime) {
    req.appOnHighLoad = true;
  }
  next();
}

export default function(app, options) {
  app.use(machineLoadTelemetry(options))
  app.use(serverLoadTelemetry(options))
  app.use(responseTimeTelemetry(options))
  app.use(serverOnhighLoad);
}