# Vocabulary AI

The application is designed to save the words you jot down in your notebook during language lessons. It helps to organize and maintain your entire learned vocabulary by storing it in a Google spreadsheet. This approach provides quick and convenient access to the words for review, which enhances effective knowledge retention and simplifies the learning process.

Now you can upload images of your handwritten notebook pages via telegram bot and the application will extract the words for you.

Project roadmap:
[ ] Upload images to the application via the web interface
[ ] Save list of words in application account
[ ] Allow to export list of words to the Google spreadsheet or other storage

## Technologies

- [NestJS](https://nestjs.com/)
- [Telegraf](https://telegraf.js.org/)
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
   git clone https://github.com/velzepooz/vocabulary-ai
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd vocabulary-ai
   ```

3. **Install Dependencies (for local development):**

   ```bash
   npm install
   ```

4. **Configure Environment Variables (or leave default values):**

   Configure an `.env` file in the root directory or leave default values.


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
