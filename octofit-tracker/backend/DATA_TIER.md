# Data Tier Documentation - Octofit Tracker

## Database Setup

### Configuration
- **Database**: MongoDB `octofit_db`
- **Connection String**: `mongodb://localhost:27017/octofit_db`
- **Port**: 27017 (standard MongoDB port)
- **ORM**: Mongoose 7.5.0

### Database Connection
Located in [src/db.ts](src/db.ts):
- Handles MongoDB connection with error handling
- Uses `MONGODB_URI` environment variable (defaults to local instance)
- Logs connection status with emoji indicators

## Collections & Models

### 1. Users
**File**: [src/models/User.ts](src/models/User.ts)

Fields:
- `name` (String, required)
- `email` (String, required, unique)
- `password` (String, required - should be hashed)
- `profilePicture` (String, optional)
- `createdAt` & `updatedAt` (Timestamps)

### 2. Teams
**File**: [src/models/Team.ts](src/models/Team.ts)

Fields:
- `name` (String, required)
- `description` (String, optional)
- `members` (Array of User references)
- `createdBy` (User reference, required)
- `createdAt` & `updatedAt` (Timestamps)

### 3. Activities
**File**: [src/models/Activity.ts](src/models/Activity.ts)

Fields:
- `userId` (User reference, required)
- `activityType` (String - e.g., "Running", "Cycling", "Swimming")
- `duration` (Number - minutes, required)
- `distance` (Number - km, optional)
- `calories` (Number, optional)
- `date` (Date, required)
- `description` (String, optional)
- `createdAt` & `updatedAt` (Timestamps)

### 4. Leaderboard
**File**: [src/models/Leaderboard.ts](src/models/Leaderboard.ts)

Fields:
- `userId` (User reference, required, unique)
- `totalPoints` (Number, default: 0)
- `activitiesCount` (Number, default: 0)
- `rank` (Number, default: 0)
- `createdAt` & `updatedAt` (Timestamps)

### 5. Workouts
**File**: [src/models/Workout.ts](src/models/Workout.ts)

Fields:
- `userId` (User reference, required)
- `name` (String, required)
- `exercises` (Array of exercise objects)
  - `name` (String, required)
  - `sets` (Number, required)
  - `reps` (Number, required)
  - `weight` (Number, optional)
- `difficulty` (Enum: "beginner" | "intermediate" | "advanced")
- `createdAt` & `updatedAt` (Timestamps)

## Seed Script

### Purpose
Automatically populate the database with realistic test data for development and testing.

**File**: [src/scripts/seed.ts](src/scripts/seed.ts)

Description: *Seed the octofit_db database with test data*

### Usage
```bash
npm run seed --prefix octofit-tracker/backend
```

### What Gets Seeded
- **5 Users**: Sample fitness enthusiasts with profiles
- **2 Teams**: "Morning Warriors" and "Evening Grinders"
- **6 Activities**: Logged activities across multiple users (Running, Cycling, Strength Training, Swimming, Yoga)
- **5 Leaderboard Entries**: User rankings with points and activity counts
- **5 Workouts**: Exercise templates from beginner to advanced

### Sample Data Includes
- Real-looking user names and emails
- Realistic activity data (distance, duration, calories)
- Diverse workout programs targeting different fitness levels
- Team membership relationships
- User point systems for competitive leaderboard

## Running the Database

### Start MongoDB
If not already running:
```bash
mongod --dbpath /data/db
```

### Seed the Database
```bash
npm run seed --prefix octofit-tracker/backend
```

### Verify Data
Start the backend server:
```bash
npm run dev --prefix octofit-tracker/backend
```

Test endpoints:
```bash
# Health check
curl http://localhost:8000/api/health

# Get all users
curl http://localhost:8000/api/users

# Get leaderboard
curl http://localhost:8000/api/leaderboard

# Get all teams
curl http://localhost:8000/api/teams

# Get all activities
curl http://localhost:8000/api/activities

# Get all workouts
curl http://localhost:8000/api/workouts
```

## Data Relationships

```
Users
├── → Teams (createdBy)
├── → Teams (members)
├── → Activities (userId)
├── → Leaderboard (userId)
└── → Workouts (userId)

Teams
├── → Users (createdBy)
└── → Users (members)

Activities
└── → Users (userId)

Leaderboard
└── → Users (userId)

Workouts
└── → Users (userId)
```

## Environment Variables

Create `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/octofit_db
PORT=8000
NODE_ENV=development
CODESPACE_NAME=
```

## API Endpoints

All endpoints return JSON with proper HTTP status codes:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/users` | List all users |
| GET | `/api/teams` | List all teams |
| GET | `/api/activities` | List all activities |
| GET | `/api/leaderboard` | Get top ranked users |
| GET | `/api/workouts` | List all workouts |

## Verification Results

✅ **Database Seeding**: Completed successfully
- Users: 5 created
- Teams: 2 created
- Activities: 6 created
- Leaderboard: 5 entries created
- Workouts: 5 created

✅ **API Testing**: All endpoints verified and returning data
- Health check: ✓ Working
- Users endpoint: ✓ Returning seeded users
- Teams endpoint: ✓ Returning teams with member relationships
- Activities endpoint: ✓ Returning logged activities
- Leaderboard endpoint: ✓ Returning rankings with populated user data
- Workouts endpoint: ✓ Returning workout templates with exercises

## Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB is running: `ps aux | grep mongod`
- Check port 27017 is available
- Verify `MONGODB_URI` environment variable

### TypeScript Compilation Errors
- Run `npm install --prefix octofit-tracker/backend` to ensure all dependencies are installed
- Verify `@types/cors` is installed for TypeScript types

### No Data in Database
- Run the seed script: `npm run seed --prefix octofit-tracker/backend`
- Verify MongoDB is running and accepting connections
- Check logs for error messages
