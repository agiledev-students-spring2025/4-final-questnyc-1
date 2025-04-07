import { use, expect } from 'chai'
import { default as chaiHttp, request } from 'chai-http'
import app from '../app.js'

use(chaiHttp)

describe('Quest Details API', () => {
  let testQuestId;

  // Fetch a quest ID from the static quest list
  before((done) => {
    request.execute(app)
      .get('/api/home')
      .end((err, res) => {
        expect(res).to.have.status(200);
        const { availableQuests } = res.body;
        expect(availableQuests).to.be.an('array');
        testQuestId = availableQuests[0].id;
        done();
      });
  });

  describe('GET /api/quests/:questId', () => {
    it('should return quest details with correct structure', (done) => {
      request.execute(app)
        .get(`/api/quests/${testQuestId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.include.all.keys('id', 'name', 'points', 'expiration', 'reward');
          expect(res.body.id).to.equal(testQuestId);
          expect(res.body.points).to.be.an('array');
          done();
        });
    });

    it('should return 404 if quest is not found', (done) => {
      request.execute(app)
        .get('/api/quests/nonexistent')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('message', 'Quest not found');
          done();
        });
    });
  });

  describe('POST /api/quests/:questId/accept', () => {
    it('should accept a quest and return success message', (done) => {
      request.execute(app)
        .post(`/api/quests/${testQuestId}/accept`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').that.includes('accepted');
          expect(res.body.quest).to.include.all.keys('id', 'name', 'points');
          expect(res.body.quest.id).to.equal(testQuestId);
          done();
        });
    });

    it('should return 404 when accepting a nonexistent quest', (done) => {
      request.execute(app)
        .post('/api/quests/nonexistent/accept')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('message', 'Quest not found');
          done();
        });
    });
  });
});
