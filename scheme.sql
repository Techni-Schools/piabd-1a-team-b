-- CREATE DATABASE sklep;
-- USE sklep;
-- GO

CREATE TABLE category (
    id INT PRIMARY KEY IDENTITY(1, 1),
    category_name VARCHAR(50) UNIQUE NOT NULL
)

CREATE TABLE users (
    id INT PRIMARY KEY IDENTITY(1, 1),
    username VARCHAR(20) UNIQUE NOT NULL,
    [password] VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    date_of_birth DATE NOT NULL,
    phone_number VARCHAR(12) UNIQUE NOT NULL,
    street VARCHAR(50) NOT NULL,
    [state] VARCHAR(50) NOT NULL,
    zip_code VARCHAR(10) NOT NULL,
    country VARCHAR(50) NOT NULL
)

CREATE TABLE products (
    id INT PRIMARY KEY IDENTITY(1, 1),
    [name] VARCHAR(50) NOT NULL,
    [image] VARCHAR(40) UNIQUE NOT NULL,
    category INT,
    price DECIMAL(10, 2) NOT NULL,
    discount INT DEFAULT(0) NOT NULL,
    quantity INT DEFAULT(1) NOT NULL,
    [user] INT NOT NULL,
    CONSTRAINT fk_category FOREIGN KEY (category) REFERENCES category(id),
    CONSTRAINT fk_user FOREIGN KEY ([user]) REFERENCES users(id)
)

CREATE TABLE chat (
    id INT PRIMARY KEY IDENTITY(1, 1),
    sender INT,
    receiver INT,
    [message] VARCHAR(100) NOT NULL,
    CONSTRAINT fk_sender FOREIGN KEY (sender) REFERENCES users(id),
    CONSTRAINT fk_receiver FOREIGN KEY (receiver) REFERENCES users(id)
)

CREATE TABLE orders (
    id INT PRIMARY KEY IDENTITY(1, 1),
    product INT,
    [user] INT,
    order_status VARCHAR(50) NOT NULL,
    order_date DATE NOT NULL,
    required_date DATE,
    shipped_Date DATE,
    payment_method VARCHAR(50) NOT NULL
)
