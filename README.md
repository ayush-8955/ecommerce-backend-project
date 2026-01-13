# E-Commerce Backend System

This project is a backend system for an e-commerce application built using
Next.js API Routes and PostgreSQL. It focuses on database design and REST API
development.

---

## Features

- User, product, and category management
- Order, payment, and review handling
- Automatic stock updates using PostgreSQL triggers
- REST APIs tested using Postman

---

## Tech Stack

- Backend: Next.js (API Routes)
- Database: PostgreSQL
- Database Client: pg
- API Style: REST
- Language: JavaScript

---

## Database Design

The database is normalized (3NF) and includes the following tables:

- users  
- categories  
- products  
- orders  
- order_items  
- payments  
- reviews  

The `order_items` table is used to link orders with products.

---

## API Endpoints

### Users
- GET /api/users  
- POST /api/users  

### Categories
- GET /api/categories  
- POST /api/categories  

### Products
- GET /api/products  
- POST /api/products  

### Orders
- GET /api/orders  
- POST /api/orders  

### Payments
- GET /api/payments  
- POST /api/payments  

### Reviews
- GET /api/reviews  
- POST /api/reviews  

---

## API Testing

All endpoints were tested using Postman with real request flows such as
creating users, placing orders, and recording payments and reviews.
