import { Router } from 'express';
import {approveEntry, createEntry, rejectEntry} from '../controllers/entrycontroller';

const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'Entries route works' });
});

router.post('/', createEntry);

router.post('/:id/approve', approveEntry);

router.post('/:id/reject', rejectEntry);

export default router;
