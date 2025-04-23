import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Quest from './models/Quest.js';

dotenv.config();

const seedQuests = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create sample quests
    const quests = [
      {
        name: 'Brooklyn Bridge Walk',
        description: 'Explore the historic Brooklyn Bridge and surrounding areas',
        theme: 'Historic NYC',
        difficulty: 'easy',
        estimatedTime: 90, // minutes
        distance: 2.5, // kilometers
        startLocation: {
          type: 'Point',
          coordinates: [-73.9962, 40.7061] // Long, Lat for Brooklyn Bridge
        },
        checkpoints: [
          {
            name: 'City Hall',
            description: 'Start at City Hall Park',
            location: {
              type: 'Point',
              coordinates: [-74.0059, 40.7127]
            },
            hints: ['Look for the fountain', 'Near the subway entrance'],
            trivia: 'City Hall is the oldest city hall in the US that still houses its original government functions',
            challengeType: 'quiz',
            challengeData: {
              question: 'What year was City Hall completed?',
              options: ['1802', '1812', '1822', '1832'],
              answer: '1812'
            },
            order: 1
          },
          {
            name: 'Brooklyn Bridge Walkway',
            description: 'Walk to the center of Brooklyn Bridge',
            location: {
              type: 'Point',
              coordinates: [-73.9962, 40.7061]
            },
            hints: ['Look for the plaques', 'Great photo spot'],
            trivia: 'The Brooklyn Bridge was the world\'s first steel-wire suspension bridge',
            challengeType: 'riddle',
            challengeData: 'I connect two lands but I\'m not a bridge. I flow beneath your feet but I\'m not blood. What am I?',
            order: 2
          },
          {
            name: 'DUMBO',
            description: 'Finish at DUMBO (Down Under the Manhattan Bridge Overpass)',
            location: {
              type: 'Point',
              coordinates: [-73.9897, 40.7033]
            },
            hints: ['Famous photo spot on Washington Street', 'Near the carousel'],
            trivia: 'DUMBO was once an industrial area before becoming one of NYC\'s most expensive neighborhoods',
            challengeType: 'photo',
            challengeData: 'Take a photo of the Manhattan Bridge view from Washington Street',
            order: 3
          }
        ],
        rewardXP: 300,
        rewardItems: ['Brooklyn Bridge Badge', 'NYC Explorer Points'],
        isActive: true,
        completionCriteria: 'all-checkpoints',
        isVerified: true,
        generatedBy: 'admin'
      },
      {
        name: 'Central Park Nature',
        description: 'Discover the natural beauty of Central Park',
        theme: 'Nature',
        difficulty: 'medium',
        estimatedTime: 120,
        distance: 3.2,
        startLocation: {
          type: 'Point',
          coordinates: [-73.9654, 40.7829] // Central Park
        },
        checkpoints: [
          {
            name: 'Bethesda Fountain',
            description: 'Start at the iconic Bethesda Fountain',
            location: {
              type: 'Point',
              coordinates: [-73.9706, 40.7735]
            },
            hints: ['Near the lake', 'Look for the angel statue'],
            trivia: 'The Bethesda Fountain is one of the largest fountains in New York',
            challengeType: 'quiz',
            challengeData: {
              question: 'What is the name of the statue atop the fountain?',
              options: ['Angel of the Waters', 'Bethesda Angel', 'Central Park Angel', 'New York Guardian'],
              answer: 'Angel of the Waters'
            },
            order: 1
          },
          {
            name: 'Strawberry Fields',
            description: 'Visit the John Lennon memorial',
            location: {
              type: 'Point',
              coordinates: [-73.9753, 40.7756]
            },
            hints: ['Near West 72nd Street', 'Look for the mosaic'],
            trivia: 'Strawberry Fields is named after the Beatles song "Strawberry Fields Forever"',
            challengeType: 'riddle',
            challengeData: 'Imagine I\'m a circle within a square, honoring a man who is no longer there. What word do I spell?',
            order: 2
          }
        ],
        rewardXP: 250,
        rewardItems: ['Nature Explorer Badge', 'Central Park Map'],
        isActive: true,
        completionCriteria: 'all-checkpoints',
        isVerified: true,
        generatedBy: 'admin'
      },
      {
        name: 'Times Square Photo Hunt',
        description: 'Capture the energy of the city that never sleeps',
        theme: 'Cultural',
        difficulty: 'easy',
        estimatedTime: 60,
        distance: 1.0,
        startLocation: {
          type: 'Point',
          coordinates: [-73.9855, 40.7580] // Times Square
        },
        checkpoints: [
          {
            name: 'Red Steps',
            description: 'Start at the TKTS Red Steps',
            location: {
              type: 'Point',
              coordinates: [-73.9870, 40.7568]
            },
            hints: ['Look for the bright red staircases', 'Near 47th Street'],
            trivia: 'The TKTS Red Steps opened in 2008 and offer a great view of Times Square',
            challengeType: 'photo',
            challengeData: 'Take a photo while sitting on the Red Steps',
            order: 1
          },
          {
            name: 'Digital Billboards',
            description: 'Find the famous curved digital screen',
            location: {
              type: 'Point',
              coordinates: [-73.9855, 40.7580]
            },
            hints: ['Look up at the curved building', 'Near One Times Square'],
            trivia: 'The LED screens here use enough electricity to power 161 homes for a year',
            challengeType: 'quiz',
            challengeData: {
              question: 'What happens at One Times Square every New Year\'s Eve?',
              options: ['Fireworks display', 'Ball drop', 'Concert', 'Light show'],
              answer: 'Ball drop'
            },
            order: 2
          }
        ],
        rewardXP: 200,
        rewardItems: ['Times Square Badge', 'Bright Lights Achievement'],
        isActive: true,
        completionCriteria: 'all-checkpoints',
        isVerified: true,
        generatedBy: 'admin'
      },
      {
        name: 'Greenwich Village Ghost Tour',
        description: 'Explore the haunted history of Greenwich Village',
        theme: 'Ghost Stories',
        difficulty: 'medium',
        estimatedTime: 90,
        distance: 2.0,
        startLocation: {
          type: 'Point',
          coordinates: [-73.9969, 40.7312] // Washington Square Park
        },
        checkpoints: [
          {
            name: 'Washington Square Park',
            description: 'Start at the allegedly haunted park',
            location: {
              type: 'Point',
              coordinates: [-73.9969, 40.7312]
            },
            hints: ['Near the arch', 'Look for the fountain'],
            trivia: 'The park was once a potter\'s field with over 20,000 buried beneath',
            challengeType: 'riddle',
            challengeData: 'I stand tall but say nothing, I\'ve seen the dead and the living, I arch over memories, what am I?',
            order: 1
          },
          {
            name: 'The House of Death',
            description: 'Visit the infamous brownstone at 14 West 10th',
            location: {
              type: 'Point',
              coordinates: [-73.9959, 40.7339]
            },
            hints: ['Look for the brownstone', 'Between 5th and 6th Avenue'],
            trivia: 'This house is allegedly the most haunted building in NYC',
            challengeType: 'photo',
            challengeData: 'Take a spooky photo of the facade',
            order: 2
          }
        ],
        rewardXP: 350,
        rewardItems: ['Ghost Hunter Badge', 'Supernatural Explorer Title'],
        isActive: true,
        completionCriteria: 'all-checkpoints',
        isVerified: true,
        generatedBy: 'admin'
      },
      {
        name: 'Financial District History Dash',
        description: 'Discover the birthplace of American finance',
        theme: 'Historic NYC',
        difficulty: 'hard',
        estimatedTime: 120,
        distance: 2.8,
        startLocation: {
          type: 'Point',
          coordinates: [-74.0134, 40.7074] // Wall Street
        },
        checkpoints: [
          {
            name: 'Charging Bull',
            description: 'Start at the famous Wall Street Bull',
            location: {
              type: 'Point',
              coordinates: [-74.0134, 40.7056]
            },
            hints: ['Near Bowling Green', 'Look for the bronze statue'],
            trivia: 'The bull was installed illegally in 1989 as a gift to the city',
            challengeType: 'quiz',
            challengeData: {
              question: 'What does the bull symbolize?',
              options: ['Power', 'Prosperity', 'Strength', 'All of the above'],
              answer: 'All of the above'
            },
            order: 1
          },
          {
            name: 'Federal Hall',
            description: 'Visit where George Washington was inaugurated',
            location: {
              type: 'Point',
              coordinates: [-74.0102, 40.7074]
            },
            hints: ['Look for the statue of Washington', 'On Wall Street'],
            trivia: 'This was where the first Congress met and wrote the Bill of Rights',
            challengeType: 'scan',
            challengeData: 'Find and scan the commemorative plaque',
            order: 2
          },
          {
            name: 'Trinity Church',
            description: 'End at the historic Trinity Church',
            location: {
              type: 'Point',
              coordinates: [-74.0120, 40.7081]
            },
            hints: ['At Broadway and Wall Street', 'Look for the spire'],
            trivia: 'Alexander Hamilton is buried in the churchyard',
            challengeType: 'photo',
            challengeData: 'Take a photo of Hamilton\'s grave marker',
            order: 3
          }
        ],
        rewardXP: 500,
        rewardItems: ['Wall Street Badge', 'History Master Achievement'],
        isActive: true,
        completionCriteria: 'all-checkpoints',
        isVerified: true,
        generatedBy: 'admin'
      }
    ];

    // Clear existing quests
    await Quest.deleteMany({});
    
    // Insert new quests
    await Quest.insertMany(quests);
    
    console.log('Quests seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('Error seeding quests:', err.message);
    process.exit(1);
  }
};

seedQuests();