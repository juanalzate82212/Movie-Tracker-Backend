# Movie Tracker API

API REST de backend para la aplicación Movie Tracker.

Esta API gestiona la autenticación de usuarios, la gestión de películas y la comunicación con servicios externos de datos de películas. Proporciona endpoints seguros que permiten a los usuarios registrarse, iniciar sesión y gestionar su lista personal de seguimiento de películas.

---

## Live API

Base URL: https://movie-tracker-backend-l9vq.onrender.com

---

## Qué hace este Backend

- Gestiona el registro y la autenticación de usuarios
- Genera y valida tokens JWT
- Protege rutas privadas mediante guardias de autenticación
- Almacena datos de usuarios y listas de películas en MongoDB
- Se conecta a la API de The Movie Database (TMDB) para recuperar datos de películas
- Gestiona la funcionalidad de seguimiento de películas por usuario

Esta API sigue una arquitectura modular utilizando las mejores prácticas de NestJS.

---

## Tecnologías usadas

- **Node.js**
- **NestJS**
- **MongoDB Atlas**
- **Mongoose**
- **JWT (JSON Web Token) Authentication**
- **Integración TMDB API**
- **Render (Despliegue)**
- **Configuración CORS**

---

## Autenticación

La autenticación se gestiona mediante JWT.

Tras iniciar sesión, los usuarios reciben un token que debe incluirse en las solicitudes protegidas: Autorización: Bearer <tu_token>

---

## Variables de Entorno

Para ejecutar localmente, cree un archivo `.env` en el directorio raíz:
```bash
MONGO_URI=tu_mongodb_connection_string
JWT_SECRET=tu_secret_key
TMDB_API_KEY=tu_tmdb_api_key
TMDB_BASE_URL=https://api.themoviedb.org/3
PORT=3000
```

---

## Correr localmente

```bash
npm install
npm run start:dev
```

La API correrá en:
http://localhost:3000

## 👨‍💻 Autor: Juan José Alzate García

----

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




