# Library Management System

A modern web-based library management system built with React and Laravel.

## Project Structure

```
library-management-system/
├── frontend/           # React frontend application
└── backend/           # Laravel backend application
```

## Frontend Setup (React)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Backend Setup (Laravel)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   composer install
   ```

3. Copy .env.example to .env and configure your database:
   ```bash
   cp .env.example .env
   ```

4. Generate application key:
   ```bash
   php artisan key:generate
   ```

5. Run migrations:
   ```bash
   php artisan migrate
   ```

6. Start the development server:
   ```bash
   php artisan serve
   ```

## Features

- User authentication and authorization
- Book management (add, edit, delete, search)
- Member management
- Book borrowing and return system
- Fine calculation
- Reports generation
- Search functionality
- Responsive design

## Technologies Used

- Frontend:
  - React
  - Material-UI
  - Axios
  - React Router

- Backend:
  - Laravel
  - MySQL
  - Laravel Sanctum for API authentication

## API Endpoints

The backend provides the following main API endpoints:

- `/api/auth/*` - Authentication endpoints
- `/api/books/*` - Book management endpoints
- `/api/members/*` - Member management endpoints
- `/api/borrows/*` - Book borrowing endpoints
- `/api/reports/*` - Reports endpoints 