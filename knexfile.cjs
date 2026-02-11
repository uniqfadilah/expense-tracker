const connection = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL || "postgresql://expense:expense_secret@localhost:5432/expense_tracker";

module.exports = {
  development: {
    client: "pg",
    connection,
    migrations: { directory: "./knex/migrations" },
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL,
    migrations: { directory: "./knex/migrations" },
    pool: { min: 0, max: 10 },
  },
};
