export default function(req, res, next) {
  if(req.highServerLoad || req.highMachineLoad || req.highResponseTime) {
    req.serverOnHighLoad = true;
  }
}