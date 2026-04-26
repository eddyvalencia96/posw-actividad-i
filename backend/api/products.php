<?php
/**
 * Products API - REST Endpoints
 * 
 * GET    /api/products.php         - List all products (200)
 * GET    /api/products.php?id=1  - Get product by ID (200 / 404)
 * POST   /api/products.php         - Create product (201)
 * PUT    /api/products.php?id=1     - Update product (200 / 404)
 * DELETE /api/products.php?id=1  - Delete product (200 / 404)
 */

header('Content-Type: application/json');
require_once __DIR__ . '/../db.php';

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

// Handle query string id
$id = isset($_GET['id']) ? (int)$_GET['id'] : null;

try {
    $db = getDB();
    
    switch ($method) {
        case 'GET':
            if ($id) {
                // GET /products/:id - Get single product
                $stmt = $db->prepare('SELECT * FROM products WHERE id = ?');
                $stmt->execute([$id]);
                $product = $stmt->fetch();
                
                if (!$product) {
                    http_response_code(404);
                    echo json_encode(['error' => 'Product not found']);
                    exit;
                }
                
                http_response_code(200);
                echo json_encode($product);
            } else {
                // GET /products - List all
                $stmt = $db->query('SELECT * FROM products ORDER BY id');
                $products = $stmt->fetchAll();
                
                http_response_code(200);
                echo json_encode($products);
            }
            break;
            
        case 'POST':
            // POST /products - Create new product
            if (!isset($input['title'], $input['price'], $input['category'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing required fields: title, price, category']);
                exit;
            }
            
            $stmt = $db->prepare('
                INSERT INTO products (title, description, price, category, image, stock)
                VALUES (?, ?, ?, ?, ?, ?)
            ');
            
            $stmt->execute([
                $input['title'],
                $input['description'] ?? '',
                $input['price'],
                $input['category'],
                $input['image'] ?? '',
                $input['stock'] ?? 0
            ]);
            
            $newId = $db->lastInsertId();
            
            // Fetch created product
            $stmt = $db->prepare('SELECT * FROM products WHERE id = ?');
            $stmt->execute([$newId]);
            $product = $stmt->fetch();
            
            http_response_code(201);
            echo json_encode($product);
            break;
            
        case 'PUT':
            // PUT /products/:id - Update product
            if (!$id) {
                http_response_code(400);
                echo json_encode(['error' => 'Product ID required']);
                exit;
            }
            
            // Check if product exists
            $stmt = $db->prepare('SELECT id FROM products WHERE id = ?');
            $stmt->execute([$id]);
            if (!$stmt->fetch()) {
                http_response_code(404);
                echo json_encode(['error' => 'Product not found']);
                exit;
            }
            
            // Build dynamic update query
            $fields = [];
            $values = [];
            
            if (isset($input['title'])) {
                $fields[] = 'title = ?';
                $values[] = $input['title'];
            }
            if (isset($input['description'])) {
                $fields[] = 'description = ?';
                $values[] = $input['description'];
            }
            if (isset($input['price'])) {
                $fields[] = 'price = ?';
                $values[] = $input['price'];
            }
            if (isset($input['category'])) {
                $fields[] = 'category = ?';
                $values[] = $input['category'];
            }
            if (isset($input['image'])) {
                $fields[] = 'image = ?';
                $values[] = $input['image'];
            }
            if (isset($input['stock'])) {
                $fields[] = 'stock = ?';
                $values[] = $input['stock'];
            }
            
            if (empty($fields)) {
                http_response_code(400);
                echo json_encode(['error' => 'No fields to update']);
                exit;
            }
            
            $values[] = $id;
            $sql = 'UPDATE products SET ' . implode(', ', $fields) . ' WHERE id = ?';
            
            $stmt = $db->prepare($sql);
            $stmt->execute($values);
            
            // Fetch updated product
            $stmt = $db->prepare('SELECT * FROM products WHERE id = ?');
            $stmt->execute([$id]);
            $product = $stmt->fetch();
            
            http_response_code(200);
            echo json_encode($product);
            break;
            
        case 'DELETE':
            // DELETE /products/:id - Delete product
            if (!$id) {
                http_response_code(400);
                echo json_encode(['error' => 'Product ID required']);
                exit;
            }
            
            // Check if product exists
            $stmt = $db->prepare('SELECT id FROM products WHERE id = ?');
            $stmt->execute([$id]);
            if (!$stmt->fetch()) {
                http_response_code(404);
                echo json_encode(['error' => 'Product not found']);
                exit;
            }
            
            $stmt = $db->prepare('DELETE FROM products WHERE id = ?');
            $stmt->execute([$id]);
            
            http_response_code(200);
            echo json_encode(['message' => 'Product deleted successfully', 'id' => $id]);
            break;
            
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Internal server error', 'message' => $e->getMessage()]);
}