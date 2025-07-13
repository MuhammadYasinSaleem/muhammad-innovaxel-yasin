# URL Shortener API 🚀

A simple and powerful Node.js + Express API for generating, retrieving, updating, and deleting short URLs — built as part of Innovaxel ASE assignment.

---

## 🔧 Tech Stack

- **Backend**: Express.js (ESM)
- **Database**: MongoDB (Mongoose)
- **Testing**: Jest + Supertest
- **Frontend**: Next.js + Tailwind CSS
- **Dev Tools**: dotenv, nanoid, cors

---

## 📦 Features

- ✅ Shorten long URLs using random `shortCode`
- ✅ Retrieve original URL via `GET /shorten/:shortCode`
- ✅ Update URL by shortCode
- ✅ Track and view access statistics
- ✅ Delete a short URL
- ✅ Fully tested with Jest & Supertest

---

## 🚀 API Endpoints

| Method | Endpoint                      | Description                  |
|--------|-------------------------------|------------------------------|
| POST   | `/shorten`                    | Create a new short URL       |
| GET    | `/shorten/:shortCode`         | Retrieve original URL        |
| PUT    | `/shorten/:shortCode`         | Update the original URL      |
| DELETE | `/shorten/:shortCode`         | Delete the short URL         |
| GET    | `/shorten/:shortCode/stats`   | View analytics & access count |

---

## 📁 Folder Structure

├── src
│ ├── config/ # MongoDB connection
│ ├── controllers/ # Route logic for shorten, update, delete
│ ├── middleware/ # Input validation (e.g., URL format)
│ ├── models/ # Mongoose schema for URL
│ ├── routes/ # Express API route definitions
│ ├── utils/ # Short code generator using nanoid
│ ├── tests/ # Test cases (Jest + Supertest)
│ └── app.js # Entry point of the backend
├── .env # Environment variables (not committed)
├── package.json # Project dependencies and scripts

# ⚙️ Setup Instructions (from Dev Branch)

To run this project locally, clone the repository and switch to the `dev` branch, which contains the full backend implementation.

---

### 📁 1. Clone the Repository

```bash
git clone https://github.com/MuhammadYasinSaleem/muhammad-innovaxel-yasin.git
cd muhammad-innovaxel-yasin
```
### Switch to the dev branch

```bash
git checkout dev
```
### Install Dependencies

```bash
npm install
```
### 🔐 Create a .env File

Inside the root directory, create a .env file and add the following:

PORT=3000
MONGO_URI=your_mongodb_connection_string

## ▶️ Run the Server
```bash
node --watch src/app.js
```
## 🧪 Run Tests

```bash
npm test
```
