import knex, { Knex } from "knex";
import { Model } from "objection";

const config: Knex.Config = {
  client: "pg",
  connection: process.env.DATABASE_URL ?? process.env.DATABASE_URL_UNPOOLED,
  pool: process.env.DATABASE_URL ? { min: 0, max: 10 } : undefined,
};

const globalForDb = global as unknown as { db: Knex };

export const db = globalForDb.db ?? knex(config);

if (process.env.NODE_ENV !== "production") globalForDb.db = db;

Model.knex(db);
