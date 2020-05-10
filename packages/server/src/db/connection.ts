import { createConnection, Connection } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const DB_NAME = process.env.DB_NAME || 'todo';

let connection: Connection;

export const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  database: DB_NAME,
  username: 'appuser',
  password: 'password',
  synchronize: false,
  entities: [`./src/db/models/**/*.ts`], //[path.normalize(`${__dirname}/models/**/*.ts`)],
  migrations: [`./src/db/migrations/**/*.ts`], //[path.normalize(`${__dirname}/migrations/**/*.ts`)],
  cli: {
    migrationsDir: `./src/db/migrations`, //path.normalize(`${__dirname}/migrations`),
  },
};

export async function connect(): Promise<Connection> {
  if (!connection) {
    connection = await createConnection(config);
  }
  return connection;
}
