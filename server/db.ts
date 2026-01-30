import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from "../shared/schema.js";
import { createClient } from '@supabase/supabase-js';

if (!process.env.DATABASE_URL) {
    console.error("WARNING: DATABASE_URL is not set. Database connection will fail.");
}

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error("WARNING: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set. Supabase Auth will fail.");
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
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);


