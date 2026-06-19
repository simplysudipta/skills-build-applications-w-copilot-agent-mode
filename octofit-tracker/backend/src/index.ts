import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db';

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

// API routes placeholder
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
