import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import path from "node:path";

const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error(
    "DIRECT_URL or DATABASE_URL environment variable is missing.",
  );
}

async function runMigration() {
  const pool = new Pool({ connectionString, max: 1 });

  try {
    await migrate(drizzle(pool), {
      migrationsFolder: path.join(process.cwd(), "drizzle"),
    });
  } finally {
    await pool.end();
  }
}

runMigration().catch(() => {
  process.exit(1);
});
