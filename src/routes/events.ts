import { Router } from 'express';
import { createEvent } from '../controllers/eventcontroller';

const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'Events route works' });
});

router.post('/', createEvent);

export default router;
