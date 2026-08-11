<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        try {
            $stmt = $pdo->query("SELECT * FROM contact_inquiries ORDER BY submittedAt DESC");
            $inquiries = $stmt->fetchAll();
            echo json_encode(["success" => true, "data" => $inquiries]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => $e->getMessage()]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data || empty($data['name']) || empty($data['phone'])) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Name and Mobile number are required."]);
            exit();
        }

        try {
            $id = !empty($data['id']) ? $data['id'] : 'msg-' . time();
            $stmt = $pdo->prepare("INSERT INTO contact_inquiries (id, name, phone, subject, message, status) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $id,
                $data['name'],
                $data['phone'],
                $data['subject'] ?? 'General Inquiry',
                $data['message'] ?? 'Showroom inquiry submitted.',
                $data['status'] ?? 'New Inquiry'
            ]);

            echo json_encode(["success" => true, "message" => "Contact inquiry submitted successfully", "id" => $id]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => $e->getMessage()]);
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data || empty($data['id']) || empty($data['status'])) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "ID and status are required."]);
            exit();
        }

        try {
            $stmt = $pdo->prepare("UPDATE contact_inquiries SET status = ? WHERE id = ?");
            $stmt->execute([$data['status'], $data['id']]);
            echo json_encode(["success" => true, "message" => "Inquiry status updated"]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => $e->getMessage()]);
        }
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if (!$id) {
            $data = json_decode(file_get_contents("php://input"), true);
            $id = $data['id'] ?? null;
        }

        if (!$id) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Inquiry ID required."]);
            exit();
        }

        try {
            $stmt = $pdo->prepare("DELETE FROM contact_inquiries WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(["success" => true, "message" => "Inquiry deleted successfully"]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => $e->getMessage()]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["success" => false, "message" => "Method not allowed"]);
        break;
}
?>
