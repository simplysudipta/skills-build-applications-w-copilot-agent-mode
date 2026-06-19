import { Router, Request, Response } from 'express';
import { Team } from '../models';

const router = Router();

// GET /api/teams - Get all teams
router.get('/', async (req: Request, res: Response) => {
  try {
    const teams = await Team.find().populate('createdBy', 'name email').populate('members', 'name email');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

// GET /api/teams/:id - Get team by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('members', 'name email');
    if (!team) {
      res.status(404).json({ error: 'Team not found' });
      return;
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team' });
  }
});

// POST /api/teams - Create a new team
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description, createdBy } = req.body;
    const team = new Team({ name, description, createdBy, members: [createdBy] });
    await team.save();
    res.status(201).json({ message: 'Team created', teamId: team._id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create team' });
  }
});

// POST /api/teams/:id/members - Add member to team
router.post('/:id/members', async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { members: userId } },
      { new: true }
    );
    if (!team) {
      res.status(404).json({ error: 'Team not found' });
      return;
    }
    res.json({ message: 'Member added to team', team });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add member' });
  }
});

// DELETE /api/teams/:id - Delete team
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) {
      res.status(404).json({ error: 'Team not found' });
      return;
    }
    res.json({ message: 'Team deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete team' });
  }
});

export default router;
