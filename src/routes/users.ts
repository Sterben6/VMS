import { Router } from 'express';
import { createUser } from '../controllers/usercontroller';

const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'Users route works' });
});

router.post('/', createUser);

export default router;
