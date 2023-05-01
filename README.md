# Session Authentication with Laravel and Next

## Backend

- Laravel

### Installation

1. Change directory to `server`

   ```bash
   cd server
   ```

2. Create `.env` file

   ```bash
   cp .env.example .env
   ```

3. Install dependencies

   ```bash
   ./vendor/bin/sail composer install
   ```

4. Generate key

   ```bash
   ./vendor/bin/sail artisan key:generate
   ```

5. Start the application with docker using sail

   ```bash
   ./vendor/bin/sail up
   ```

## Frontend

- [Next.js](https://beta.nextjs.org/docs) with experimental app folder

1. Change directory to `app`

   ```bash
   cd app
   ```

2. Create `.env` file

   ```bash
   cp .env.example .env
   ```

3. Install dependencies

   ```bash
   yarn install
   ```

4. Start the application

   ```bash
   yarn dev
   ```
