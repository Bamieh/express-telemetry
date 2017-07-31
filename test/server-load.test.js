import express from 'express'
import onLoadChangeTrigger from '../src/server-load'
import supertest from 'supertest'
import mockRoute, {resData} from './fixture/mock-route'

describe("Telemetry:: server-load-trigger", function() {
  before(function() {
    this.isDelayed;
    this.onLoadChange = chai.spy((isDelayed, req, res) => {
      this.isDelayed = isDelayed;
    })
    const app = express();
    var route = express.Router();
    route.get('*', function (req, res) {
      res.json(resData);
    });

    app.use('/test', route);


    app.use(onLoadChangeTrigger())

    this.request = supertest(app);
  })
  it("throws if no onLoadChange function is passed", function() {
    expect(onLoadChangeTrigger).to.throw();
  })
  it("does not interrupt the response", function(done) {
    this.request.get('/test').expect(200, (err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(resData);
      done();
    })
  })
  it("onLoadChange is called on first request", function() {
    expect(this.onLoadChange).to.be.called.once;
  })
  it.skip("onLoadChange passes `isDelayed, req, res` params", function() {
    expect(this.onLoadChange).to.have.been.called.with(Boolean, Object, Object);
  });
  it("sets isDelayed to true on server load", function(done) {
    let numberOfTicks = 1e7;
    while(numberOfTicks) { numberOfTicks-- }
    this.request.get('/test').expect(200, (err, res) => {
      expect(this.isDelayed).to.be.true;
      done();
    })
  })
})