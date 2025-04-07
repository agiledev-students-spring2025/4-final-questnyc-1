import { use, expect } from 'chai';
import { default as chaiHttp, request } from 'chai-http';
import app from '../app.js';

use(chaiHttp);

describe('Achievements API', () => {
  describe('GET /api/achievements', () => {
    it('should return an array of achievements with required properties', (done) => {
      request.execute(app)
        .get('/api/achievements')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');

          res.body.forEach((achievement) => {
            expect(achievement).to.include.all.keys('name', 'progress', 'total', 'completed');
            expect(achievement.name).to.be.a('string');
            expect(achievement.progress).to.be.a('number');
            expect(achievement.total).to.be.a('number');
            expect(achievement.completed).to.be.a('boolean');
          });

          done();
        });
    });

    it('should mark completed achievements properly when progress equals total', (done) => {
      request.execute(app)
        .get('/api/achievements')
        .end((err, res) => {
          res.body.forEach((achievement) => {
            if (achievement.progress === achievement.total) {
              expect(achievement.completed).to.be.true;
            }
          });

          done();
        });
    });
  });
});
