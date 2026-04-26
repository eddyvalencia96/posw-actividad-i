<?php
/**
 * Orders API - REST Endpoints
 * 
 * GET    /api/orders.php       - List all orders (200)
 * GET    /api/orders.php?id=1 - Get order by ID (200 / 404)
 * POST   /api/orders.php       - Create order (201)
 * 
 * SQL Queries (bonus):
 * GET /api/orders.php?query=sales     - Total sales by product
 * GET /api/orders.php?query=userOrders - Orders by user with details
 * GET /api/orders.php?query=products  - Products with sales summary
 */

header('Content-Type: application/json');
require_once __DIR__ . '/../db.php';

$method = $_SERVER['REQUEST_METHOD'];
$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);
if (!is_array($input)) {
    $input = [];
}

$id = isset($_GET['id']) ? (int)$_GET['id'] : null;
$queryType = isset($_GET['query']) ? $_GET['query'] : null;

try {
    $db = getDB();
    
    switch ($method) {
        case 'GET':
            if ($queryType === 'sales') {
                $stmt = $db->query('
                    SELECT p.title, SUM(o.quantity) as total_sold, SUM(o.total_price) as revenue 
                    FROM orders o 
                    JOIN products p ON o.product_id = p.id 
                    WHERE o.status = "completed" 
                    GROUP BY p.id 
                    ORDER BY revenue DESC
                ');
                $results = $stmt->fetchAll();
                http_response_code(200);
                echo json_encode($results);
                exit;
            }
            
            if ($queryType === 'userOrders') {
                $userId = isset($_GET['user_id']) ? (int)$_GET['user_id'] : null;
                if (!$userId) {
                    $stmt = $db->query('
                        SELECT o.*, u.username, p.title as product_name 
                        FROM orders o 
                        JOIN users u ON o.user_id = u.id 
                        JOIN products p ON o.product_id = p.id 
                        ORDER BY o.created_at DESC
                    ');
                } else {
                    $stmt = $db->prepare('
                        SELECT o.*, u.username, p.title as product_name 
                        FROM orders o 
                        JOIN users u ON o.user_id = u.id 
                        JOIN products p ON o.product_id = p.id 
                        WHERE o.user_id = ? 
                        ORDER BY o.created_at DESC
                    ');
                    $stmt->execute([$userId]);
                    $results = $stmt->fetchAll();
                    http_response_code(200);
                    echo json_encode($results);
                    exit;
                }
                $results = $stmt->fetchAll();
                http_response_code(200);
                echo json_encode($results);
                exit;
            }
            
            if ($queryType === 'products') {
                $stmt = $db->query('
                    SELECT p.id, p.title, p.category, 
                           COALESCE(SUM(o.quantity), 0) as total_sold,
                           COALESCE(SUM(o.total_price), 0) as revenue
                    FROM products p
                    LEFT JOIN orders o ON p.id = o.product_id AND o.status = "completed"
                    GROUP BY p.id
                    ORDER BY total_sold DESC
                ');
                $results = $stmt->fetchAll();
                http_response_code(200);
                echo json_encode($results);
                exit;
            }
            
            if ($id) {
                $stmt = $db->prepare('SELECT * FROM orders WHERE id = ?');
                $stmt->execute([$id]);
                $order = $stmt->fetch();
                
                if (!$order) {
                    http_response_code(404);
                    echo json_encode(['error' => 'Order not found']);
                    exit;
                }
                
                http_response_code(200);
                echo json_encode($order);
            } else {
                $stmt = $db->query('SELECT * FROM orders ORDER BY id');
                $orders = $stmt->fetchAll();
                
                http_response_code(200);
                echo json_encode($orders);
            }
            break;
            
        case 'POST':
            if (!isset($input['user_id'], $input['product_id'], $input['quantity'], $input['total_price'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing required fields: user_id, product_id, quantity, total_price']);
                exit;
            }
            
            $stmt = $db->prepare('
                INSERT INTO orders (user_id, product_id, quantity, total_price, status)
                VALUES (?, ?, ?, ?, ?)
            ');
            
            $stmt->execute([
                $input['user_id'],
                $input['product_id'],
                $input['quantity'],
                $input['total_price'],
                $input['status'] ?? 'pending'
            ]);
            
            $newId = $db->lastInsertId();
            
            $stmt = $db->prepare('SELECT * FROM orders WHERE id = ?');
            $stmt->execute([$newId]);
            $order = $stmt->fetch();
            
            http_response_code(201);
            echo json_encode($order);
            break;
            
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Internal server error', 'message' => $e->getMessage()]);
}