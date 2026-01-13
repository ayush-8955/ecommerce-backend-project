import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

let pool;

if (connectionString) {
  pool = new Pool({ connectionString });
} else {
  pool = new Pool({
    user: process.env.PGUSER || process.env.DB_USER || "postgres",
    host: process.env.PGHOST || process.env.DB_HOST || "localhost",
    database: process.env.PGDATABASE || process.env.DB_NAME || "ecommerceDB",
    password: process.env.PGPASSWORD || process.env.DB_PASSWORD || "",
    port: parseInt(process.env.PGPORT || process.env.DB_PORT || "5432", 10),
  });
}

export default pool;
