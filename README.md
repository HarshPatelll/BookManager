#  Personal Book Manager

A full-stack **Personal Book Manager** built using the **MERN stack with Next.js**.
It allows users to securely manage their personal reading collection, track reading progress, and organize books using tags and reading status.

---

##  Features

###  Authentication

* User Signup
* User Login
* JWT-based authentication
* Protected API routes

###  Book Management

Users can:

* Add books to their collection
* Edit book details
* Delete books
* Tag books
* Update reading status

###  Dashboard

The dashboard provides quick insights:

* Total books in collection
* 📖 Want to Read
* 📘 Currently Reading
* ✅ Completed books


##  Tech Stack

### Frontend

* **Next.js (App Router)**
* **React**
* **Tailwind CSS**

### Backend

* **Next.js API Routes**
* **Node.js**
* **JWT Authentication**

### Database

* **MongoDB Atlas**
* **Mongoose**




##  Environment Variables

Create a file named **`.env.local`** in the root directory.

Example:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

##  Running the Project Locally

###  Clone the repository

```
git clone https://github.com/YOUR_USERNAME/personal-book-manager.git
```

###  Navigate to the project

```
cd personal-book-manager
```

###  Install dependencies

```
npm install
```

###  Start the development server

```
npm run dev
```

The application will run at:

```
http://localhost:3000
```


