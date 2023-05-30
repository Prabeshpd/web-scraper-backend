import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
console.log(__dirname)
console.log(process.env.DB_HOST);

module.exports = {
  development: {
    client: 'pg',
    connection: {
      port: process.env.DB_PORT || 5432,
      host: process.env.DB_HOST || 'db',
      database: process.env.DB_DATABASE || 'scraper',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'Admin@1234'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    }
  }
};
