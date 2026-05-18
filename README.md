# Smart Leads Dashboard

A full-stack Lead Management Dashboard built using the MERN stack with TypeScript.

---

# Tech Stack

## Frontend
- React.js
- TypeScript
- TailwindCSS
- Axios
- React Router DOM

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

# Features

## Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Role-Based Access Control

## Leads Management
- Create Lead
- Update Lead
- Delete Lead
- View Leads
- Single Lead Details

## Advanced Features
- Search by Name/Email
- Filter by Status
- Filter by Source
- Sorting
- Pagination
- Debounced Search
- CSV Export

## UI Features
- Responsive Dashboard
- Loading States
- Empty States
- Error Handling
- Reusable Components

---

# Folder Structure

## Frontend

```bash
client/src
├── components
├── context
├── layouts
├── pages
├── routes
├── services
├── types
```

## Backend

```bash
server/src
├── controllers
├── middleware
├── models
├── routes
├── services
├── types
```

---

# Installation

## Clone Repository

```bash
git clone YOUR_GITHUB_REPO_URL
```

---

# Backend Setup

```bash
cd server
npm install
npm run dev
```

---

# Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

# Environment Variables

Create `.env` inside `server` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

---

# Docker Setup

```bash
docker-compose up --build
```

---

# API Endpoints

## Authentication

### Register
POST `/api/auth/register`

### Login
POST `/api/auth/login`

---

## Leads

### Get All Leads
GET `/api/leads`

### Create Lead
POST `/api/leads`

### Update Lead
PUT `/api/leads/:id`

### Delete Lead
DELETE `/api/leads/:id`

---

# Roles

- Admin
- Sales User

---

# Author

Uday Singh