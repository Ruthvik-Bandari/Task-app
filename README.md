# 📱 TaskApp

A beautiful, full-stack task management mobile application built with React Native and NestJS, featuring a stunning glassmorphism UI design.

You can try to download zip for android phones! (https://expo.dev/accounts/ruthvikbandari/projects/mobile/builds/c615286f-57be-4b7e-aeba-8cbab01ab78e)

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)

## ✨ Features

- 🎨 **Glassmorphism UI** - Beautiful frosted glass effects with blur
- 🔐 **JWT Authentication** - Secure login and registration system
- ✅ **Task Management** - Create, read, update, delete, and complete tasks
- 🎯 **Priority Levels** - Low, Medium, and High priorities with color coding
- 📊 **Task Statistics** - Track your total, completed, and pending tasks
- 🔄 **Pull to Refresh** - Real time data updates
- 📱 **Cross Platform** - Works on both iOS and Android
- 🌈 **Beautiful Gradients** - Linear gradients throughout the app

## 📸 Screenshots

| Login Screen | Tasks List | New Task |
|:------------:|:----------:|:--------:|
| Glassmorphism login with gradient background | Task list with stats and priority badges | Create task with priority selection |

## 🛠️ Tech Stack

### Mobile App (Frontend)
| Technology | Purpose |
|------------|---------|
| React Native | Cross platform mobile framework |
| Expo SDK 54 | Development and build tooling |
| TypeScript | Type safe JavaScript |
| React Navigation | Screen navigation |
| React Query | Server state management |
| Zustand | Client state management |
| Axios | HTTP client |
| Expo Blur | Glassmorphism blur effects |
| Expo Linear Gradient | Gradient backgrounds |
| Expo Secure Store | Secure token storage |

### Backend (API)
| Technology | Purpose |
|------------|---------|
| NestJS | Node.js backend framework |
| Prisma | Database ORM |
| PostgreSQL | Relational database |
| JWT | Authentication tokens |
| bcrypt | Password hashing |
| class-validator | Request validation |

## 📁 Project Structure

```
taskapp/
├── mobile/                     # React Native Expo App
│   ├── src/
│   │   ├── api/
│   │   │   └── client.ts       # API client with Axios
│   │   ├── components/
│   │   │   ├── Button.tsx      # Reusable button component
│   │   │   ├── GlassCard.tsx   # Glassmorphism card component
│   │   │   ├── Input.tsx       # Form input component
│   │   │   └── TaskCard.tsx    # Task list item component
│   │   ├── hooks/
│   │   │   ├── useAuth.ts      # Authentication state (Zustand)
│   │   │   └── useTasks.ts     # Task queries (React Query)
│   │   ├── navigation/
│   │   │   └── RootNavigator.tsx
│   │   ├── screens/
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── RegisterScreen.tsx
│   │   │   ├── TasksListScreen.tsx
│   │   │   ├── NewTaskScreen.tsx
│   │   │   └── TaskDetailScreen.tsx
│   │   ├── theme/
│   │   │   └── tokens.ts       # Design system tokens
│   │   └── types/
│   │       └── index.ts        # TypeScript interfaces
│   ├── App.tsx
│   └── package.json
│
├── backend/                    # NestJS API
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/           # Authentication module
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── jwt.strategy.ts
│   │   │   │   └── jwt-auth.guard.ts
│   │   │   ├── user/           # User module
│   │   │   │   ├── user.controller.ts
│   │   │   │   └── user.service.ts
│   │   │   └── task/           # Task module
│   │   │       ├── task.controller.ts
│   │   │       ├── task.service.ts
│   │   │       └── dto/
│   │   ├── common/
│   │   │   └── prisma.service.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── prisma/
│   │   └── schema.prisma       # Database schema
│   └── package.json
│
├── docker-compose.yml          # PostgreSQL container
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- Docker and Docker Compose
- Expo Go app on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
- Git

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/Ruthvik-Bandari/Task-app.git
cd Task-app
```

#### 2. Start the Database

```bash
docker-compose up -d
```

