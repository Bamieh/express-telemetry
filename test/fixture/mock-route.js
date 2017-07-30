import express from 'express'

export const resStatus = 200;
export const resData = {
  somePayload: 3,
};

export default function mockRoute(app) {
  var route = express.Router();

  app.use('/test', route);

  route.get('*', function (req, res) {
    res.json(resData);
  });
};