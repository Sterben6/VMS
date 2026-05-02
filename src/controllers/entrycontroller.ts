import { Request, Response } from 'express';
import { pool } from '../db/db';


export const createEntry = async (req: Request, res: Response) => {
    const { event_id, user_id, hours_worked, submitted_by } = req.body;

    if (
        event_id === undefined ||
        user_id === undefined ||
        submitted_by === undefined ||
        hours_worked === undefined
    ) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const result = await pool.query(`
            INSERT INTO VolunteerEntry(
            event_id,
            user_id,
            hours_worked,
            submitted_by
            )
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [event_id, user_id, hours_worked, submitted_by]
        );

        res.status(201).json(result.rows[0]);
    } catch (error: any) {
        console.error(error);

        if (error.code === '23503') {
            return res.status(400).json({
                error: 'Invalid event or user'
            });
        }

        res.status(500).json({ error: 'Failed to submit entry' });
    }
};

export const approveEntry = async (req: Request, res: Response) => {
    const id = req.params.id;
    const approved_by = req.body.approved_by;

    if (!approved_by) {
        return res.status(400).json({error: 'Missing approver'})
    }


    try {
        const result = await pool.query(`
            UPDATE VolunteerEntry
            SET status_id = 2,
            approved_by = $1,
            approved_at = NOW()
            WHERE id = $2
            RETURNING *`,
                [approved_by, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Entry not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to approve entry' });
    }

}

export const rejectEntry = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { approved_by } = req.body;

    try {
        const result = await pool.query(`
            UPDATE VolunteerEntry
            SET status_id = 3,
                approved_by = $1,
                approved_at = NOW()
            WHERE id = $2
            RETURNING *`,
                [approved_by, id]
        );

        res.json(result.rows[0]);
    } catch {
        res.status(500).json({ error: 'Failed to reject entry' });
    }
};
