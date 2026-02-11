/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("UserSettings", (table) => {
    table.text("userId").primary();
    table.text("currency").notNullable();
  });

  await knex.schema.createTable("Category", (table) => {
    table.timestamp("createdAt").defaultTo(knex.fn.now()).notNullable();
    table.text("name").notNullable();
    table.text("userId").notNullable();
    table.text("icon").notNullable();
    table.text("type").notNullable().defaultTo("income");
    table.unique(["name", "userId", "type"]);
  });

  await knex.schema.createTable("Transaction", (table) => {
    table.text("id").primary();
    table.timestamp("createdAt").defaultTo(knex.fn.now()).notNullable();
    table.timestamp("updatedAt").defaultTo(knex.fn.now()).notNullable();
    table.double("amount").notNullable();
    table.text("description").notNullable();
    table.timestamp("date").notNullable();
    table.text("userId").notNullable();
    table.text("type").notNullable().defaultTo("income");
    table.text("category").notNullable();
    table.text("categoryIcon").notNullable();
  });

  await knex.schema.createTable("MonthHistory", (table) => {
    table.text("userId").notNullable();
    table.integer("day").notNullable();
    table.integer("month").notNullable();
    table.integer("year").notNullable();
    table.double("income").notNullable();
    table.double("expenses").notNullable();
    table.primary(["day", "month", "year", "userId"]);
  });

  await knex.schema.createTable("YearHistory", (table) => {
    table.text("userId").notNullable();
    table.integer("month").notNullable();
    table.integer("year").notNullable();
    table.double("income").notNullable();
    table.double("expenses").notNullable();
    table.primary(["month", "year", "userId"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("YearHistory");
  await knex.schema.dropTableIfExists("MonthHistory");
  await knex.schema.dropTableIfExists("Transaction");
  await knex.schema.dropTableIfExists("Category");
  await knex.schema.dropTableIfExists("UserSettings");
};
