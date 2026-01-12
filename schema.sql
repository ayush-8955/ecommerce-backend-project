-- E-Commerce Database Schema

CREATE SCHEMA IF NOT EXISTS ecommerce;

-- USERS
CREATE TABLE ecommerce.users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    role VARCHAR(20) CHECK (role IN ('customer', 'seller', 'admin')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CATEGORIES
CREATE TABLE ecommerce.categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE
);

-- PRODUCTS
CREATE TABLE ecommerce.products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(10,2) CHECK (price > 0),
    stock INTEGER CHECK (stock >= 0),
    category_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_products_category
        FOREIGN KEY (category_id)
        REFERENCES ecommerce.categories(category_id)
);

-- CARTS
CREATE TABLE ecommerce.carts (
    cart_id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_carts_user
        FOREIGN KEY (user_id)
        REFERENCES ecommerce.users(user_id)
        ON DELETE CASCADE
);

-- CART ITEMS
CREATE TABLE ecommerce.cart_items (
    cart_item_id SERIAL PRIMARY KEY,
    cart_id INTEGER,
    product_id INTEGER,
    quantity INTEGER CHECK (quantity > 0),
    CONSTRAINT fk_cart_items_cart
        FOREIGN KEY (cart_id)
        REFERENCES ecommerce.carts(cart_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_cart_items_product
        FOREIGN KEY (product_id)
        REFERENCES ecommerce.products(product_id)
);

-- ORDERS
CREATE TABLE ecommerce.orders (
    order_id SERIAL PRIMARY KEY,
    user_id INTEGER,
    total_amount NUMERIC(10,2) CHECK (total_amount >= 0),
    status VARCHAR(20)
        CHECK (status IN ('placed', 'shipped', 'delivered', 'cancelled')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_orders_user
        FOREIGN KEY (user_id)
        REFERENCES ecommerce.users(user_id)
);

-- ORDER ITEMS
CREATE TABLE ecommerce.order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER CHECK (quantity > 0),
    price NUMERIC(10,2) CHECK (price > 0),
    CONSTRAINT fk_order_items_order
        FOREIGN KEY (order_id)
        REFERENCES ecommerce.orders(order_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_order_items_product
        FOREIGN KEY (product_id)
        REFERENCES ecommerce.products(product_id)
);

-- PAYMENTS
CREATE TABLE ecommerce.payments (
    payment_id SERIAL PRIMARY KEY,
    order_id INTEGER,
    payment_method VARCHAR(30),
    payment_status VARCHAR(20)
        CHECK (payment_status IN ('success', 'failed', 'pending')),
    paid_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_payments_order
        FOREIGN KEY (order_id)
        REFERENCES ecommerce.orders(order_id)
);

-- REVIEWS
CREATE TABLE ecommerce.reviews (
    review_id SERIAL PRIMARY KEY,
    user_id INTEGER,
    product_id INTEGER,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    CONSTRAINT reviews_user_product_unique UNIQUE (user_id, product_id),
    CONSTRAINT fk_reviews_user
        FOREIGN KEY (user_id)
        REFERENCES ecommerce.users(user_id),
    CONSTRAINT fk_reviews_product
        FOREIGN KEY (product_id)
        REFERENCES ecommerce.products(product_id)
);