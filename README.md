# Karim Premium Watches – E-commerce Site

Node.js + Express + MongoDB backend, vanilla JS frontend, Nodemailer welcome emails.

## Setup

```bash
npm install
cp .env.example .env     # then fill in your values
npm run seed             # loads watch data into MongoDB
npm run dev              # http://localhost:5000
```

## Environment variables

| Name | Description |
|------|-------------|
| PORT | Server port (default 5000) |
| MONGO_URI | MongoDB Atlas connection string |
| JWT_SECRET | Long random string |
| EMAIL_USER | Gmail address used to send emails |
| EMAIL_PASS | 16-character Gmail App Password |
| STORE_NAME | Shown in email subject/sender |

## API

- `POST /api/auth/register` – `{ name, email, password }` → creates user, sends welcome email
- `POST /api/auth/login` – `{ email, password }`
- `GET /api/products?search=` – list watches
- `GET /api/products/:id` – single watch
- `GET /api/health`

## Milestones

1. Backend + MongoDB (User and Product models)
2. Frontend fetching products from the API (seeded from DummyJSON)
3. Automated welcome email via Nodemailer on registration
