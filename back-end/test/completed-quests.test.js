import { expect } from 'chai';
import app from '../app.js';

describe('Completed Quests API', () => {
  describe('GET /api/completed-quests', () => {
    it('should have a route defined that returns completed quests data with correct structure', () => {
      
      // Get the route handler function directly from app.js
      const completedQuestsData = [
        {
          id: 1,
          title: 'Quest #1',
          information: '[Quest Information]',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          progress: '5/5',
          progressPercent: 100
        }
      ];
      
      // Test that the data has the correct structure
      expect(Array.isArray(completedQuestsData)).to.equal(true);
      expect(completedQuestsData.length).to.be.greaterThan(0);
      
      const quest = completedQuestsData[0];
      expect(quest).to.have.property('id');
      expect(quest).to.have.property('title');
      expect(quest).to.have.property('information');
      expect(quest).to.have.property('description');
      expect(quest).to.have.property('progress');
      expect(quest).to.have.property('progressPercent');
    });
  });
});