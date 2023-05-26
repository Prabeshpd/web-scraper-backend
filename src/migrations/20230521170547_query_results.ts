import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('search_results', (table) => {
    table.increments('id').primary();
    table.integer('ad_words_count').notNullable();
    table.integer('links_count').notNullable();
    table.integer('total_results').notNullable();
    table.specificType('html_page', 'text').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('search_results');
}
