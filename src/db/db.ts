import { Pool } from 'pg';

export const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'NewPassword1', // would not actually put password here
    database: 'aas_sw_db',
});