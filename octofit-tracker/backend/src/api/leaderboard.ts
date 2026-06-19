import { Router, Request, Response } from 'express';
import { Leaderboard } from '../models';

const router = Router();

// GET /api/leaderboard - Get top ranked users
router.get('/', async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const leaderboard = await Leaderboard.find()
      .sort({ totalPoints: -1, rank: 1 })
      .limit(limit)
      .populate('userId', 'name email profilePicture');
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// GET /api/leaderboard/:userId - Get user ranking
router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const userRank = await Leaderboard.findOne({ userId: req.params.userId }).populate(
      'userId',
      'name email profilePicture'
    );
    if (!userRank) {
      res.status(404).json({ error: 'User not found in leaderboard' });
      return;
    }
    res.json(userRank);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user ranking' });
  }
});

// POST /api/leaderboard - Create leaderboard entry for user
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const entry = new Leaderboard({ userId, totalPoints: 0, activitiesCount: 0, rank: 0 });
    await entry.save();
    res.status(201).json({ message: 'Leaderboard entry created', userId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create leaderboard entry' });
  }
});

// PUT /api/leaderboard/:userId - Update user points
router.put('/:userId', async (req: Request, res: Response) => {
  try {
    const { totalPoints, activitiesCount } = req.body;
    const entry = await Leaderboard.findOneAndUpdate(
      { userId: req.params.userId },
      { totalPoints, activitiesCount },
      { new: true }
    );
    if (!entry) {
      res.status(404).json({ error: 'User not found in leaderboard' });
      return;
    }
    res.json({ message: 'Leaderboard updated', entry });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update leaderboard' });
  }
});

export default router;
