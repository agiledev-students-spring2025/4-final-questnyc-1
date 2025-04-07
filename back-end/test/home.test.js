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
      expect(res.body).to.have.property('progressData')
      expect(res.body).to.have.property('availableQuests')

      const { progressData, availableQuests } = res.body
      if (progressData != null) { // possible to have no current quest
        expect(progressData).to.have.property('id')
        expect(progressData).to.have.property('name')
        expect(progressData).to.have.property('nextCheckpoint')
        expect(progressData).to.have.property('progress')
      }


      expect(Array.isArray(availableQuests)).to.be.true
      expect(availableQuests[0]).to.have.property('id')
      expect(availableQuests[0]).to.have.property('name')
      expect(availableQuests[0]).to.have.property('route')

      done()
    })
})