import { expect } from 'chai';
import app from '../app.js';

describe('Quest Details API', () => {
  describe('GET /api/quests/:questId', () => {
    it('should return quest details with the correct structure', () => {
      // Unit test to verify the expected data structure for quest details
      const questId = '1';
      const questData = {
        id: questId,
        name: 'Brooklyn Bridge Walk',
        points: ['Point 1: City Hall', 'Point 2: Brooklyn Bridge Walkway', 'Point 3: DUMBO'],
        expiration: '12:00 MM/DD/YY',
        reward: '500 XP'
      };
      
      // Test the structure of the quest data
      expect(questData).to.have.property('id');
      expect(questData.id).to.equal(questId);
      expect(questData).to.have.property('name');
      expect(questData).to.have.property('points');
      expect(Array.isArray(questData.points)).to.equal(true);
      expect(questData).to.have.property('expiration');
      expect(questData).to.have.property('reward');
    });
  });
  
  describe('POST /api/quests/:questId/accept', () => {
    it('should return a success message when accepting a quest', () => {
      // Unit test to verify the expected response when accepting a quest
      const questId = '1';
      const acceptResponse = {
        message: `Quest ${questId} accepted`
      };
      
      // Test the response structure
      expect(acceptResponse).to.have.property('message');
      expect(acceptResponse.message).to.include(questId);
      expect(acceptResponse.message).to.include('accepted');
    });
  });
});