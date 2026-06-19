import { Router, Request, Response } from 'express';
import { Activity } from '../models';

const router = Router();

// GET /api/activities - Get all activities
router.get('/', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate('userId', 'name email');
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// GET /api/activities/:id - Get activity by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findById(req.params.id).populate('userId', 'name email');
    if (!activity) {
      res.status(404).json({ error: 'Activity not found' });
      return;
    }
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
});

// POST /api/activities - Log a new activity
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, activityType, duration, distance, calories, date, description } = req.body;
    const activity = new Activity({
      userId,
      activityType,
      duration,
      distance,
      calories,
      date,
      description,
    });
    await activity.save();
    res.status(201).json({ message: 'Activity logged', activityId: activity._id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to log activity' });
  }
});

// GET /api/activities/user/:userId - Get activities by user
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find({ userId: req.params.userId }).populate('userId', 'name email');
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user activities' });
  }
});

// PUT /api/activities/:id - Update activity
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { activityType, duration, distance, calories, description } = req.body;
    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      { activityType, duration, distance, calories, description },
      { new: true }
    );
    if (!activity) {
      res.status(404).json({ error: 'Activity not found' });
      return;
    }
    res.json({ message: 'Activity updated', activity });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update activity' });
  }
});

// DELETE /api/activities/:id - Delete activity
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) {
      res.status(404).json({ error: 'Activity not found' });
      return;
    }
    res.json({ message: 'Activity deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete activity' });
  }
});

export default router;
