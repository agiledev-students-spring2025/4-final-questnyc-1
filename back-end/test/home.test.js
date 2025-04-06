import { use, expect } from 'chai'
import { default as chaiHttp, request } from 'chai-http'
import app from '../app.js'

use(chaiHttp)

it('/api/home responds with correct structure', done => {
  request
    .execute(app)
    .get('/api/home')
    .end((err, res) => {
      expect(err).to.be.null
      expect(res).to.have.status(200)
      expect(res).to.be.json
      expect(res.body).to.have.property('currentQuest')
      expect(res.body).to.have.property('availableQuests')

      const { currentQuest, availableQuests } = res.body
      expect(currentQuest).to.have.property('name')
      expect(currentQuest).to.have.property('nextCheckpoint')
      expect(currentQuest).to.have.property('progress')

      expect(Array.isArray(availableQuests)).to.be.true
      expect(availableQuests.length).to.be.greaterThan(0)
      expect(availableQuests[0]).to.have.property('name')
      expect(availableQuests[0]).to.have.property('route')

      done()
    })
})