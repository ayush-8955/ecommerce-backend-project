# E-Commerce Backend System

A production-style E-Commerce backend built using Next.js API Routes and PostgreSQL.  
This project simulates the backend of an online shopping platform and focuses on database design, REST API development, transactional consistency, and automation using database triggers.

---

## Features

- User management (customers, admins)
- Product and category management
- Order placement with ACID-compliant transactions
- Automatic inventory management using PostgreSQL triggers
- Payment and review handling
- Fully tested REST APIs using Postman

---

## Tech Stack

- Backend: Next.js (App Router, API Routes)
- Database: PostgreSQL
- Database Client: pg
- API Style: REST
- Testing Tool: Postman
- Language: JavaScript

---

## System Overview

This project represents the backend logic of an e-commerce platform.

Typical flow:
1. Users are created
2. Admin adds categories and products
3. Users browse products
4. Users place orders (handled via transactions)
5. Inventory is automatically updated (via trigger)
6. Payments and reviews are recorded

---

## Database Design

The database follows Third Normal Form (3NF) and uses a custom schema.

Tables:
- users
- categories
- products
- orders
- order_items
- payments
- reviews

The order_items table is used to properly model one-to-many relationships between orders and products.

---

## Transactions (ACID)

Order placement is handled inside a PostgreSQL transaction to ensure:

- Atomicity: The order is fully placed or fully rolled back
- Consistency: The database remains in a valid state
- Isolation: Concurrent orders do not interfere with each other
- Durability: Data is permanently stored after commit

---

## Triggers

A PostgreSQL trigger automatically updates product stock after an order is placed.

Purpose:
- Prevents manual stock management
- Keeps business logic close to the database
- Ensures inventory consistency

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
- POST /api/orders (transactional)

### Payments
- GET /api/payments
- POST /api/payments

### Reviews
- GET /api/reviews
- POST /api/reviews

---

## API Testing

All APIs were tested using Postman with realistic request flows:
- User creation
- Product listing
- Order placement
- Stock update verification
- Payment and review insertion
