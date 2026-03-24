# Amazon Clone

A functional, full-stack Amazon clone built with a modernized tech stack. This project features JWT user authentication, a dynamic product catalog, detailed product pages, a state-managed shopping cart, and a simulated checkout flow.

## Tech Stack
- **Frontend:** React (Vite), TypeScript, Tailwind CSS v4, Zustand, React Router
- **Backend:** Python, FastAPI, SQLAlchemy (ORM), Pydantic, SQLite (Database)

## Getting Started

### 1. Backend API
Open a terminal, navigate to the `backend/` directory, set up your Python virtual environment, and start the FastAPI server.
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Create the SQLite database and seed initial mock products
python seed.py

# Start the development server
uvicorn app.main:app --reload
```
The API should now be running locally on `http://127.0.0.1:8000/api`.

### 2. Frontend Application
In a second terminal, navigate to the `frontend/` directory to install NPM dependencies and start the Vite development server.
```bash
cd frontend
npm install
npm run dev
```
The React frontend will be accessible at `http://localhost:5173`.
