import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from "../shared/schema.js";
import { createClient } from '@supabase/supabase-js';

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL must be set. Ensure the database is provisioned.");
}

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set.");
}

console.log("Creating database pool...");
export const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle database client', err);
});

console.log("Drizzle adapter initializing...");
export const db = drizzle(pool, { schema });

console.log("Supabase client initializing...");
export const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

