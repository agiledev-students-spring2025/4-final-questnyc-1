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
      // 1. Silvercup Studios Tour
      {
        name: "Silvercup Studios Tour",
        description: "Discover the art-deco landmark in Long Island City, a former Dairy Queens factory turned world-famous TV studio.",
        theme: "Historic NYC",
        difficulty: "hard",
        estimatedTime: 50,
        distance: 1.3,
        startLocation: { type: "Point", coordinates: [ -73.94389, 40.75111 ] },
        checkpoints: [
          {
            name: "Art-Deco Façade",
            description: "Built in 1926, the original Dairy Queens brickwork still bears green and orange banding above the windows.",
            location: { type: "Point", coordinates: [ -73.94389, 40.75111 ] },
            hints: [
              "Look for the tiny 'Dairy Queen Dairy' plaque near the entrance.",
              "Find the color-banded brick stripes above the first-floor windows."
            ],
            trivia: "Silvercup Studios opened in 1983 after the dairy plant closed in 1973.",
            challengeType: "quiz",
            challengeData: {
              question: "In what year did Silvercup convert to a TV studio?",
              options: ["1973", "1983", "1993", "2003"],
              answer: "1983"
            },
            order: 1
          },
          {
            name: "Stage 2 Entrance",
            description: "Stage 2 has hosted shows like 'The Sopranos' and 'Sex and the City'—spot the loading-dock style door.",
            location: { type: "Point", coordinates: [ -73.94395, 40.75103 ] },
            hints: [
              "Look for the painted 'Stage 2' lettering just above the door.",
              "Knock and listen for the echo in the loading bay."
            ],
            trivia: "Over 200 productions have filmed here since 1983.",
            challengeType: "quiz",
            challengeData: {
              question: "Which of these series was NOT filmed at Silvercup?",
              options: ["The Sopranos", "Law & Order", "Friends", "Sex and the City"],
              answer: "Friends"
            },
            order: 2
          }
        ],
        rewardXP: 200,
        rewardItems: ["Silvercup Badge"],
        isActive: true,
        completionCriteria: "all-checkpoints",
        isVerified: true,
        generatedBy: "admin"
      },

      // 2. Edgar Allan Poe Cottage
      {
        name: "Edgar Allan Poe Cottage",
        description: "Step inside the final home of America’s master of the macabre, where Poe wrote ‘Annabel Lee’ in 1849.",
        theme: "Historic NYC",
        difficulty: "hard",
        estimatedTime: 30,
        distance: 0.5,
        startLocation: { type: "Point", coordinates: [ -73.89812, 40.87900 ] },
        checkpoints: [
          {
            name: "Writing Desk",
            description: "This simple pine desk is where Poe is believed to have completed 'Annabel Lee.'",
            location: { type: "Point", coordinates: [ -73.89812, 40.87900 ] },
            hints: [
              "It sits beside the south-facing window.",
              "Look for a small brass nameplate on the desktop."
            ],
            trivia: "Poe lived here from 1846 until his death in 1849.",
            challengeType: "quiz",
            challengeData: {
              question: "In what year did Poe die in this cottage?",
              options: ["1846", "1849", "1852", "1856"],
              answer: "1849"
            },
            order: 1
          },
          {
            name: "Octagonal Barn",
            description: "Originally part of the Valentine farm, this eight-sided barn looms behind the cottage.",
            location: { type: "Point", coordinates: [ -73.89820, 40.87915 ] },
            hints: [
              "Walk into the backyard to spot its eight sides.",
              "Count the angles of the roof."
            ],
            trivia: "The barn was built in 1825 and moved here in 1913.",
            challengeType: "quiz",
            challengeData: {
              question: "How many sides does the barn have?",
              options: ["6", "7", "8", "9"],
              answer: "8"
            },
            order: 2
          }
        ],
        rewardXP: 100,
        rewardItems: ["Poe’s Quill"],
        isActive: true,
        completionCriteria: "all-checkpoints",
        isVerified: true,
        generatedBy: "admin"
      },

      // 3. Smallpox Hospital Ruins
      {
        name: "Smallpox Hospital Ruins",
        description: "Explore the gothic ruins of the 1856 building that once treated smallpox victims on Roosevelt Island.",
        theme: "Historic NYC",
        difficulty: "hard",
        estimatedTime: 60,
        distance: 1.0,
        startLocation: { type: "Point", coordinates: [ -73.95944, 40.75167 ] },
        checkpoints: [
          {
            name: "Central Tower",
            description: "Designed by Renwick Jr. in Gothic style, this tower was part of the original 1856 structure.",
            location: { type: "Point", coordinates: [ -73.95944, 40.75167 ] },
            hints: [
              "Look for the pointed stone arches above the windows.",
              "Note how ivy blankets the façade."
            ],
            trivia: "The hospital closed in 1875 after a devastating fire.",
            challengeType: "quiz",
            challengeData: {
              question: "In what year did the hospital open?",
              options: ["1848", "1856", "1875", "1884"],
              answer: "1856"
            },
            order: 1
          },
          {
            name: "Stone Arch",
            description: "This carved arch once led into the women’s ward; its keystone still bears floral motifs.",
            location: { type: "Point", coordinates: [ -73.95950, 40.75175 ] },
            hints: [
              "Walk east until the arch frames the East River.",
              "Find the floral keystone carving at the top."
            ],
            trivia: "One of the first Gothic Revival public buildings in America.",
            challengeType: "quiz",
            challengeData: {
              question: "Which architectural style was this hospital built in?",
              options: ["Neoclassical", "Gothic Revival", "Beaux-Arts", "Art Deco"],
              answer: "Gothic Revival"
            },
            order: 2
          }
        ],
        rewardXP: 250,
        rewardItems: ["Gothic Badge"],
        isActive: true,
        completionCriteria: "all-checkpoints",
        isVerified: true,
        generatedBy: "admin"
      },

      // 4. Fort Wadsworth Ruins
      {
        name: "Fort Wadsworth Ruins",
        description: "Discover the coastal fortifications guarding New York Harbor since the Revolutionary War.",
        theme: "Historic NYC",
        difficulty: "medium",
        estimatedTime: 45,
        distance: 2.0,
        startLocation: { type: "Point", coordinates: [ -74.05821, 40.60900 ] },
        checkpoints: [
          {
            name: "Star-Shaped Bastion",
            description: "The angled walls, built in the 1800s, were designed to deflect cannon fire.",
            location: { type: "Point", coordinates: [ -74.05821, 40.60900 ] },
            hints: [
              "Stand on the rampart to see the star pattern.",
              "Count the low stone walls pointing outward."
            ],
            trivia: "Active as a military site until 1995.",
            challengeType: "quiz",
            challengeData: {
              question: "Which century was this bastion built in?",
              options: ["17th", "18th", "19th", "20th"],
              answer: "19th"
            },
            order: 1
          },
          {
            name: "Powder Magazine",
            description: "This vaulted brick chamber stored gunpowder prior to the Civil War.",
            location: { type: "Point", coordinates: [ -74.05800, 40.60910 ] },
            hints: [
              "Look for the outline of a domed brick vault in the ground.",
              "Find the narrow ventilation slits."
            ],
            trivia: "Built in 1844 to service nearby defenses.",
            challengeType: "quiz",
            challengeData: {
              question: "In what year was the powder magazine constructed?",
              options: ["1808", "1844", "1861", "1900"],
              answer: "1844"
            },
            order: 2
          }
        ],
        rewardXP: 180,
        rewardItems: ["Fort Badge"],
        isActive: true,
        completionCriteria: "all-checkpoints",
        isVerified: true,
        generatedBy: "admin"
      },

      // 5. John Bowne House
      {
        name: "John Bowne House",
        description: "Visit America’s oldest Quaker meeting house site in Flushing, built in 1661.",
        theme: "Historic NYC",
        difficulty: "hard",
        estimatedTime: 30,
        distance: 0.2,
        startLocation: { type: "Point", coordinates: [ -73.82495, 40.76289 ] },
        checkpoints: [
          {
            name: "Meeting Room",
            description: "This simple room hosted early debates on religious freedom in colonial New York.",
            location: { type: "Point", coordinates: [ -73.82495, 40.76289 ] },
            hints: [
              "Find the 17th-century latch on the heavy wooden door.",
              "Look for low ceiling beams above the benches."
            ],
            trivia: "Built circa 1661, it set a precedent for religious tolerance in New Amsterdam.",
            challengeType: "quiz",
            challengeData: {
              question: "In what year was the Bowne House constructed?",
              options: ["1657", "1661", "1700", "1750"],
              answer: "1661"
            },
            order: 1
          },
          {
            name: "Stone Fireplace",
            description: "This massive fieldstone fireplace was central to gatherings and was restored in the 1940s.",
            location: { type: "Point", coordinates: [ -73.82495, 40.76289 ] },
            hints: [
              "Look for soot-blackened stones in the hearth.",
              "Notice the iron crane used for hanging pots."
            ],
            trivia: "The fireplace was rebuilt during a 1940s restoration.",
            challengeType: "quiz",
            challengeData: {
              question: "Which decade saw the fireplace restoration?",
              options: ["1920s", "1930s", "1940s", "1950s"],
              answer: "1940s"
            },
            order: 2
          }
        ],
        rewardXP: 120,
        rewardItems: ["Quaker Badge"],
        isActive: true,
        completionCriteria: "all-checkpoints",
        isVerified: true,
        generatedBy: "admin"
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
        name: "High Bridge Aqueduct Path",
        description: "Walk over the oldest bridge in NYC, carrying the Croton Aqueduct across the Harlem River since 1848.",
        theme: "Historic NYC",
        difficulty: "medium",
        estimatedTime: 40,
        distance: 2.5,
        startLocation: { type: "Point", coordinates: [ -73.930277, 40.842308 ] },
        checkpoints: [
          {
            name: "Central Arch",
            description: "This stone arch spans 280 feet; it was the longest in the U.S. when built.",
            location: { type: "Point", coordinates: [ -73.930277, 40.842308 ] },
            hints: [
              "Find the date stone etched into the keystone.",
              "Stand in the center and look down at the river."
            ],
            trivia: "Opened in 1848; reopened to pedestrians in 2015.",
            challengeType: "quiz",
            challengeData: {
              question: "In what year did High Bridge originally open?",
              options: ["1848", "1900", "1950", "2015"],
              answer: "1848"
            },
            order: 1
          }
        ],
        rewardXP: 140,
        rewardItems: ["Bridge Badge"],
        isActive: true,
        completionCriteria: "all-checkpoints",
        isVerified: true,
        generatedBy: "admin"
      },    
      {
        name: "Marble Hill Station Remnants",
        description: "Find the abandoned platform of the old elevated IRT line on Marble Hill.",
        theme: "Historic NYC",
        difficulty: "hard",
        estimatedTime: 30,
        distance: 0.3,
        startLocation: { type: "Point", coordinates: [ -73.912000, 40.874700 ] },
        checkpoints: [
          {
            name: "Old Platform Edge",
            description: "You’re standing where commuters once waited—until 1973 when the new station opened underground.",
            location: { type: "Point", coordinates: [ -73.912000, 40.874700 ] },
            hints: [
              "Look for rusted rail ties embedded in the pavement.",
              "Notice the elevated rail brackets on the retaining wall."
            ],
            trivia: "Original station opened in 1906; abandoned in 1973.",
            challengeType: "quiz",
            challengeData: {
              question: "In what year was the elevated station abandoned?",
              options: ["1906", "1930", "1973", "2000"],
              answer: "1973"
            },
            order: 1
          }
        ],
        rewardXP: 160,
        rewardItems: ["Rail Badge"],
        isActive: true,
        completionCriteria: "all-checkpoints",
        isVerified: true,
        generatedBy: "admin"
      },  
      {
        name: "Crotona Park Oval",
        description: "Stand where the city’s first WPA swimming pool once drew thousands in summer, now a landmark ruin.",
        theme: "Historic NYC",
        difficulty: "hard",
        estimatedTime: 35,
        distance: 0.7,
        startLocation: { type: "Point", coordinates: [ -73.898100, 40.839900 ] },
        checkpoints: [
          {
            name: "Original Pool Steps",
            description: "The curved steps led into the 330-foot-long pool.",
            location: { type: "Point", coordinates: [ -73.898100, 40.839900 ] },
            hints: [
              "Find the stone remnants near the tennis courts.",
              "Look for the curved bench outline in the grass."
            ],
            trivia: "Opened in 1936 as part of the WPA public-works program.",
            challengeType: "quiz",
            challengeData: {
              question: "In what year did the pool open?",
              options: ["1936", "1945", "1955", "1965"],
              answer: "1936"
            },
            order: 1
          }
        ],
        rewardXP: 150,
        rewardItems: ["Pool Badge"],
        isActive: true,
        completionCriteria: "all-checkpoints",
        isVerified: true,
        generatedBy: "admin"
      },  
      {
        name: "Hamilton Grange National Memorial",
        description: "Visit Alexander Hamilton’s country home, saved from demolition and relocated twice.",
        theme: "Historic NYC",
        difficulty: "medium",
        estimatedTime: 45,
        distance: 0.8,
        startLocation: { type: "Point", coordinates: [ -73.947220, 40.821390 ] },
        checkpoints: [
          {
            name: "Front Portico",
            description: "Designed by John McComb Jr., the portico originally faced St. John’s Park.",
            location: { type: "Point", coordinates: [ -73.947220, 40.821390 ] },
            hints: [
              "Look for the Doric columns at the entrance.",
              "Find the plaque explaining its two relocations."
            ],
            trivia: "Built in 1802; moved in 1889 and again in 2008.",
            challengeType: "quiz",
            challengeData: {
              question: "In what year was Hamilton Grange first built?",
              options: ["1802", "1815", "1889", "2008"],
              answer: "1802"
            },
            order: 1
          }
        ],
        rewardXP: 170,
        rewardItems: ["Founding Father Badge"],
        isActive: true,
        completionCriteria: "all-checkpoints",
        isVerified: true,
        generatedBy: "admin"
      },  
      {
        name: "St. Paul’s Chapel Crypt Tour",
        description: "Descend into the oldest public cemetery in Manhattan beneath this 1766 chapel.",
        theme: "Historic NYC",
        difficulty: "medium",
        estimatedTime: 40,
        distance: 0.6,
        startLocation: { type: "Point", coordinates: [ -74.009200, 40.711320 ] },
        checkpoints: [
          {
            name: "Crypt Entrance",
            description: "An iron grate leads down to the burial vaults of Revolutionary-era New Yorkers.",
            location: { type: "Point", coordinates: [ -74.009200, 40.711320 ] },
            hints: [
              "Find the plaque near the west door of the chapel.",
              "Look for the iron bars at ground level."
            ],
            trivia: "Built in 1766; survived the Great Fire of 1776.",
            challengeType: "quiz",
            challengeData: {
              question: "In what year was St. Paul’s Chapel built?",
              options: ["1766", "1776", "1800", "1850"],
              answer: "1766"
            },
            order: 1
          }
        ],
        rewardXP: 160,
        rewardItems: ["Chapel Badge"],
        isActive: true,
        completionCriteria: "all-checkpoints",
        isVerified: true,
        generatedBy: "admin"
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
      },
      {
        name: "Frog Rock Toad Hall",
        description: "Spot the quirky pink granite boulder painted like a frog beside Kissena Corridor Park.",
        theme: "Historic NYC",
        difficulty: "medium",
        estimatedTime: 20,
        distance: 0.2,
        startLocation: { type: "Point", coordinates: [ -73.79485, 40.74327 ] },
        checkpoints: [
          {
            name: "Painted Frog",
            description: "This rock was whimsically painted in 1965 by local kids—still keeps watch today.",
            location: { type: "Point", coordinates: [ -73.79485, 40.74327 ] },
            hints: [
              "It sits just off Main Street by the park entrance.",
              "Look for the bright pink and green paint."
            ],
            trivia: "Local legend says the paint job was to scare off vandals.",
            challengeType: "quiz",
            challengeData: {
              question: "In what year was Frog Rock first painted?",
              options: ["1955", "1965", "1975", "1985"],
              answer: "1965"
            },
            order: 1
          }
        ],
        rewardXP: 110,
        rewardItems: ["Frog Badge"],
        isActive: true,
        completionCriteria: "all-checkpoints",
        isVerified: true,
        generatedBy: "admin"
      },
      {
        name: "Vanderbilt Mausoleum",
        description: "Visit the ornate mausoleum in Moravian Cemetery where Cornelius Vanderbilt’s family rests.",
        theme: "Historic NYC",
        difficulty: "medium",
        estimatedTime: 25,
        distance: 0.1,
        startLocation: { type: "Point", coordinates: [ -74.08340, 40.59570 ] },
        checkpoints: [
          {
            name: "Bronze Doors",
            description: "These sculpted doors depict family crests and were cast in 1885.",
            location: { type: "Point", coordinates: [ -74.08340, 40.59570 ] },
            hints: [
              "Look for the heavy bronze panels on the front facade.",
              "Find the family crest etched above the lintel."
            ],
            trivia: "Built 1885 for Margaret Louisa Vanderbilt.",
            challengeType: "quiz",
            challengeData: {
              question: "In what year was the mausoleum completed?",
              options: ["1865", "1885", "1905", "1925"],
              answer: "1885"
            },
            order: 1
          }
        ],
        rewardXP: 120,
        rewardItems: ["Mausoleum Badge"],
        isActive: true,
        completionCriteria: "all-checkpoints",
        isVerified: true,
        generatedBy: "admin"
      },
      {
        name: "Orchard Beach Bath House Ruins",
        description: "Examine the concrete remains of the 1930s bathhouse along the Bronx’s Riviera.",
        theme: "Historic NYC",
        difficulty: "hard",
        estimatedTime: 30,
        distance: 0.5,
        startLocation: { type: "Point", coordinates: [ -73.81104, 40.82911 ] },
        checkpoints: [
          {
            name: "Vaulted Arch",
            description: "The Art Deco arch once framed a grand lobby overlooking the water.",
            location: { type: "Point", coordinates: [ -73.81104, 40.82911 ] },
            hints: [
              "You’ll find the arch at the western end of the promenade.",
              "Look for the curved concrete outline in the sand."
            ],
            trivia: "Opened 1936; closed 1970 after storm damage.",
            challengeType: "quiz",
            challengeData: {
              question: "In what year did the bathhouse open?",
              options: ["1936", "1950", "1970", "1985"],
              answer: "1936"
            },
            order: 1
          }
        ],
        rewardXP: 140,
        rewardItems: ["Bath Ruins Badge"],
        isActive: true,
        completionCriteria: "all-checkpoints",
        isVerified: true,
        generatedBy: "admin"
      },
      {
        name: "Gotham Book Mart Site",
        description: "Stand where the legendary avant-garde bookstore influenced 20th-century literature.",
        theme: "Historic NYC",
        difficulty: "medium",
        estimatedTime: 20,
        distance: 0.1,
        startLocation: { type: "Point", coordinates: [ -73.98125, 40.75762 ] },
        checkpoints: [
          {
            name: "Facade Plaque",
            description: "A small brass plaque marks the store’s original entrance at 41 West 47th Street.",
            location: { type: "Point", coordinates: [ -73.98125, 40.75762 ] },
            hints: [
              "Look for the narrow building between two larger storefronts.",
              "Find the plaque at eye level beside the door."
            ],
            trivia: "Founded 1920; closed 2007 after 87 years.",
            challengeType: "quiz",
            challengeData: {
              question: "In what year did Gotham Book Mart first open?",
              options: ["1920", "1945", "1965", "2007"],
              answer: "1920"
            },
            order: 1
          }
        ],
        rewardXP: 130,
        rewardItems: ["Bookstore Badge"],
        isActive: true,
        completionCriteria: "all-checkpoints",
        isVerified: true,
        generatedBy: "admin"
      },
      {
        name: "Navy Yard Perimeter Ruins",
        description: "Discover the crumbling gatehouses and walls of Brooklyn’s Civil War-era shipyard.",
        theme: "Historic NYC",
        difficulty: "hard",
        estimatedTime: 40,
        distance: 1.0,
        startLocation: { type: "Point", coordinates: [ -73.97897, 40.70032 ] },
        checkpoints: [
          {
            name: "Marshgate Gatehouse",
            description: "Built 1850, this small brick building once screened visitors.",
            location: { type: "Point", coordinates: [ -73.97897, 40.70032 ] },
            hints: [
              "Find the narrow arched doorway in the brick wall.",
              "Look for weathered mortar between the bricks."
            ],
            trivia: "Navy Yard operated from 1801 to 1966.",
            challengeType: "quiz",
            challengeData: {
              question: "In what year was the gatehouse constructed?",
              options: ["1801", "1850", "1900", "1966"],
              answer: "1850"
            },
            order: 1
          }
        ],
        rewardXP: 160,
        rewardItems: ["Historic Ruins Badge"],
        isActive: true,
        completionCriteria: "all-checkpoints",
        isVerified: true,
        generatedBy: "admin"
      },
      {
        name: "Bartow-Pell Mansion",
        description: "Tour the 1842 Italianate villa set within Pelham Bay Park’s lush grounds.",
        theme: "Historic NYC",
        difficulty: "medium",
        estimatedTime: 45,
        distance: 1.0,
        startLocation: { type: "Point", coordinates: [ -73.80480, 40.87200 ] },  // Main portico
        checkpoints: [
          {
            name: "Front Portico",
            description: "The grand columned portico was added in 1850 to showcase Italianate style.",
            location: { type: "Point", coordinates: [ -73.80480, 40.87200 ] },
            hints: [
              "Look for the fluted columns supporting the roof.",
              "Notice the carved capitals atop each column."
            ],
            trivia: "Built in 1842 by Robert Bartow; portico added eight years later.",
            challengeType: "quiz",
            challengeData: {
              question: "In what year was the portico added?",
              options: ["1842", "1850", "1860", "1870"],
              answer: "1850"
            },
            order: 1
          },
          {
            name: "Formal Garden",
            description: "Originally laid out by the Bartow family, these gardens feature boxwood hedges.",
            location: { type: "Point", coordinates: [ -73.80520, 40.87220 ] },
            hints: [
              "Find the fountain at the garden center.",
              "Count the number of boxwood hedges bordering the path."
            ],
            trivia: "Gardens restored in the 20th century to reflect the original plan.",
            challengeType: "quiz",
            challengeData: {
              question: "Which plant lines the garden paths?",
              options: ["Boxwood", "Rose", "Lavender", "Thyme"],
              answer: "Boxwood"
            },
            order: 2
          }
        ],
        rewardXP: 200,
        rewardItems: ["Mansion Badge"],
        isActive: true,
        completionCriteria: "all-checkpoints",
        isVerified: true,
        generatedBy: "admin"
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