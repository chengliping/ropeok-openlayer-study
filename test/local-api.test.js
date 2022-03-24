const request = require('supertest');
const app = require('../bin/app');

describe('GET /user', function() {
  it('respond with json', function(done) {
    request(app)
      .get('/local-api/json/alarmInfo/alarmInfoStatisticsByType')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res)=>{
        expect(res.body.successFlag).toBe(true);
        done();
      }).catch((e)=>{
        console.error('请执行npm run api再试');
      });
  });
});
