import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Friend from './models/Friend.js';

dotenv.config();

const seedFriends = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const friends = [
      {
        username: 'Sarah',
        profilePic: 'https://picsum.photos/seed/sarah/100',
        firstJoined: 'February 2023'
      },
      {
        username: 'Legend',
        profilePic: 'https://picsum.photos/seed/legend/100',
        firstJoined: 'December 2019'
      },
      {
        username: 'Adam',
        profilePic: 'https://picsum.photos/seed/adam/100',
        firstJoined: 'March 2023'
      },
      {
        username: 'Isaac',
        profilePic: 'https://picsum.photos/seed/isaac/100',
        firstJoined: 'April 2023'
      },
      {
        username: 'Santa',
        profilePic: 'https://picsum.photos/seed/santa/100',
        firstJoined: 'December 2022'
      },
      {
        username: 'Happy',
        profilePic: 'https://picsum.photos/seed/happy/100',
        firstJoined: 'May 2023'
      }
    ];
    await Friend.deleteMany({});
    await Friend.insertMany(friends);
    console.log('Friends seeded!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedFriends();
