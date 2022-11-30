
/* eslint-disable no-undef */
module.exports = {
  "type":  'postgres' ,
  "host":  process.env.DB_HOST ? process.env.DB_HOST : "localhost",
  "port":  process.env.DB_PORT ? process.env.DB_PORT :  5432,
  "username": process.env.DB_USER ?  process.env.DB_USER :  'postgres',
  "password":  process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "postgres",
  "database": "todo",
  "entities": [`./${process.env.DB_PATH ? process.env.DB_PATH : 'src'}/modules/**/typeorm/entities/*.${process.env.DB_PATH ? 'js' : 'ts' }`],
  "migrations": [`./${process.env.DB_PATH ? process.env.DB_PATH : 'src'}/shared/typeorm/migrations/*.${process.env.DB_PATH ? 'js' : 'ts' }`],
  "cli": {
    "migrationsDir": "./src/shared/typeorm/migrations",
  },
};
