import express from 'express'
import machineLoadTrigger from '../src/machine-load'
import supertest from 'supertest'
import mockRoute, {resData} from './fixture/mock-route'

describe("Telemetry:: machine-load-trigger", function() {
  before(function() {
    this.isDelayed;
    this.onChange = chai.spy((isDelayed, req, res) => {
      this.isDelayed = isDelayed;
    })
    const app = express();
    app.use(machineLoadTrigger(this.onChange))
    mockRoute(app)
    this.request = supertest(app);
  })
  it("", function() {
    
  })
});