This starts PostgreSQL on port 5433.

#### 3. Setup Backend

```bash
cd backend
npm install
```

Create `.env` file:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/taskapp"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
PORT=3000
```

Run migrations and start server:
```bash
npx prisma generate
npx prisma migrate dev --name init
npm run start:dev
```

The API will be running at `http://localhost:3000`

#### 4. Setup Mobile App

```bash
cd mobile
npm install
```

Update API URL in `src/api/client.ts`:
```typescript
// For physical device, use your computer's IP address
const API_URL = 'http://YOUR_IP_ADDRESS:3000/api';

// Find your IP:
// Mac: ipconfig getifaddr en0
// Windows: ipconfig | findstr IPv4
```

Start Expo:
```bash
npx expo start --clear
```

Scan the QR code with your phone's camera (iOS) or Expo Go app (Android).

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Create new account | No |
| POST | `/api/auth/login` | Login to account | No |
| GET | `/api/auth/me` | Get current user | Yes |

### Tasks

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/tasks` | List all tasks | Yes |
| GET | `/api/tasks/:id` | Get single task | Yes |
| POST | `/api/tasks` | Create new task | Yes |
| PATCH | `/api/tasks/:id` | Update task | Yes |
| PATCH | `/api/tasks/:id/toggle` | Toggle completion | Yes |
| DELETE | `/api/tasks/:id` | Delete task | Yes |
| GET | `/api/tasks/stats` | Get task statistics | Yes |

### Query Parameters for GET /api/tasks

| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 10) |
| status | string | Filter by status (TODO, IN_PROGRESS, COMPLETED) |
| priority | string | Filter by priority (LOW, MEDIUM, HIGH) |
| search | string | Search in title and description |

## 🗄️ Database Schema

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String
  tasks     Task[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Task {
  id          String     @id @default(uuid())
  title       String
  description String?
  dueDate     DateTime?
  priority    Priority   @default(MEDIUM)
  status      TaskStatus @default(TODO)
  completed   Boolean    @default(false)
  user        User       @relation(fields: [userId], references: [id])
  userId      String
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
}

enum Priority {
  LOW
  MEDIUM
  HIGH
}

enum TaskStatus {
  TODO
  IN_PROGRESS
  COMPLETED
}
```

## 🎨 Design System

### Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#3b82f6` | Buttons, links, accents |
| Success | `#22c55e` | Low priority, completed |
| Warning | `#f59e0b` | Medium priority |
| Error | `#ef4444` | High priority, errors |

### Glassmorphism

The app uses glassmorphism effects with:
- Background blur (iOS native BlurView)
- Semi-transparent backgrounds
- Subtle borders
- Soft shadows

## 🌐 Deployment

### Database (Supabase)
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Copy connection string from Settings > Database

### Backend (Render)
1. Create account at [render.com](https://render.com)
2. Connect your GitHub repository
3. Create new Web Service
4. Set environment variables:
   - `DATABASE_URL`: Supabase connection string
   - `JWT_SECRET`: Your secret key
5. Deploy

### Mobile App
Update `API_URL` in `src/api/client.ts` to your Render URL:
```typescript
const API_URL = 'https://your-app.onrender.com/api';
```

Build for production:
```bash
npx expo build:android
npx expo build:ios
```

## 🔧 Environment Variables

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL connection string | postgresql://user:pass@host:5432/db |
| JWT_SECRET | Secret for JWT signing | your-secret-key |
| PORT | Server port | 3000 |

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ruthvik Bandari**

- GitHub: [@Ruthvik-Bandari](https://github.com/Ruthvik-Bandari)
- LinkedIn: [Ruthvik Bandari](https://www.linkedin.com/in/ruthvik-nath-bandari-908b00247/)

## 🙏 Acknowledgments

- [Expo](https://expo.dev/) for the amazing development experience
- [NestJS](https://nestjs.com/) for the powerful backend framework
- [Prisma](https://prisma.io/) for the excellent ORM
- [React Query](https://tanstack.com/query) for server state management

---

⭐ **Star this repo if you found it helpful!**
