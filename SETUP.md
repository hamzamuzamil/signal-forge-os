# 🚀 Quick Setup Guide

## Step 1: Install Dependencies

### Frontend
```bash
npm install
```

### Backend
```bash
cd server
npm install
cd ..
```

## Step 2: Set Up PostgreSQL

1. **Install PostgreSQL** (if not already installed):
   - Download from: https://www.postgresql.org/download/
   - Or use Docker: `docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres`

2. **Create Database**:
   ```sql
   CREATE DATABASE signalforge;
   ```

## Step 3: Configure Environment Variables

### Backend (`server/.env`)
Create `server/.env` file:
```env
PORT=3001
FRONTEND_URL=http://localhost:8080

DB_HOST=localhost
DB_PORT=5432
DB_NAME=signalforge
DB_USER=postgres
DB_PASSWORD=postgres
DB_SSL=false

JWT_SECRET=change-this-to-a-random-secure-string-in-production
```

### Frontend (`.env` in root)
Create `.env` file in root:
```env
VITE_API_URL=http://localhost:3001/api
```

## Step 4: Start the Application

### Option A: Run Both Together
```bash
npm run dev:all
```

### Option B: Run Separately

**Terminal 1 - Backend:**
```bash
npm run server:dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

## Step 5: Access the Application

Open your browser and go to: **http://localhost:8080**

## ✅ You're Ready!

1. Click "Get Started" on the landing page
2. Sign up with your **Full Name**, Email, and Password
3. Start using SignalForge OS!

## 🔧 Troubleshooting

### Database Connection Error
- Make sure PostgreSQL is running
- Check your database credentials in `server/.env`
- Verify the database `signalforge` exists

### Port Already in Use
- Backend: Change `PORT` in `server/.env`
- Frontend: Change port in `vite.config.ts`

### Authentication Not Working
- Ensure backend is running on port 3001
- Check browser console for errors
- Verify `JWT_SECRET` is set in `server/.env`

## 📦 Production Deployment

1. Build frontend: `npm run build`
2. Set production environment variables
3. Use a process manager like PM2 for the backend
4. Set up reverse proxy (nginx) for production
5. Use strong `JWT_SECRET` in production
6. Enable SSL for database connection

