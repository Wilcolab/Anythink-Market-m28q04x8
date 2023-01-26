# Welcome to the Anythink Market repo (powered by [Wilco](https://www.trywilco.com))

To start the app use Docker. It will start both frontend and backend, including all the relevant dependencies, and the db.

Please find more info about each part in the relevant Readme file ([frontend](frontend/readme.md) and [backend](backend/README.md)).

## Development

When implementing a new feature or fixing a bug, please create a new pull request against `main` from a feature/bug branch and add `@vanessa-cooper` as reviewer.

## Atlas usage

[Atlas](https://atlasgo.io) is an open-source tool for managing database schemas. We use Atlas in this
project to plan and apply changes to the database schema.

### Dev database

Atlas relies on having a local, empty database available for it to make all sorts of calculations and simulations.

[Read more why](https://atlasgo.io/concepts/dev-database)

When developing with Atlas, create a new database named `test` on your local PostgreSQL database:

```
docker exec -it postgres-python psql -U postgres anythink-market -c "create database test"
```

### atlas.hcl

The `atlas.hcl` file is the main configuration file for Atlas. It contains a definition for a the local
environment named "local". Most Atlas command will accept an `--env` flag to specify which environment
you want to use. Atlas can be used without this flag, in which case you will need to supply things like
the URL for the database you want to use or the directory where your migration files are placed. 

### The `migrations` directory

The `migrations/` directory contains the schema migration files. Each file describes the SQL
statements that need to be executed to migrate the database schema from one version to another. 
The revisions (called "migrations" most of the time) are named using the following convention:

```
<revision number>_<description>.sql
```

Commonly, the revision number is the timestamp in which the migration was planned, for example:

```
20210523120000_add_users_table.sql
```

Using the timestamp as the revision number makes it easy to order the migrations by the time they were
planned. This is important because applying migrations in the wrong order can cause errors.

In addition, Atlas maintains a file named `atlas.sum` which contains the checksum of each migration
file. This file is used to detect if a migration file was changed after it was planned or if the 
order of the migrations was changed.


