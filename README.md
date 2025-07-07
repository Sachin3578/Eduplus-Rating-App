
# 🏬 Store Rating System

This is a full-stack Store Rating System where **store owners can register their stores** and **users can rate and review** them. The platform displays average ratings and user-specific feedback for transparency and quality assurance.

---

## 📌 Features

### 👨‍💼 Store Owner
- Add a new store
- View all stores owned by the user
- See average ratings and reviews from customers

### 👤 User
- Browse all stores
- Search stores by name or address
- Submit or update your own rating for a store
- See your own rating alongside others

### 🔐 Auth System
- JWT-based authentication
- Role-based access control (User & Store Owner)

---

## 🛠️ Tech Stack

| Layer      | Technology                  |
|------------|-----------------------------|
| Frontend   | React.js, Material UI (MUI) |
| Backend    | Node.js, Express.js         |
| Database   | Sequelize ORM + PostgreSQL/MySQL |
| Auth       | JWT                         |

---

## 🗂 Folder Structure

```
store-rating-system/
│
├── backend/
│   ├── models/           # Sequelize models (User, Store, Rating)
│   ├── routes/           # Express routers
│   ├── controllers/      # Request handler logic
│   ├── middleware/       # JWT, Role-based auth
│   ├── config/           # Database setup
│   └── server.js         # App entry point
│
├── frontend/
│   ├── src/
│   │   ├── pages/        # StoreOwnerDashboard, UserDashboard, Login, etc.
│   │   ├── components/   # StoreCard, RatingList, etc.
│   │   ├── api/axios.js  # Axios instance with base URL
│   │   └── App.jsx
│   └── public/
│
└── README.md             # This file
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/store-rating-system.git
cd store-rating-system
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` directory:

```
PORT=5000
JWT_SECRET=your_jwt_secret
DB_HOST=localhost
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=store_rating_db
```

Then run the server:

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

Frontend runs at: `http://localhost:3000`

---

## 🌐 API Endpoints Overview

### Auth
- `POST /api/auth/login`
- `POST /api/auth/register`

### Store Owner
- `GET /api/store-owner/dashboard`
- `POST /api/stores`

### User
- `GET /api/user/stores`
- `POST /api/user/submit-rating`

---

## 🧪 Sample Credentials

### Store Owner

```
Email: owner@example.com
Password: 123456
```

### User

```
Email: user@example.com
Password: 123456
```

---


## 👨‍💻 Author

**Sachin Gornar**  
🔧 Full Stack Developer | MERN | Django | JAVA | AI  
📫 Email: sachin@example.com  
🔗 LinkedIn: [linkedin.com/in/sachingornar](https://www.linkedin.com/in/sachin-gornar-b9ab1b25b/)

---

## 📃 License

This project is licensed under the MIT License. Feel free to fork, customize, and deploy!

---

## ⭐️ Feedback / Contribution

Have feedback? Found a bug?  
Please open an issue or pull request — contributions are welcome!
