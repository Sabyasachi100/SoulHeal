# 🌿 SoulHeal — Student Mental Wellness Platform

<p align="center">
  <b>A digital platform focused on student mental wellness, self-reflection, and accessible emotional well-being resources.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-Framework-black?logo=express" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-Authentication-orange" />
  <img src="https://img.shields.io/badge/JavaScript-Frontend-yellow?logo=javascript" />
</p>

---

## 📌 About

**SoulHeal** is a student-oriented mental wellness web application designed to encourage emotional awareness and make wellness resources more accessible. It provides a digital environment where students can explore wellness tools and engage with a supportive platform.

Built using a client-server architecture, the application separates the frontend, backend logic, authentication, and database operations to ensure maintainability and extensibility.

> SoulHeal supports wellness awareness and is not a replacement for professional mental health care.

---

## ✨ Features

- 👤 User registration and authentication
- 🔐 JWT-based authentication and protected routes
- 🔒 Secure password hashing using bcrypt
- 🌿 Student-focused mental wellness interface
- 🔄 Frontend–backend API communication
- 🗄️ MongoDB database integration
- 🧩 Modular and extensible backend architecture

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML, CSS, JavaScript | Frontend & UI |
| Node.js | Backend runtime |
| Express.js | REST API & server |
| MongoDB | Database |
| Mongoose | Database modeling |
| JWT | Authentication |
| bcrypt | Password security |
| dotenv | Environment configuration |

---

# 🏗️ System Architecture

SoulHeal follows a layered client-server architecture where the frontend communicates with the backend through API requests, while the backend handles authentication, application logic, and database operations.

## Architecture Tree

```text
SoulHeal
│
├── Frontend (Client Layer)
│   ├── User Interface
│   ├── Pages & Components
│   ├── Forms & Input Validation
│   ├── Client-side Logic
│   └── API Communication
│
├── Backend (Server Layer)
│   ├── Express Server
│   ├── API Routes
│   ├── Controllers
│   ├── Middleware
│   │   ├── Authentication (JWT)
│   │   └── Request Validation
│   ├── Services (Business Logic)
│   └── Configuration
│
├── Authentication Layer
│   ├── User Registration
│   ├── Password Hashing (bcrypt)
│   ├── Login Verification
│   ├── JWT Generation
│   └── Protected Route Authorization
│
└── Database Layer
    ├── MongoDB
    ├── Mongoose Models
    └── Persistent User & Application Data
```

## Architecture Components

| Component | Description |
|---|---|
| Frontend | Handles UI, user interactions, navigation, and API requests |
| API Routes | Directs incoming requests to appropriate backend handlers |
| Controllers | Processes requests and prepares responses |
| Middleware | Performs authentication and request validation |
| Services | Contains reusable application logic |
| Authentication | Verifies identity using JWT and hashed credentials |
| Mongoose Models | Defines database schemas and data operations |
| MongoDB | Stores persistent application data |

## Request Flow

```text
User
  ↓
Frontend Interface
  ↓
API Request
  ↓
Express Server
  ↓
Authentication Middleware
  ↓
Controller / Service Logic
  ↓
Mongoose
  ↓
MongoDB
  ↓
JSON Response
  ↓
Frontend UI Update
```

---

## 📂 Project Structure

```text
SoulHeal/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   ├── services/
│   └── public/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Sabyasachi100/SoulHeal.git
cd SoulHeal
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend:

```bash
npm start
```

### 3. Setup Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed in the terminal.

---

## 🔐 Security

- Passwords are hashed before storage.
- JWT is used for authentication.
- Protected routes restrict unauthorized access.
- Environment variables are used for sensitive configurations.
- Database access is handled through the backend.

---

## 🚀 Future Enhancements

- AI-powered wellness assistant
- Mood tracking and journaling
- Personalized wellness recommendations
- Progress dashboard
- Notifications and reminders
- Responsive mobile experience
- Professional mental wellness resource integration

---

## 👨‍💻 Author

**Sabyasachi Mishra**

Computer Science & Engineering | AI/ML | Full-Stack Development

[GitHub Profile](https://github.com/Sabyasachi100)

---

<p align="center">
  <i>Technology with purpose. Building for a healthier student experience. 🌱</i>
</p>
