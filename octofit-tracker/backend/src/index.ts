import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db';
import usersRouter from './api/users';
import teamsRouter from './api/teams';
import activitiesRouter from './api/activities';
import leaderboardRouter from './api/leaderboard';
import workoutsRouter from './api/workouts';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Octofit Tracker API is running' });
});

// API routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// 404 handler
app.use('/api', (req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`⚡ Octofit Tracker API listening on port ${port}`);
  const codespaceName = process.env.CODESPACE_NAME;
  if (codespaceName) {
    console.log(`🌐 Available at: https://${codespaceName}-8000.app.github.dev`);
  }
});

export default app;
