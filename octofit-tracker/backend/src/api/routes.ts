import { Router, Request, Response } from 'express';

const router = Router();

// Health check
router.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK' });
});

// Placeholder routes for future implementation
// Users routes
router.get('/users', (req: Request, res: Response) => {
  res.json({ message: 'GET /api/users - Not implemented yet' });
});

// Activities routes
router.get('/activities', (req: Request, res: Response) => {
  res.json({ message: 'GET /api/activities - Not implemented yet' });
});

// Teams routes
router.get('/teams', (req: Request, res: Response) => {
  res.json({ message: 'GET /api/teams - Not implemented yet' });
});

// Leaderboard routes
router.get('/leaderboard', (req: Request, res: Response) => {
  res.json({ message: 'GET /api/leaderboard - Not implemented yet' });
});

// Workouts routes
router.get('/workouts', (req: Request, res: Response) => {
  res.json({ message: 'GET /api/workouts - Not implemented yet' });
});

export default router;
