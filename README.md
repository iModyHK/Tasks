# Team Task Manager

A full-featured Team Task Management Web App with task tracking, collaboration, dashboards, and admin customization.

## Features

- Hierarchical task assignment
- Kanban, Gantt, Calendar & Timeline views
- Role-based permissions (Admin, Leader, Member)
- Real-time collaboration (chat + live edits)
- Analytics, reports, notifications
- Dark mode, theme customization, translation (Arabic/English)
- Time tracking, Pomodoro timer
- Wikis and shared notes
- Docker-ready for deployment

## Tech Stack

- Frontend: React, Vite, TypeScript, TailwindCSS
- Backend: Node.js, Express, Socket.IO
- Database: MongoDB (or similar)
- Realtime: WebSockets (Socket.IO)

## Setup Instructions

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm run dev
```

### Docker

```bash
docker-compose up --build
```

## Admin Panel

- Feature toggles for major modules (Gantt, Kanban, Calendar, etc.)
- Site settings (logo, title, language, theme)
- Edit translation labels directly
- View audit logs and manage user roles

## Development Tools

- ESLint + Prettier for code quality
- Tailwind CSS for styling
- Vite for fast dev & build

---

© 2025 Your Team Name. All rights reserved.