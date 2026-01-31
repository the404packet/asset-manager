import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: "db",
  user: "asset",
  password: "asset",
  database: "assetdb",
  port: 5432
});

export default pool;
