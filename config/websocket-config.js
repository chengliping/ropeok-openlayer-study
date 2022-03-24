let wsConfig = [
  {
    path: '/webSocket/policeCarInfo/',
    json: require('../api/json/webSocket/policeCarInfo')
  },
  {
    path: '/webSocket/policeInfo/',
    json: require('../api/json/webSocket/policeInfo')
  }
];
module.exports = wsConfig;
