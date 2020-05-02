import { createConnection, Connection } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

let connection: Connection;

console.log(__dirname);

export const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  database: 'todo',
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
