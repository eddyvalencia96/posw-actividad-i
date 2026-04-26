<?php
/**
 * Users API - REST Endpoints
 * 
 * GET    /api/users.php       - List all users (200)
 * GET    /api/users.php?id=1 - Get user by ID (200 / 404)
 * POST   /api/users.php       - Create user (201)
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

try {
    $db = getDB();
    
    switch ($method) {
        case 'GET':
            if ($id) {
                $stmt = $db->prepare('SELECT id, email, username, name_first, name_last, role, phone, created_at FROM users WHERE id = ?');
                $stmt->execute([$id]);
                $user = $stmt->fetch();
                
                if (!$user) {
                    http_response_code(404);
                    echo json_encode(['error' => 'User not found']);
                    exit;
                }
                
                http_response_code(200);
                echo json_encode($user);
            } else {
                $stmt = $db->query('SELECT id, email, username, name_first, name_last, role, phone, created_at FROM users ORDER BY id');
                $users = $stmt->fetchAll();
                
                http_response_code(200);
                echo json_encode($users);
            }
            break;
            
        case 'POST':
            if (!isset($input['email'], $input['username'], $input['password'], $input['name_first'], $input['name_last'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing required fields: email, username, password, name_first, name_last']);
                exit;
            }
            
            $stmt = $db->prepare('
                INSERT INTO users (email, username, password, name_first, name_last, role, phone)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ');
            
            $stmt->execute([
                $input['email'],
                $input['username'],
                $input['password'],
                $input['name_first'],
                $input['name_last'],
                $input['role'] ?? 'operator',
                $input['phone'] ?? ''
            ]);
            
            $newId = $db->lastInsertId();
            
            $stmt = $db->prepare('SELECT id, email, username, name_first, name_last, role, phone, created_at FROM users WHERE id = ?');
            $stmt->execute([$newId]);
            $user = $stmt->fetch();
            
            http_response_code(201);
            echo json_encode($user);
            break;
            
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Internal server error', 'message' => $e->getMessage()]);
}