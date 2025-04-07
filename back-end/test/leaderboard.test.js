import { use, expect } from 'chai';
import { default as chaiHttp, request } from 'chai-http';
import app from '../app.js';

use(chaiHttp);

describe('Leaderboard API', () => {
  describe('GET /api/leaderboard', () => {
    it('should return an array of leaderboard entries with rank, username, and score', (done) => {
      request.execute(app)
        .get('/api/leaderboard')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');

          res.body.forEach((entry, index) => {
            expect(entry).to.include.all.keys('rank', 'username', 'score');
            expect(entry.rank).to.equal(index + 1); // rank should match index
            expect(entry.username).to.be.a('string');
            expect(entry.score).to.be.a('number');
          });

          done();
        });
    });

    it('should return the leaderboard sorted in descending order by score', (done) => {
      request.execute(app)
        .get('/api/leaderboard')
        .end((err, res) => {
          const scores = res.body.map(player => player.score);
          const sorted = [...scores].sort((a, b) => b - a);
          expect(scores).to.deep.equal(sorted);
          done();
        });
    });
  });
});
