import { connectDatabase, disconnectDatabase } from '../config/database.js'
import { Activity, Leaderboard, Team, User, Workout } from '../models.js'

/** Seed the octofit_db database with test data. */
async function seedDatabase() {
  try {
    await connectDatabase()
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ])

    const users = await User.create([
      { name: 'Maya Chen', email: 'maya.chen@example.com', avatar: 'MC' },
      { name: 'Leo Martinez', email: 'leo.martinez@example.com', avatar: 'LM' },
      { name: 'Priya Shah', email: 'priya.shah@example.com', avatar: 'PS' },
      { name: 'Jordan Brooks', email: 'jordan.brooks@example.com', avatar: 'JB' },
    ])

    const teams = await Team.create([
      { name: 'Summit Striders', description: 'Steady miles and stronger habits.', color: '#e76f51', members: [users[0]._id, users[1]._id] },
      { name: 'Core Collective', description: 'Balanced training for everyday energy.', color: '#2a9d8f', members: [users[2]._id, users[3]._id] },
    ])

    await Activity.create([
      { user: users[0]._id, type: 'Running', durationMinutes: 34, distanceKm: 5.2, calories: 410, completedAt: new Date('2026-09-20') },
      { user: users[1]._id, type: 'Cycling', durationMinutes: 48, distanceKm: 18.4, calories: 520, completedAt: new Date('2026-09-20') },
      { user: users[2]._id, type: 'Strength', durationMinutes: 42, calories: 280, completedAt: new Date('2026-09-21') },
      { user: users[3]._id, type: 'Yoga', durationMinutes: 30, calories: 150, completedAt: new Date('2026-09-21') },
    ])

    await Leaderboard.create([
      { user: users[0]._id, team: teams[0]._id, points: 980, rank: 1, weeklyStreak: 6 },
      { user: users[1]._id, team: teams[0]._id, points: 840, rank: 2, weeklyStreak: 4 },
      { user: users[2]._id, team: teams[1]._id, points: 760, rank: 3, weeklyStreak: 5 },
      { user: users[3]._id, team: teams[1]._id, points: 610, rank: 4, weeklyStreak: 3 },
    ])

    await Workout.create([
      { title: 'Hill Runner', type: 'Cardio', difficulty: 'Intermediate', durationMinutes: 35, exercises: [{ name: 'Incline run', sets: 4, reps: 1 }, { name: 'Recovery walk', sets: 3, reps: 1 }] },
      { title: 'Full Body Foundation', type: 'Strength', difficulty: 'Beginner', durationMinutes: 25, exercises: [{ name: 'Squat', sets: 3, reps: 12 }, { name: 'Push-up', sets: 3, reps: 8 }, { name: 'Plank', sets: 3, reps: 30 }] },
      { title: 'Mobility Reset', type: 'Mobility', difficulty: 'Beginner', durationMinutes: 20, exercises: [{ name: "World's greatest stretch", sets: 2, reps: 6 }, { name: 'Cossack squat', sets: 2, reps: 8 }] },
    ])

    console.log('Seeded users, teams, activities, leaderboard, and workouts in octofit_db')
  } catch (error) {
    console.error('Error seeding octofit_db:', error)
    process.exitCode = 1
  } finally {
    await disconnectDatabase()
  }
}

seedDatabase()
