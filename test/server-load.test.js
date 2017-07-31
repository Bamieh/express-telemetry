import express from 'express'
import serverLoadMiddleware from '../src/server-load'
import supertest from 'supertest'
import mockRoute, {resData} from './fixture/mock-route'

import sleep from 'sleep';


describe("Telemetry:: server-load-trigger", function() {
  let eventLoopDelay;
  let highServerLoad;

  before(function() {

    const app = express();
    const route = express.Router();
    app.use(serverLoadMiddleware())

    app.use('/test', route);

    route.get('*', (req, res) => {
      eventLoopDelay = req.eventLoopDelay;
      highServerLoad = req.highServerLoad;
      res.json(resData);
    });

    this.request = supertest(app);
  })
  it("accepts `delayThresholdMS` option")

  it("does not interrupt the response", function(done) {
    this.request.get('/test').expect(200, (err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(resData);
      done();
    })
  })

  it("sets `req.highServerLoad` to false on normal server load", function(done) {
    this.request.get('/test').expect(200, (err, res) => {
      expect(highServerLoad).to.be.false;
      done();
    })
  })

  it.skip("sets `req.highServerLoad` to true on high server load", function(done) {
    this.request.get('/test').expect(200, (err, res) => {
      expect(highServerLoad).to.be.true;
      done();
    })
  })
  it("sets `req.eventLoopDelay` to delay in ms", function(done) {
    this.request.get('/test').expect(200, (err, res) => {
      expect(eventLoopDelay).to.be.a("number");
      done();
    })
  })

})