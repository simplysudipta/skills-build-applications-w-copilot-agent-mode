/**
 * Seed Script for Octofit Tracker
 * 
 * Description: Seed the octofit_db database with test data.
 * 
 * Usage:
 *   npm run seed --prefix octofit-tracker/backend
 * 
 * This script:
 * - Connects to MongoDB (octofit_db)
 * - Clears existing data (to avoid duplicates)
 * - Creates sample users
 * - Creates sample teams
 * - Creates sample activities
 * - Creates sample leaderboard entries
 * - Creates sample workouts
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User, Team, Activity, Leaderboard, Workout } from '../models';

dotenv.config();

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seed...\n');

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});
    console.log('✓ Cleared all collections\n');

    // Create sample users
    console.log('Creating sample users...');
    const users = await User.insertMany([
      {
        name: 'Alex Johnson',
        email: 'alex.johnson@octofit.com',
        password: 'hashed_password_1',
        profilePicture: 'https://i.pravatar.cc/150?img=1',
      },
      {
        name: 'Jordan Smith',
        email: 'jordan.smith@octofit.com',
        password: 'hashed_password_2',
        profilePicture: 'https://i.pravatar.cc/150?img=2',
      },
      {
        name: 'Casey Williams',
        email: 'casey.williams@octofit.com',
        password: 'hashed_password_3',
        profilePicture: 'https://i.pravatar.cc/150?img=3',
      },
      {
        name: 'Morgan Brown',
        email: 'morgan.brown@octofit.com',
        password: 'hashed_password_4',
        profilePicture: 'https://i.pravatar.cc/150?img=4',
      },
      {
        name: 'Taylor Davis',
        email: 'taylor.davis@octofit.com',
        password: 'hashed_password_5',
        profilePicture: 'https://i.pravatar.cc/150?img=5',
      },
    ]);
    console.log(`✓ Created ${users.length} users\n`);

    // Create sample teams
    console.log('Creating sample teams...');
    const teams = await Team.insertMany([
      {
        name: 'Morning Warriors',
        description: 'Early risers who crush their workouts before sunrise',
        createdBy: users[0]._id,
        members: [users[0]._id, users[1]._id, users[2]._id],
      },
      {
        name: 'Evening Grinders',
        description: 'After-work fitness enthusiasts',
        createdBy: users[3]._id,
        members: [users[3]._id, users[4]._id],
      },
    ]);
    console.log(`✓ Created ${teams.length} teams\n`);

    // Create sample activities
    console.log('Creating sample activities...');
    const now = new Date();
    const activities = await Activity.insertMany([
      {
        userId: users[0]._id,
        activityType: 'Running',
        duration: 45,
        distance: 8.5,
        calories: 650,
        date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
        description: 'Morning run in the park',
      },
      {
        userId: users[0]._id,
        activityType: 'Cycling',
        duration: 60,
        distance: 25.3,
        calories: 750,
        date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
        description: 'Weekend bike ride',
      },
      {
        userId: users[1]._id,
        activityType: 'Strength Training',
        duration: 90,
        calories: 800,
        date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
        description: 'Upper body workout',
      },
      {
        userId: users[2]._id,
        activityType: 'Swimming',
        duration: 45,
        distance: 2.5,
        calories: 500,
        date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
        description: 'Swimming laps',
      },
      {
        userId: users[3]._id,
        activityType: 'Yoga',
        duration: 60,
        calories: 300,
        date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
        description: 'Evening yoga session',
      },
      {
        userId: users[4]._id,
        activityType: 'Running',
        duration: 30,
        distance: 5.0,
        calories: 450,
        date: new Date(now.getTime()),
        description: 'Quick evening run',
      },
    ]);
    console.log(`✓ Created ${activities.length} activities\n`);

    // Create sample leaderboard entries
    console.log('Creating sample leaderboard entries...');
    const leaderboardEntries = await Leaderboard.insertMany([
      {
        userId: users[0]._id,
        totalPoints: 2500,
        activitiesCount: 15,
        rank: 1,
      },
      {
        userId: users[1]._id,
        totalPoints: 2200,
        activitiesCount: 12,
        rank: 2,
      },
      {
        userId: users[2]._id,
        totalPoints: 1800,
        activitiesCount: 10,
        rank: 3,
      },
      {
        userId: users[3]._id,
        totalPoints: 1500,
        activitiesCount: 8,
        rank: 4,
      },
      {
        userId: users[4]._id,
        totalPoints: 1200,
        activitiesCount: 6,
        rank: 5,
      },
    ]);
    console.log(`✓ Created ${leaderboardEntries.length} leaderboard entries\n`);

    // Create sample workouts
    console.log('Creating sample workouts...');
    const workouts = await Workout.insertMany([
      {
        userId: users[0]._id,
        name: 'Upper Body Blast',
        difficulty: 'intermediate',
        exercises: [
          { name: 'Bench Press', sets: 4, reps: 8, weight: 185 },
          { name: 'Incline Dumbbell Press', sets: 3, reps: 10, weight: 80 },
          { name: 'Barbell Rows', sets: 4, reps: 8, weight: 225 },
          { name: 'Lat Pulldowns', sets: 3, reps: 12, weight: 180 },
        ],
      },
      {
        userId: users[1]._id,
        name: 'Beginner Full Body',
        difficulty: 'beginner',
        exercises: [
          { name: 'Squats', sets: 3, reps: 12, weight: 135 },
          { name: 'Push-ups', sets: 3, reps: 10 },
          { name: 'Deadlifts', sets: 3, reps: 8, weight: 185 },
          { name: 'Plank', sets: 3, reps: 60 },
        ],
      },
      {
        userId: users[2]._id,
        name: 'Leg Day Destroyer',
        difficulty: 'advanced',
        exercises: [
          { name: 'Barbell Squats', sets: 5, reps: 5, weight: 315 },
          { name: 'Bulgarian Split Squats', sets: 4, reps: 8, weight: 95 },
          { name: 'Leg Press', sets: 4, reps: 10, weight: 500 },
          { name: 'Leg Curls', sets: 3, reps: 12, weight: 220 },
        ],
      },
      {
        userId: users[3]._id,
        name: 'Core Strengthening',
        difficulty: 'beginner',
        exercises: [
          { name: 'Plank', sets: 3, reps: 60 },
          { name: 'Crunches', sets: 3, reps: 20 },
          { name: 'Russian Twists', sets: 3, reps: 20 },
          { name: 'Mountain Climbers', sets: 3, reps: 30 },
        ],
      },
      {
        userId: users[4]._id,
        name: 'Cardio & Conditioning',
        difficulty: 'intermediate',
        exercises: [
          { name: 'Burpees', sets: 3, reps: 15 },
          { name: 'Jump Rope', sets: 3, reps: 100 },
          { name: 'Box Jumps', sets: 3, reps: 12, weight: 24 },
          { name: 'High Knees', sets: 3, reps: 60 },
        ],
      },
    ]);
    console.log(`✓ Created ${workouts.length} workouts\n`);

    console.log('✅ Database seeding completed successfully!');
    console.log(`
📊 Summary:
   • Users: ${users.length}
   • Teams: ${teams.length}
   • Activities: ${activities.length}
   • Leaderboard Entries: ${leaderboardEntries.length}
   • Workouts: ${workouts.length}
    `);
    console.log('🚀 You can now test the API endpoints:');
    console.log('   GET  http://localhost:8000/api/users');
    console.log('   GET  http://localhost:8000/api/teams');
    console.log('   GET  http://localhost:8000/api/activities');
    console.log('   GET  http://localhost:8000/api/leaderboard');
    console.log('   GET  http://localhost:8000/api/workouts');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

const main = async () => {
  await connectDB();
  await seedDatabase();
  await mongoose.disconnect();
  console.log('\n✓ Database connection closed');
};

main();
