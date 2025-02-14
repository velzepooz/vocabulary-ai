# NestJS application template

This is a starter template for NestJS applications


## Technologies

- [NestJS](https://nestjs.com/)
- [Fastify](https://www.fastify.io/)
- [Swagger](https://swagger.io/)
- [Docker](https://www.docker.com/)
- Jest

## Prerequisites

Before proceeding with the installation, ensure that the following prerequisites are met:

- **Node.js LTS (e.g., 20.x.x)**
- **Docker**

## Installation

Follow these steps to install the application:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/velzepooz/nestjs-template
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd nestjs-template
   ```

3. **Install Dependencies (for local development):**

   ```bash
   npm install
   ```

4. **Configure Environment Variables (or leave default values):**

   Configure an `.env` file in the root directory or leave default values.


## Deploy

After deploying the application, run following command:
```bash
docker compose --env-file .env up -d --build
```

This script will start a postgres container, apply all migrations and seeds, start the app in the background.

## Docs

You can find the Swagger documentation at `http://localhost:3000/docs`.

## Local development

```bash
# start the app in the development mode
npm run start:dev
```

## Tests

To run tests use the following commands:

```bash
npm run test
```
