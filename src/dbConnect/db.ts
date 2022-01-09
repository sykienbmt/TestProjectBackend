
import { Pool } from 'pg';

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'postgres',
    database: 'testproject',
    port: 5432
});