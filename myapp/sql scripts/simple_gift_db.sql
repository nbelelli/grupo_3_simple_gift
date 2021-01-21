CREATE SCHEMA simple_gift;

USE simple_gift;

CREATE TABLE users (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone INT,
    address VARCHAR(255),
    avatar VARCHAR(255) NOT NULL,
    rol INT NOT NULL DEFAULT 10,
    
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de alta
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de modificación
    deleted_at DATETIME -- Fecha de borrado del registro completo
);

CREATE TABLE products (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
    price DECIMAL UNSIGNED NOT NULL,
    description TEXT,
    discount INT UNSIGNED DEFAULT 0,
    image VARCHAR(255) NOT NULL,
    best_seller INT DEFAULT 0,
    stock INT NOT NULL DEFAULT 0,
    category_id INT UNSIGNED,
    
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de alta
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de modificación
    deleted_at DATETIME -- Fecha de borrado del registro completo
);

CREATE TABLE categories (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,

	created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de alta
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de modificación
    deleted_at DATETIME -- Fecha de borrado del registro completo
);

ALTER TABLE products
ADD FOREIGN KEY (category_id) REFERENCES categories(id);

CREATE TABLE images (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	file_name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    product_id INT UNSIGNED,
    FOREIGN KEY (product_id) REFERENCES products(id),

	created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de alta
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de modificación
    deleted_at DATETIME -- Fecha de borrado del registro completo
);