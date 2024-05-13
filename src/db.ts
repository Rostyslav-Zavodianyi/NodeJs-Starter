import { Pool } from "pg";

const dbConfig = {
  user: process.env.DB_USER || "admin",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "shopAppTS",
  password: process.env.DB_PASSWORD || "1111",
  port: parseInt(process.env.DB_PORT || "5432"),
};

const pool = new Pool(dbConfig);

export { pool };
