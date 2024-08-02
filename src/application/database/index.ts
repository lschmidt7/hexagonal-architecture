import { Pool } from 'pg'

export const pool = new Pool({
    host: 'localhost',
    database: 'sistema',
    user: 'postgres',
    password: 'postgres',
    port: 5432
})
