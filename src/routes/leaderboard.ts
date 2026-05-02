import { Router } from 'express';
import { pool } from '../db/db';

const router = Router();


router.get('/users', async (req, res) => {
    const result = await pool.query(`
    SELECT
      u.name,
      SUM(ve.hours_worked) AS total_hours
    FROM VolunteerEntry ve
    JOIN Users u ON ve.user_id = u.id
    WHERE ve.status_id = 2
    GROUP BY u.id
    ORDER BY total_hours DESC
  `);

    res.json(result.rows);
});

router.get('/orgs', async (req, res) => {
    const result = await pool.query(`
    SELECT
      ou.name AS org_name,
      SUM(ve.hours_worked) AS total_hours
    FROM VolunteerEntry ve
    JOIN Users u ON ve.user_id = u.id
    JOIN OrganizationUnit ou ON u.org_unit_id = ou.id
    WHERE ve.status_id = 2
    GROUP BY ou.id
    ORDER BY total_hours DESC
  `);

    res.json(result.rows);
});

export default router;