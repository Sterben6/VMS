import { Router } from 'express';

import usersRoutes from './users';
import eventsRoutes from './events';
import entriesRoutes from './entries';
import leaderboardRoutes from "./leaderboard";

const router = Router();

router.use('/users', usersRoutes);
router.use('/events', eventsRoutes);
router.use('/entries', entriesRoutes);
router.use('/leaderboard', leaderboardRoutes);

export default router;
