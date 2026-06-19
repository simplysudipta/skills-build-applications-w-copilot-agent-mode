import { Router, Request, Response } from 'express';
import { Workout } from '../models';

const router = Router();

// GET /api/workouts - Get all workouts
router.get('/', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find().populate('userId', 'name email');
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

// GET /api/workouts/:id - Get workout by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findById(req.params.id).populate('userId', 'name email');
    if (!workout) {
      res.status(404).json({ error: 'Workout not found' });
      return;
    }
    res.json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout' });
  }
});

// POST /api/workouts - Create a new workout
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, name, exercises, difficulty } = req.body;
    const workout = new Workout({
      userId,
      name,
      exercises,
      difficulty,
    });
    await workout.save();
    res.status(201).json({ message: 'Workout created', workoutId: workout._id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create workout' });
  }
});

// GET /api/workouts/user/:userId - Get workouts by user
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find({ userId: req.params.userId }).populate('userId', 'name email');
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user workouts' });
  }
});

// PUT /api/workouts/:id - Update workout
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { name, exercises, difficulty } = req.body;
    const workout = await Workout.findByIdAndUpdate(
      req.params.id,
      { name, exercises, difficulty },
      { new: true }
    );
    if (!workout) {
      res.status(404).json({ error: 'Workout not found' });
      return;
    }
    res.json({ message: 'Workout updated', workout });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update workout' });
  }
});

// DELETE /api/workouts/:id - Delete workout
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) {
      res.status(404).json({ error: 'Workout not found' });
      return;
    }
    res.json({ message: 'Workout deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete workout' });
  }
});

export default router;
