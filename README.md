# 🏠 WanderLust

> A full-stack accommodation listing platform inspired by modern vacation-rental applications.
[![Node.js](https://img.shields.io/badge/Node.js-23.3.0-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-5.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![EJS](https://img.shields.io/badge/EJS-Templating-B4CA65?style=for-the-badge)](https://ejs.co/)

## 📌 Overview

**WanderLust** is a full-stack web application for discovering, creating, editing, and managing accommodation listings.

The project demonstrates a complete server-rendered web application architecture using **Node.js, Express.js, MongoDB, Mongoose, EJS, authentication, authorization, reviews, image uploads, validation, and session management**.

The application is designed with an MVC-style structure to keep routes, controllers, models, middleware, and views organized and maintainable.

---

## ✨ Features

- 🔎 Browse accommodation listings
- 🏷️ Filter listings by categories
- 🔐 User signup, login, and logout
- 👤 Authentication using Passport
- 🛡️ Owner-based authorization
- ➕ Create new listings
- ✏️ Edit existing listings
- 🗑️ Delete listings
- ⭐ Add reviews and ratings
- ⭐ 1–5 rating system
- 🖼️ Upload listing images
- ☁️ Store images using Cloudinary
- 📍 Store listing locations and GeoJSON coordinates
- ✅ Server-side validation using Joi
- 💬 Flash messages for user feedback
- 🗄️ MongoDB-backed sessions using Connect-Mongo
- 📱 Responsive server-rendered interface
- ⚠️ Custom error handling

---

## 🧠 Application Architecture

```text
                         ┌─────────────────┐
                         │     Browser     │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │   Express.js    │
                         │     Routes     │
                         └────────┬────────┘
                                  │
                ┌─────────────────┼─────────────────┐
                ▼                 ▼                 ▼
        ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
        │ Authentication│  │ Validation   │  │  Middleware  │
        │   Passport    │  │     Joi      │  │ Authorization│
        └──────────────┘  └──────────────┘  └──────────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │   Controllers   │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │    Mongoose     │
                         │     Models      │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │     MongoDB     │
                         └─────────────────┘

                         Image Upload Flow
                                  │
                                  ▼
                            ┌───────────┐
                            │  Multer   │
                            └─────┬─────┘
                                  │
                                  ▼
                            ┌───────────┐
                            │ Cloudinary│
                            └───────────┘
```

---

## 🛠️ Tech Stack

### Frontend

- HTML
- CSS
- JavaScript
- EJS
- EJS-Mate

### Backend

- Node.js
- Express.js
- Express Session
- Method Override

### Database

- MongoDB
- Mongoose
- Connect-Mongo

### Authentication & Security

- Passport
- Passport Local
- Passport Local Mongoose
- Joi validation
- Custom authorization middleware
- Session-based authentication

### Image & Application Services

- Cloudinary
- Multer
- Multer Storage Cloudinary
- dotenv
- connect-flash

---

## 📂 Project Structure

```text
WanderLust/
│
├── controllers/
│   └── Application/business logic
│
├── init/
│   └── Database initialization
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── public/
│   ├── CSS/
│   └── js/
│
├── routes/
│   ├── listings.js
│   ├── review.js
│   └── user.js
│
├── scripts/
│   └── Utility scripts
│
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
│
├── views/
│   └── EJS templates
│
├── app.js
├── cloudConfig.js
├── middleware.js
├── schema.js
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/6387anu/WanderLust.git
cd WanderLust
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

> ⚠️ Never commit your real credentials, API keys, database URLs, or secrets to GitHub.

### 4. Start the application

```bash
node app.js
```

The application will run locally at:

```text
http://localhost:8080
```

---

## 🔐 Authentication & Authorization

WanderLust uses **Passport Local** for user authentication.

Protected operations require the user to be logged in.

Listing modification operations additionally verify that the authenticated user is the **owner of the listing**.

This provides a middleware-based authorization system for protecting application resources.

---

## 🖼️ Image Upload System

Listing images are uploaded using **Multer** and stored using **Cloudinary Storage**.

```text
User
 │
 ▼
Listing Form
 │
 ▼
Multer
 │
 ▼
Cloudinary
 │
 ▼
Image URL
 │
 ▼
MongoDB Listing Document
```

Cloudinary credentials are stored using environment variables rather than being hard-coded into the application.

---

## 🗄️ Database Models

The application currently uses three primary MongoDB models.

### User

```text
User
 ├── Username
 ├── Password
 └── Email
```

### Listing

```text
Listing
 ├── Title
 ├── Description
 ├── Price
 ├── Location
 ├── Country
 ├── Image
 ├── Category
 ├── GeoJSON Geometry
 ├── Owner
 └── Reviews
```

### Review

```text
Review
 ├── Rating
 ├── Comment
 ├── Author
 └── Created At
```

---

## 🔄 Core Application Flow

### Creating a Listing

```text
User Login
    ↓
Create Listing
    ↓
Joi Validation
    ↓
Multer Image Upload
    ↓
Cloudinary
    ↓
MongoDB
    ↓
Listing Created
```

### Editing a Listing

```text
User Login
    ↓
Check Listing Ownership
    ↓
Update Listing
    ↓
Validate Data
    ↓
Update MongoDB
```

### Adding a Review

```text
User Login
    ↓
Submit Review
    ↓
Validate Rating & Comment
    ↓
Save Review
    ↓
Associate Review with Listing
```

---

## 🎯 Key Learning Outcomes

Through this project, I practiced:

- Building RESTful routes with Express.js
- MVC-style application architecture
- MongoDB database design
- Mongoose schemas and relationships
- User authentication with Passport
- Authorization using middleware
- Session management
- File uploads with Multer
- Cloudinary integration
- Server-side validation with Joi
- Flash messages
- Error handling
- EJS server-side rendering
- GeoJSON-based location data
- Organizing a production-style Node.js application

---

## 🔮 Future Improvements

Planned improvements include:

- 📅 Booking and reservation system
- 🔍 Advanced search and sorting
- 📍 Improved location-based discovery
- 🗺️ Interactive maps
- 💳 Online payment integration
- 🧪 Automated testing
- 🔒 Additional security improvements
- ⚡ Performance optimization
- 🚀 CI/CD using GitHub Actions
- 📊 Admin dashboard
- ⭐ Improved recommendation system


## 👨‍💻 Author

### Anurag Mishra

Computer Science Engineering Student  
Full-Stack Web Developer | Software Developer in the Making


<div align="center">

## 🏠 WanderLust

**Explore • Discover • Stay**

Built with ❤️ using Node.js, Express.js, MongoDB & EJS.

</div>
