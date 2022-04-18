CREATE DATABASE sklep;
USE sklep;
GO

-- missing on ERD
CREATE TABLE category (
    id INT IDENTITY(1, 1),
    category_name VARCHAR(50) UNIQUE NOT NULL,
    CONSTRAINT pk_ct_id PRIMARY KEY (id),
    -- use named CONSTRAINT
)

CREATE TABLE users (
    id INT IDENTITY(1, 1),
    username VARCHAR(20) UNIQUE NOT NULL,
    [password] VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL CHECK(email like '%@%.%'),
    -- add CHECK 
    date_of_birth DATE NOT NULL CHECK(DATEDIFF(second, date_of_birth, GETDATE()) > 0),
    -- add CHECK for past dates
    phone_number VARCHAR(12) UNIQUE NOT NULL,
    street VARCHAR(50) NOT NULL,
    [state] VARCHAR(50) NOT NULL,
    zip_code VARCHAR(10) NOT NULL,
    country VARCHAR(50) NOT NULL,
    CONSTRAINT pk_u_id PRIMARY KEY (id)
    -- add named CONSTRAINT
)

CREATE TABLE products (
    id INT IDENTITY(1, 1),
    [name] VARCHAR(50) NOT NULL,
    [image] VARCHAR(40) UNIQUE NOT NULL,
    category INT,
    price DECIMAL(10, 2) NOT NULL,
    discount INT DEFAULT(0) NOT NULL,
    quantity INT DEFAULT(1) NOT NULL,
    [user] INT NOT NULL,
    CONSTRAINT fk_category FOREIGN KEY (category) REFERENCES category(id),
    CONSTRAINT fk_user FOREIGN KEY ([user]) REFERENCES users(id),
    CONSTRAINT pk_p_id PRIMARY KEY (id)
    -- add named CONSTRAINT for PK
)

CREATE TABLE chat (
    id INT IDENTITY(1, 1),
    sender INT,
    receiver INT,
    [message] VARCHAR(100) NOT NULL,
    CONSTRAINT fk_sender FOREIGN KEY (sender) REFERENCES users(id),
    CONSTRAINT fk_receiver FOREIGN KEY (receiver) REFERENCES users(id),
    CONSTRAINT pk_c_id PRIMARY KEY (id)
    -- add named CONSTRAINT for PK
)

CREATE TABLE orders (
    id INT IDENTITY(1, 1),
    product INT,
    [user] INT,
    order_status VARCHAR(50) NOT NULL CHECK(order_status = 'W drodze' OR order_status = 'Juz jest'),
    -- CHECK with predefined values 
    order_date DATE NOT NULL DEFAULT(GETDATE()),
    -- DEFAULT with GETDATE()
    required_date DATE,
    shipped_Date DATE,
    payment_method VARCHAR(50) NOT NULL,
     -- add named CONSTRAINT for PK
    -- missing FK to user and product
    CONSTRAINT pk_o_id PRIMARY KEY (id),
    CONSTRAINT fk_o_user FOREIGN KEY ([user]) REFERENCES users(id),
    CONSTRAINT fk_p_user FOREIGN KEY (product) REFERENCES products(id)
)
