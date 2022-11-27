/* eslint-disable no-undef */
export default {
  type: process.env.DB_NAME ? process.env.DB_NAME : "postgres",
  host: process.env.DB_HOST ? process.env.DB_HOST : "localhost",
  port: process.env.DB_PORT ? process.env.DB_PORT : 5432,
  username: process.env.DB_USER ? process.env.DB_USER : "postgres",
  password: process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "postgres",
  database: "todo",
  entities: ["./dist/modules/**/typeorm/entities/*.js"],
  migrations: ["./dist/shared/typeorm/migrations/*.js"],
  cli: {
    migrationsDir: "./dist/shared/typeorm/migrations",
  },
};