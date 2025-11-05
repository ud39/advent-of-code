# Execute the following before running the python script

CREATE USER ud39 WITH PASSWORD 'DaVinci1337';

CREATE DATABASE advent_of_code;

GRANT ALL PRIVILEGES ON DATABASE advent_of_code TO ud39;

\c advent_of_code
ALTER SCHEMA public OWNER TO ud39;
GRANT ALL ON SCHEMA public TO ud39;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO ud39;
ALTER DEFAULT PRIVILEGES IN SCHEMA public;
GRANT ALL ON TABLES TO ud39;



