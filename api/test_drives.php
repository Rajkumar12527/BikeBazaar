<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        try {
            $stmt = $pdo->query("SELECT * FROM test_drives ORDER BY submittedAt DESC");
            $test_drives = $stmt->fetchAll();
            echo json_encode(["success" => true, "data" => $test_drives]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => $e->getMessage()]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data || empty($data['name']) || empty($data['phone'])) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Name and Phone number are required."]);
            exit();
        }

        try {
            $id = !empty($data['id']) ? $data['id'] : 'td-' . time();
            $stmt = $pdo->prepare("INSERT INTO test_drives (id, name, phone, bikeName, date, time, status) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $id,
                $data['name'],
                $data['phone'],
                $data['bikeName'] ?? 'Selected Vehicle',
                $data['date'] ?? date('Y-m-d'),
                $data['time'] ?? '11:00 AM',
                $data['status'] ?? 'Pending'
            ]);

            echo json_encode(["success" => true, "message" => "Test drive booked successfully", "id" => $id]);
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
            $stmt = $pdo->prepare("UPDATE test_drives SET status = ? WHERE id = ?");
            $stmt->execute([$data['status'], $data['id']]);
            echo json_encode(["success" => true, "message" => "Test drive status updated"]);
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
            echo json_encode(["success" => false, "message" => "Test drive ID required."]);
            exit();
        }

        try {
            $stmt = $pdo->prepare("DELETE FROM test_drives WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(["success" => true, "message" => "Test drive deleted successfully"]);
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
