import type { Knex } from "knex";

const connection = process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL ?? "postgresql://expense:expense_secret@localhost:5432/expense_tracker";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection,
    migrations: {
      directory: "./knex/migrations",
    },
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL,
    migrations: {
      directory: "./knex/migrations",
    },
    pool: { min: 0, max: 10 },
  },
};

export default config;
