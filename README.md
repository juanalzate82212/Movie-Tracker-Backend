# 🎬 Movie Tracker API

Backend REST API for the Movie Tracker application.

This API handles user authentication, movie management, and communication with external movie data services. It provides secure endpoints that allow users to register, log in, and manage their personal movie tracking list.

---

## 🚀 Live API

Base URL: https://movie-tracker-backend-l9vq.onrender.com

---

## 🧠 What This Backend Does

- Handles user registration and authentication
- Generates and validates JWT tokens
- Protects private routes using authentication guards
- Stores user data and movie lists in MongoDB
- Connects to The Movie Database (TMDB) API to retrieve movie data
- Manages per-user movie tracking functionality

This API follows a modular architecture using NestJS best practices.

---

## 🛠 Technologies Used

- **Node.js**
- **NestJS**
- **MongoDB Atlas**
- **Mongoose**
- **JWT (JSON Web Token) Authentication**
- **TMDB API Integration**
- **Render (Cloud Deployment)**
- **CORS configuration**

---

## 🔐 Authentication

Authentication is handled using JWT.

After login, users receive a token that must be included in protected requests: Authorization: Bearer <your_token>

---

## ⚙️ Environment Variables

To run locally, create a `.env` file in the root directory:
```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
TMDB_API_KEY=your_tmdb_api_key
TMDB_BASE_URL=https://api.themoviedb.org/3
PORT=3000
```

---

## ▶️ Run Locally

```bash
npm install
npm run start:dev
```

The API will run at:
http://localhost:3000

## 👨‍💻 Author: Juan José Alzate García




