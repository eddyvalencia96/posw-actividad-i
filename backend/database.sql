-- Ecommerce Admin Database Schema
-- Taller 2 - Desarrollo de servicio REST con MySQL

-- Crear base de datos
CREATE DATABASE IF NOT EXISTS ecommerce_admin;
USE ecommerce_admin;

-- ============================================
-- Tabla 1: products (catálogo de productos)
-- ============================================
DROP TABLE IF EXISTS products;
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    image VARCHAR(500),
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insertar datos de prueba - products
INSERT INTO products (title, description, price, category, image, stock) VALUES
('Running Shoes', 'Comfortable running shoes for daily training', 59.99, 'sports', 'https://via.placeholder.com/300x300?text=Shoes', 50),
('Wireless Headphones', 'Wireless headphones with noise reduction', 89.50, 'electronics', 'https://via.placeholder.com/300x300?text=Headphones', 30),
('Denim Jacket', 'Classic fit denim jacket for all seasons', 74.00, 'fashion', 'https://via.placeholder.com/300x300?text=Jacket', 25),
('Smartwatch', 'Track activity and notifications in real time', 129.99, 'electronics', 'https://via.placeholder.com/300x300?text=Smartwatch', 40),
('Office Chair', 'Ergonomic office chair with lumbar support', 149.99, 'home', 'https://via.placeholder.com/300x300?text=Chair', 15),
('Reusable Bottle', 'Insulated bottle to keep drinks cold and hot', 19.90, 'home', 'https://via.placeholder.com/300x300?text=Bottle', 100);

-- ============================================
-- Tabla 2: users (usuarios administrativos)
-- ============================================
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name_first VARCHAR(100) NOT NULL,
    name_last VARCHAR(100) NOT NULL,
    role ENUM('admin', 'manager', 'operator') DEFAULT 'operator',
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insertar datos de prueba - users
INSERT INTO users (email, username, password, name_first, name_last, role, phone) VALUES
('alice.admin@example.com', 'alice-admin', 'admin123', 'Alice', 'Garcia', 'admin', '555-1101'),
('bruno.manager@example.com', 'bruno-manager', 'admin123', 'Bruno', 'Lopez', 'manager', '555-1102'),
('carla.ops@example.com', 'carla-ops', 'admin123', 'Carla', 'Torres', 'operator', '555-1103');

-- ============================================
-- Tabla 3: orders (pedidos de clientes)
-- ============================================
DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    total_price DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'processing', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insertar datos de prueba - orders
INSERT INTO orders (user_id, product_id, quantity, total_price, status) VALUES
(1, 1, 2, 119.98, 'completed'),
(2, 4, 1, 129.99, 'processing'),
(3, 3, 1, 74.00, 'pending'),
(1, 2, 1, 89.50, 'completed'),
(2, 5, 1, 149.99, 'cancelled');