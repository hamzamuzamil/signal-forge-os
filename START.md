# 🚀 Start Your Application

## ✅ Database Connection: VERIFIED
Your PostgreSQL database is connected and ready!

## 🎯 Quick Start Commands

### Option 1: Start Everything at Once
```bash
npm run dev:all
```

### Option 2: Start Separately (Recommended for Testing)

**Terminal 1 - Backend Server:**
```bash
cd server
npm start
```
You should see:
- ✅ Connected to PostgreSQL database
- ✅ Database tables initialized
- 🚀 Server running on http://localhost:3001

**Terminal 2 - Frontend:**
```bash
npm run dev
```
You should see:
- Frontend running on http://localhost:8080

## 🌐 Access Your Application

Open your browser and go to: **http://localhost:8080**

## 📝 First Steps

1. Click "Get Started" on the landing page
2. **Sign Up** with:
   - Full Name (e.g., "Hamza Muzamil")
   - Email (e.g., "hamzamuzamil21@gmail.com")
   - Password
3. You'll be automatically logged in and redirected to the dashboard!

## ✅ What's Working

- ✅ PostgreSQL database connected
- ✅ Database tables will auto-create on first server start
- ✅ JWT authentication ready
- ✅ Full name field in signup
- ✅ All API endpoints configured

## 🔧 If Something Goes Wrong

### Server won't start?
- Check if port 3001 is available
- Verify PostgreSQL is running
- Check `server/.env` file exists

### Database errors?
- Run: `cd server && node test-db.js`
- Verify database "signalforge" exists
- Check PostgreSQL service is running

### Frontend can't connect?
- Make sure backend is running on port 3001
- Check `.env` file has `VITE_API_URL=http://localhost:3001/api`
- Restart frontend after creating `.env`

## 🎉 You're All Set!

Your project is configured and ready to test. Start the servers and begin using SignalForge OS!

