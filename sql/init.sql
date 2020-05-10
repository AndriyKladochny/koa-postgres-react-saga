DO $$BEGIN
  CREATE EXTENSION dblink;
  PERFORM dblink_connect('dbname=' || current_database());
  PERFORM dblink_exec('CREATE DATABASE todo');
  CREATE USER appuser WITH PASSWORD 'password';
  GRANT ALL PRIVILEGES ON DATABASE todo TO appuser;
END$$; 

DO $$BEGIN
  CREATE EXTENSION dblink;
  PERFORM dblink_connect('dbname=' || current_database());
  PERFORM dblink_exec('CREATE DATABASE todo_test');
  CREATE USER appuser WITH PASSWORD 'password';
  GRANT ALL PRIVILEGES ON DATABASE todo TO appuser;
END$$; 