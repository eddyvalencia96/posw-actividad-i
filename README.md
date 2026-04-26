# EcommerceAdmin

This administration panel serves as the central hub for managing core operations of the e-commerce platform. It provides comprehensive tools for managing the product catalog, overseeing user accounts, processing orders, and monitoring system metrics to ensure smooth daily operations.

## 🚀 Getting Started

### Prerequisites
Before running this project, ensure you have the following installed:
*   Node.js: Version 16.0.0 or higher
*   Angular CLI: Must be installed globally
*   XAMPP: With Apache and MySQL running

### Installation
To install dependencies, run:
```bash
npm install
```

## 🚀 Usage

### 🌐 Development Server + Backend
1. Start XAMPP (Apache + MySQL)
2. Import `backend/database.sql` in phpMyAdmin (`http://localhost/phpmyadmin`)
3. Start the frontend:
```bash
npm run dev
# or
ng serve
```
4. Open `http://localhost:4200/`

### 🌐 Frontend Pages
| Route | Description |
|-------|-------------|
| `/` | Dashboard (metrics) |
| `/products` | Product list |
| `/products/:id` | Product detail |
| `/users` | User list |
| `/orders` | Order list |

### 🏗️ Building
To build the project for deployment, run:
```bash
ng build
```

## 📚 Backend API Documentation

### Database Schema
The application uses MySQL with 3 tables:
- **products**: Product catalog (id, title, description, price, category, image, stock)
- **users**: Admin users (id, email, username, password, name_first, name_last, role, phone)
- **orders**: Customer orders (id, user_id, product_id, quantity, total_price, status)

### API Endpoints

#### Products (`/backend/api/products.php`)
| Method | Endpoint | Description | HTTP Code |
|-------|----------|------------|----------|
| GET | `/products.php` | List all products | 200 |
| GET | `/products.php?id=X` | Get product by ID | 200 / 404 |
| POST | `/products.php` | Create product | 201 |
| PUT | `/products.php?id=X` | Update product | 200 / 404 |
| DELETE | `/products.php?id=X` | Delete product | 200 / 404 |

#### Users (`/backend/api/users.php`)
| Method | Endpoint | Description | HTTP Code |
|-------|----------|------------|----------|
| GET | `/users.php` | List all users | 200 |
| GET | `/users.php?id=X` | Get user by ID | 200 / 404 |
| POST | `/users.php` | Create user | 201 |

#### Orders (`/backend/api/orders.php`)
| Method | Endpoint | Description | HTTP Code |
|-------|----------|------------|----------|
| GET | `/orders.php` | List all orders | 200 |
| GET | `/orders.php?id=X` | Get order by ID | 200 / 404 |
| POST | `/orders.php` | Create order | 201 |

#### SQL Queries
| Query | Endpoint | Description |
|-------|----------|------------|
| Sales by product | `/orders.php?query=sales` | Total revenue by product |
| Orders with details | `/orders.php?query=userOrders` | Orders with username and product name |
| Products summary | `/orders.php?query=products` | Products with sales count |

## 📊 Taller 2 Requirements Checklist

| Requirement | Status | Evidence |
|-------------|--------|----------|
| MySQL database with 3+ tables | ✅ | `backend/database.sql` |
| 3+ REST endpoints | ✅ | products.php, users.php, orders.php |
| 3+ SQL queries | ✅ | ?query=sales, userOrders, products |
| HTTP codes (201, 404, 500) | ✅ | Implemented in all endpoints |
| Connected frontend | ✅ | Angular → MySQL via PHP API |
| Git repository | ✅ | 2 commits (Edilberto + Nicoll) |

## 🛠️ Tech Stack
- **Frontend**: Angular 19 (Standalone + Signals)
- **Backend**: PHP 8 + PDO
- **Database**: MySQL (phpMyAdmin)
- **Server**: XAMPP (Apache)

## 👥 Team
- Edilberto Moreno Valencia
- Nicoll Dayann Aguirre Ussa