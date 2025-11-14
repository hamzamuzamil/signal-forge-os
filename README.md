# SignalForge OS

An intelligent signal processing platform that helps you filter through information noise and focus on what truly matters in your digital workspace.

## 🚀 Features

### 🎯 Feed Dump
- Instant content analysis and filtering
- Smart signal-to-noise ratio detection
- Automated priority scoring
- AI-powered content categorization

### 📨 Inbox Signalizer
- Email content analysis
- Smart categorization with AI labels
- Action recommendations
- User feedback integration for continuous learning

### 🧭 Clarity Compass
- Decision support system
- Pattern recognition across your signals
- Strategic insights and weekly summaries
- Time/value distribution analysis

### 🔔 Focus Alerts
- Real-time signal monitoring
- Priority notifications
- Custom alert thresholds
- Smart filtering and sorting

### 🔍 Blind Spot Scanner
- Gap analysis in information flow
- Missed opportunity detection
- Strategic recommendations
- Goal-based blind spot identification

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS + shadcn/ui components
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **State Management**: TanStack React Query
- **Routing**: React Router v6
- **UI Components**: Radix UI primitives
- **Charts**: Recharts

## 📋 Prerequisites

- Node.js (v18 or higher recommended)
- PostgreSQL (v12 or higher)
- npm, yarn, or pnpm

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd signal-forge-os
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

### 4. Set Up PostgreSQL Database

1. Create a PostgreSQL database:
```sql
CREATE DATABASE signalforge;
```

2. The database tables will be created automatically when you start the server.

### 5. Configure Environment Variables

**Backend Configuration** (`server/.env`):
```env
PORT=3001
FRONTEND_URL=http://localhost:8080

# PostgreSQL Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=signalforge
DB_USER=postgres
DB_PASSWORD=your-postgres-password
DB_SSL=false

# JWT Secret (CHANGE THIS IN PRODUCTION!)
JWT_SECRET=your-secret-key-change-in-production-use-a-strong-random-string
```

**Frontend Configuration** (`.env` in root):
```env
VITE_API_URL=http://localhost:3001/api
```

### 6. Start the Development Servers

**Option 1: Run both frontend and backend together**
```bash
npm run dev:all
```

**Option 2: Run separately**

Terminal 1 (Backend):
```bash
npm run server:dev
```

Terminal 2 (Frontend):
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

### 7. Build for Production

**Build Frontend:**
```bash
npm run build
```

**Start Production Server:**
```bash
npm run server
```

## 📁 Project Structure

```
signal-forge-os/
├── server/                 # Backend API server
│   ├── index.js            # Express server and routes
│   ├── package.json        # Backend dependencies
│   └── .env                # Backend environment variables
├── src/
│   ├── components/         # React components
│   │   ├── dashboard/      # Dashboard-specific components
│   │   └── ui/            # Reusable UI components (shadcn/ui)
│   ├── lib/
│   │   └── api.ts         # API client for backend communication
│   ├── pages/             # Main page components
│   ├── App.tsx            # Main application component
│   └── main.tsx           # Application entry point
├── public/                # Static assets
└── package.json           # Frontend dependencies
```

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

- **Sign Up**: Requires full name, email, and password
- **Sign In**: Requires email and password
- **Session**: Tokens are stored in localStorage and automatically included in API requests
- **Security**: Passwords are hashed using bcrypt before storage

## 🎨 Key Components

- **LandingPage**: Beautiful marketing landing page with feature showcase
- **Auth**: Secure authentication with JWT
- **Dashboard**: Main application interface with tabbed navigation
- **FeedDump**: Content analysis and signal filtering
- **InboxSignalizer**: Email categorization and labeling
- **ClarityCompass**: Weekly summaries and insights
- **FocusAlerts**: Real-time signal monitoring
- **BlindSpotScanner**: Goal-based gap analysis

## 🔧 Development

### Available Scripts

**Frontend:**
- `npm run dev` - Start frontend development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

**Backend:**
- `npm run server` - Start production server
- `npm run server:dev` - Start development server with auto-reload

**Both:**
- `npm run dev:all` - Run both frontend and backend concurrently

## 🐛 Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Verify database credentials in `server/.env`
- Check that the database `signalforge` exists

### Authentication Errors
- Make sure the backend server is running on port 3001
- Check that `JWT_SECRET` is set in `server/.env`
- Verify CORS settings if accessing from different origin

### Port Already in Use
- Change `PORT` in `server/.env` for backend
- Change port in `vite.config.ts` for frontend

## 📝 API Endpoints

- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Authenticate user
- `GET /api/auth/me` - Get current user (requires auth)
- `GET /api/signals` - Get user's signals (requires auth)
- `POST /api/signals` - Create new signal (requires auth)
- `GET /api/health` - Health check

## 🚀 Production Deployment

1. Set strong `JWT_SECRET` in production environment
2. Use environment variables for all sensitive data
3. Enable SSL for PostgreSQL connection (`DB_SSL=true`)
4. Set proper CORS origins in backend
5. Use a reverse proxy (nginx) for production
6. Set up proper logging and monitoring

## 📄 License

This project is private and proprietary.
