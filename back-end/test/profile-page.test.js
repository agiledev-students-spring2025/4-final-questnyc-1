import { use, expect } from 'chai';
import { default as chaiHttp, request } from 'chai-http';
import app from '../app.js';

use(chaiHttp);

it('GET /api/profile returns user profile with correct structure', done => {
  request.execute(app)
    .get('/api/profile')
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res).to.be.json;

      expect(res.body).to.have.property('profilePic');
      expect(res.body).to.have.property('username');
      expect(res.body).to.have.property('firstJoined');

      done();
    });
});

it('PUT /api/profile updates and returns the updated profile', done => {
  const updatedProfile = {
    profilePic: 'https://picsum.photos/seed/new/100',
    username: 'Updated User',
    firstJoined: 'January 2023'
  };

  request.execute(app)
    .put('/api/profile')
    .send(updatedProfile)
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.equal('Profile updated successfully');
      expect(res.body.updatedProfile).to.deep.equal(updatedProfile);
      done();
    });
});
