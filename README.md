# ⌚ Karim Premium Watches – E-commerce Website

A responsive, dynamic e-commerce website built for **Mr. Karim's premium watch business**. Customers can browse the watch catalog, search products, create an account, and automatically receive a personalized welcome email after registration.

## 🔗 Live Demo

**👉 https://karim-watch-store.onrender.com/

> Replace the link above with your deployed URL (Render / Railway / etc.).

---

## ✨ Features

- 🛒 Dynamic product catalog fetched from the backend API
- 🔍 Live product search
- 👤 User registration and login (JWT authentication)
- 🔐 Passwords securely hashed with bcrypt
- 📧 Automated personalized welcome email on registration (Nodemailer + Gmail)
- 📱 Fully responsive design (mobile + desktop)

## 🧰 Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Node.js, Express |
| Database | MongoDB Atlas, Mongoose |
| Auth | JSON Web Token, bcryptjs |
| Email | Nodemailer (Gmail App Password) |
| Frontend | HTML, CSS, Vanilla JavaScript |
| Mock Data | DummyJSON API (seeded into MongoDB) |

---

## ✅ Project Milestones

### Milestone 1 – Backend Setup & Database Connection (35 pts)
- Node.js + Express server initialized
- Connected to MongoDB Atlas using Mongoose
- `User` and `Product` models created to store user profiles and product inventory

### Milestone 2 – API Fetching & Dynamic Product Display (35 pts)
- Frontend interface connected to backend REST APIs
- Watches fetched dynamically and displayed with image, details and price
- Initial catalog populated from a free mock e-commerce API (DummyJSON) via a seed script

### Milestone 3 – Automated User Welcome Emails (30 pts)
- Nodemailer integrated with Gmail
- When a new customer registers, a personalized welcome and confirmation email is sent immediately

---

## 📁 Project Structure

```
watch-store/
├── models/
│   ├── User.js
│   └── Product.js
├── routes/
│   ├── auth.js
│   └── products.js
├── utils/
│   └── mailer.js
├── public/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── seed.js
├── server.js
├── package.json
└── .env.example
```

## 🚀 Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
cd YOUR-REPO-NAME

# 2. Install dependencies
npm install

# 3. Create the environment file
cp .env.example .env     # on Windows: copy .env.example .env
# then fill in your own values

# 4. Seed the database with watches
npm run seed

# 5. Start the server
npm run dev
```

Open **http://localhost:5000** in your browser.

## 🔑 Environment Variables

Create a `.env` file in the project root:

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default 5000) |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Long random secret string |
| `EMAIL_USER` | Gmail address used to send emails |
| `EMAIL_PASS` | 16-character Gmail App Password |
| `STORE_NAME` | Store name shown in emails |

> ⚠️ Never commit your real `.env` file. It is already listed in `.gitignore`.

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user and send welcome email |
| POST | `/api/auth/login` | Log in and receive a JWT |
| GET | `/api/products` | Get all watches (supports `?search=`) |
| GET | `/api/products/:id` | Get a single watch |
| GET | `/api/health` | Server health check |

## ☁️ Deployment (Render)

1. Push the code to GitHub
2. On Render.com → **New → Web Service** → connect the repository
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Add all the environment variables from your `.env` under **Environment**
6. In MongoDB Atlas → Network Access, allow `0.0.0.0/0`
7. Deploy and copy the live URL into the **Live Demo** section above

---

## 👩‍💻 Author

**YOUR NAME** Afroza Akter Mukta
GitHub: mukta3001073
