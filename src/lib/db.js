import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ecommerceDB",
  password: "202301461",
  port: 5432,
});

export default pool;
