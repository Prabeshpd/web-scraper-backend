# web-scraper-backend

# Setup

- Requires Node 16.13.0 (Gallium) or above.
- Postgres Server
- Redis
- RabbitMQ

---

--Required Repositories

Following repositories must be setup for application which requires RabbitMQ for setup.

- Parser [CSV_PARSER](https://github.com/Prabeshpd/scraper-parser)
- Scraper [WEB_SCRAPER](https://github.com/Prabeshpd/web-scraper-script)

---

## Installation

Clone the repository, install the dependencies and get started right away. Make sure you already have `nodejs`, `npm` and `yarn` installed in your system.

```sh
git clone git@github.com:Prabeshpd/web-scraper-backend.git
cd web-scraper-backend
cp .env.example .env
yarn
```

---

## Environment Variables

Set environment variables in your env file:

---

## Database Migrations

You can run the migrations by the following command

```bash
yarn migrate
```

---

## Redis Usage

For now redis is used to store the connection parameter with consideration that database config may come from external source vault or such tools. It can be used for storing the cache of search results of the keywords with user_id as the key. For now the cache is not implemented being it outside of scope of the project requirements.

Note: If the database config is incorrect and application is started. One may have to reset the cache of redis as it stores the connection.

---

## RabbitMQ Usage

Rabbit MQ is used for event based communication between the different node process. For now I have created two separate process one is used to parse the csv file and store those keywords from the csv file. It then will create an event and the other process will use those keywords and scrape the google search results and garner the required results and store in the database.

The reason for using this approach is to make the process independent and scalable. If there are lot of file uploads then the process can be run as cloud function and scale accordingly or we can run each process in a cluster.

---

## Start Application

To start the application in dev.

```bash
yarn start:dev
```

---

### RUN TEST

```bash
yarn test
```

---

## Test Workflow

Unit test are run on the CI-Workflow but for now the end to end test are skipped in CI environment. This is because we do not have provision to setup the databases on CI workflow. We can create an test database on an rds instance or any other database instance which is already running from an script with provided env variables. Then we can migrate our database using

```bash
yarn migrate
```

Then we can have a seed script to insert our data for test and then we can assert the end to end test. For, now it is being assumed that in local environment test database is already setup with migrations.

Tools used for testing are

- mocha.
- chai
- sinon
- supertest

---

## Manage ENV Variable

To manage env variable we can have `vault` to store our database credentials and dynamic secrets that is needed to run the environment. We can have a vault agent to rotate our secret of vault and access the credentials from the vault api interface.
Or we can have a agent that populates our env file whenever a change is encountered in vault credentials.

---

## RELEASE CONVENTION

[Release Convention](./RELEASE.md)
