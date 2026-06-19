# Octofit Tracker Backend API

Express.js + TypeScript + MongoDB backend for the Octofit Tracker application.

## Getting Started

### Prerequisites
- Node.js (LTS)
- MongoDB running on `localhost:27017`

### Installation

```bash
npm install --prefix octofit-tracker/backend
```

### Environment Setup

Create a `.env` file based on `.env.example`:

```bash
cp octofit-tracker/backend/.env.example octofit-tracker/backend/.env
```

### Development

Start the development server with hot-reloading:

```bash
npm run dev --prefix octofit-tracker/backend
```

The API will be available at `http://localhost:8000`

### Build

Compile TypeScript to JavaScript:

```bash
npm run build --prefix octofit-tracker/backend
```

### Production

Start the production server:

```bash
npm start --prefix octofit-tracker/backend
```

## API Endpoints

### Health Check
- **GET** `/api/health` - Check API status

### Users (`/api/users`)
- **GET** `/api/users` - Get all users
- **GET** `/api/users/:id` - Get user by ID
- **POST** `/api/users` - Create new user
- **PUT** `/api/users/:id` - Update user
- **DELETE** `/api/users/:id` - Delete user

### Teams (`/api/teams`)
- **GET** `/api/teams` - Get all teams
- **GET** `/api/teams/:id` - Get team by ID
- **POST** `/api/teams` - Create new team
- **POST** `/api/teams/:id/members` - Add member to team
- **DELETE** `/api/teams/:id` - Delete team

### Activities (`/api/activities`)
- **GET** `/api/activities` - Get all activities
- **GET** `/api/activities/:id` - Get activity by ID
- **GET** `/api/activities/user/:userId` - Get activities by user
- **POST** `/api/activities` - Log new activity
- **PUT** `/api/activities/:id` - Update activity
- **DELETE** `/api/activities/:id` - Delete activity

### Leaderboard (`/api/leaderboard`)
- **GET** `/api/leaderboard` - Get top ranked users (limit=10)
- **GET** `/api/leaderboard/:userId` - Get user ranking
- **POST** `/api/leaderboard` - Create leaderboard entry
- **PUT** `/api/leaderboard/:userId` - Update user points

### Workouts (`/api/workouts`)
- **GET** `/api/workouts` - Get all workouts
- **GET** `/api/workouts/:id` - Get workout by ID
- **GET** `/api/workouts/user/:userId` - Get workouts by user
- **POST** `/api/workouts` - Create new workout
- **PUT** `/api/workouts/:id` - Update workout
- **DELETE** `/api/workouts/:id` - Delete workout

## Database

Connected to MongoDB `octofit_db` with Mongoose models for:
- Users
- Teams
- Activities
- Leaderboard
- Workouts

## Codespaces Support

The API automatically detects Codespaces environment via `CODESPACE_NAME` and provides the appropriate URL:

```
https://{CODESPACE_NAME}-8000.app.github.dev
```

## Testing Endpoints

Test an endpoint using curl:

```bash
curl http://localhost:8000/api/health
```

## Project Structure

```
octofit-tracker/backend/
├── src/
│   ├── index.ts           # Main server entry point
│   ├── db.ts              # MongoDB connection
│   ├── api/
│   │   ├── users.ts       # Users routes
│   │   ├── teams.ts       # Teams routes
│   │   ├── activities.ts  # Activities routes
│   │   ├── leaderboard.ts # Leaderboard routes
│   │   └── workouts.ts    # Workouts routes
│   └── models/
│       ├── User.ts
│       ├── Team.ts
│       ├── Activity.ts
│       ├── Leaderboard.ts
│       ├── Workout.ts
│       └── index.ts
├── package.json
├── tsconfig.json
└── .env.example
```
