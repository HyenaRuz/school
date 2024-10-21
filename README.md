# School Project

This project consists of two main parts: a backend and a frontend application.

## Backend

The backend is built using Node.js, NestJS, and TypeORM. It connects to a PostgreSQL database and provides APIs for the frontend to interact with.

### Running the Backend

1. Install dependencies:
    ```sh
    cd backend
    npm install
    ```

2. Build the application:
    ```sh
    npm run build
    ```

3. Run the application:
    ```sh
    npm run start:prod
    ```

4. Seed the database:
    ```sh
    npm run seed
    ```

## Frontend

The frontend is built using React.

### Running the Frontend

1. Install dependencies:
    ```sh
    cd frontend
    npm install
    ```

2. Start the development server:
    ```sh
    npm start
    ```

## Running with Docker

To run both the backend and frontend using Docker, use the following command from the root directory (`/school`):

```sh
docker-compose up --build
```

To populate the database with default accounts and events:

```sh
docker-compose exec backend npm run seed
```

## Credentials

### General password
- **Password**: `password`

### Teacher 1
- Email: `teacher1@example.com`
- Students:
  - `student1_1@example.com`
  - `student1_2@example.com`
  - `student1_3@example.com`
  - `student1_4@example.com`
  - `student1_5@example.com`

### Teacher 2
- Email: `teacher2@example.com`
- Students:
  - `student2_1@example.com`
  - `student2_2@example.com`
  - `student2_3@example.com`
  - `student2_4@example.com`
  - `student2_5@example.com`
