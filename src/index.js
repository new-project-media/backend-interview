import { Client as PgClient } from "pg";
import { Client as EsClient } from "@elastic/elasticsearch";

const pg = new PgClient({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

const es = new EsClient({
  node: process.env.ELASTICSEARCH_URL,
});

async function main() {
  try {
    console.log("Connecting to Postgres...");
    await pg.connect();

    console.log("Connecting to Elasticsearch...");
    await es.ping();

    // TODO:
    // 1. Read rows from Postgres
    // 2. Transform data
    // 3. Index into Elasticsearch (orders_v1)
    // 4. Query ES and print results

    console.log("Done.");
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  } finally {
    await pg.end();
  }
}

main();
