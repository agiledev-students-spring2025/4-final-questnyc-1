import { use, expect } from 'chai';
import { default as chaiHttp, request } from 'chai-http';
import app from '../app.js';

use(chaiHttp);

// Check structure for all 5 valid friends
[1, 2, 3, 4, 5].forEach((id) => {
  it(`/api/friends/${id}/profile responds with correct structure`, done => {
    request.execute(app)
      .get(`/api/friends/${id}/profile`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;

        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('profilePic');
        expect(res.body).to.have.property('username');
        expect(res.body).to.have.property('firstJoined');

        done();
      });
  });
});

// Check the 404 case
it('/api/friends/:friendId/profile responds with 404 if friend not found', done => {
  request.execute(app)
    .get('/api/friends/999/profile') // Invalid ID
    .end((err, res) => {
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.equal('Friend not found');
      done();
    });
});
