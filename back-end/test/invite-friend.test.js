import { use, expect } from 'chai';
import { default as chaiHttp, request } from 'chai-http';
import app from '../app.js';

use(chaiHttp);

it('POST /api/invite-friend responds with success message', done => {
  request.execute(app)
    .post('/api/invite-friend')
    .send({ phoneNumber: '123-456-7890' })
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.equal('Invitation sent to 123-456-7890');
      done();
    });


it('POST /api/invite-friend returns error for missing phoneNumber', done => {
    request.execute(app)
      .post('/api/invite-friend')
      .send({}) // missing phoneNumber
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        done();
      });
  });
  
});