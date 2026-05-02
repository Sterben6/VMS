import { Request, Response } from 'express';
import { pool } from '../db/db';

export const createUser = async (req: Request, res: Response) => {
    const {
        name,
        email,
        org_unit_id,
        org_type_id,
        role_name,
        role_privilege
    } = req.body;

    if (!name || !email) {
        return res.status(400).json({error: 'Missing required field'});
    }

    try {
        const result = await pool.query(
            `INSERT INTO Users(
                  name,
                  email,
                  org_unit_id,
                  org_type_id,
                  role_name,
                  role_privilege
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [
                name,
                email,
                org_unit_id ?? null,
                org_type_id ?? null,
                role_name,
                role_privilege

            ]
        );

        res.status(201).json(result.rows[0]);
    } catch (error: any) {
        console.log(error);
        if (error.code === '23505') {
            return res.status(409).json({
                error: 'Email already exists'
            })
        }

        return res.status(500).json({
            error: 'Internal Server Error'
        })
    }
}

export const GetUser = async (req: Request, res: Response) => {

}