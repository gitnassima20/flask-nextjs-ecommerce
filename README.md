# Flask-NextJS E-commerce Application

This is a full-stack e-commerce application built with Flask (backend) and Next.js (frontend).

## Project Structure

```
flask-nextjs-ecommerce/
├── backend/         # Flask backend
└── frontend/        # Next.js frontend
```

## Prerequisites

- Python 3.8 or higher
- Node.js 18 or higher
- npm or yarn package manager

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows:
     ```bash
     .\venv\Scripts\activate
     ```
   - Unix or MacOS:
     ```bash
     source venv/bin/activate
     ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Create a `.env` file in the backend directory with your environment variables:
   ```
   FLASK_APP=app
   FLASK_ENV=development
   DATABASE_URL=sqlite:///db.sqlite3
   ```

6. Initialize the database and run migrations:
   ```bash
   flask db upgrade
   ```

7. Start the Flask server:
   ```bash
   flask run
   ```
   The backend will be available at `http://localhost:5000`

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the frontend directory:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The frontend will be available at `http://localhost:3000`

## Features

- Product management
- Admin dashboard
- RESTful API
- Modern UI with responsive design
- SQLite database (can be configured for other databases)

## Testing

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
cd frontend
npm run test
# or
yarn test
```

## Production Deployment

### Backend
1. Set up your production environment variables
2. Use gunicorn for production server:
   ```bash
   gunicorn app:app
   ```

### Frontend
1. Build the Next.js application:
   ```bash
   npm run build
   # or
   yarn build
   ```
2. Start the production server:
   ```bash
   npm run start
   # or
   yarn start
   ```

## Tech Stack

- **Backend**:
  - Flask
  - SQLAlchemy
  - Flask-Marshmallow
  - Flask-Migrate
  - Flask-CORS

- **Frontend**:
  - Next.js 13+
  - TypeScript
  - Tailwind CSS
  - React Query
  - Axios
