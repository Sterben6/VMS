import { Request, Response } from 'express';
import { pool } from '../db/db';

export const createEvent = async (req: Request, res: Response) => {
    const {
        name,
        description,
        event_date,
        org_unit_id,
        created_by
    } = req.body;

    if (!name || !description || !event_date || org_unit_id === undefined || created_by === undefined) {
        return res.status(400).json({error: 'Missing required field'})
    }

    try {
        const result = await pool.query(
            `INSERT INTO Events(
                name,
                description,
                event_date,
                org_unit_id,
                created_by
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [
                name,
                description,
                event_date,
                org_unit_id,
                created_by

            ]
        );

        res.status(201).json(result.rows[0]);
    } catch (error: any) {
        console.log(error);

        if (error.code === '23503') {
            return res.status(400).json({
                error: 'Invalid org unit or creator'
            });
        }

        return res.status(500).json({
            error: 'Internal Server Error'
        })
    }


}