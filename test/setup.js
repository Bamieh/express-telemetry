process.env.NODE_ENV = 'test';

require('babel-register')();
require("babel-polyfill");
import chai from 'chai';
import sinon from 'sinon';
import spies from 'chai-spies';

chai.use(spies);

global.chai = chai;
global.expect = chai.expect;
global.sinon = sinon;
