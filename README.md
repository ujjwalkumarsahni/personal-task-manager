# Personal Task Manager

A full-stack Personal Task Manager application built using React, Tailwind CSS, Node.js, Express.js, and MongoDB.

The application allows users to create, update, delete, search, filter, and manage personal tasks through a clean and responsive interface.

---

## Live Demo

Frontend: Coming Soon

Backend: Coming Soon

---

## Features

### Core Features

* Create a new task
* View all tasks
* Edit existing tasks
* Delete tasks with confirmation
* Mark tasks as completed or active
* Filter tasks by status
* Responsive UI

### Additional Features

* Search tasks by title
* Active vs Completed task counts
* Overdue task highlighting
* Empty state handling
* Drag and Drop task reordering
* MongoDB persistence

---

## Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios
* React Hooks

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Tools

* Git
* GitHub
* Postman

---

## Project Structure

```text
personal-task-manager/
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── server.js
│   │
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/personal-task-manager.git
cd personal-task-manager
```

---

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Backend Setup

```bash
cd server
npm install
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

## Environment Variables

Create a .env file inside the server folder.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string
```

---

## API Documentation

### Create Task

```http
POST /api/tasks
```

Request Body

```json
{
  "title": "Learn React",
  "description": "Practice Hooks",
  "dueDate": "2026-06-10"
}
```

---

### Get All Tasks

```http
GET /api/tasks
```

---

### Get Single Task

```http
GET /api/tasks/:id
```

---

### Update Task

```http
PUT /api/tasks/:id
```

---

### Toggle Task Status

```http
PATCH /api/tasks/:id/toggle
```

---

### Delete Task

```http
DELETE /api/tasks/:id
```

---

## Database Schema

```javascript
{
  title: String,
  description: String,
  dueDate: Date,
  completed: Boolean,
  order: Number,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Future Improvements

* User Authentication
* Task Categories
* Due Date Notifications
* Dark Mode
* Task Priority Levels
* Calendar View

---

## Assumptions

* Single user application
* No authentication required
* Tasks are stored in MongoDB
* Mobile responsive design

---

## Author

Ujjwal Kumar

GitHub:
https://github.com/your-username
