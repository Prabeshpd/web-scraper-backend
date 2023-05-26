import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tags', (table) => {
    table.increments('id').primary();
    table.integer('user_id').references('id').inTable('users').notNullable();
    table.specificType('name', 'text').notNullable();
    table.integer('results_id').references('id').inTable('search_results').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tags');
}
