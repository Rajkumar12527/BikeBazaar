<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        try {
            $stmt = $pdo->query("SELECT * FROM sell_leads ORDER BY submittedAt DESC");
            $sell_leads = $stmt->fetchAll();

            foreach ($sell_leads as &$lead) {
                $lead['year'] = (int)$lead['year'];
                $lead['km'] = (int)$lead['km'];
            }

            echo json_encode(["success" => true, "data" => $sell_leads]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => $e->getMessage()]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data || empty($data['sellerPhone'])) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Seller mobile number is required."]);
            exit();
        }

        try {
            $id = !empty($data['id']) ? $data['id'] : 'sell-' . time();
            $stmt = $pdo->prepare("INSERT INTO sell_leads 
                (id, sellerName, sellerPhone, brand, modelName, year, km, owner, estimatedPrice, status) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

            $stmt->execute([
                $id,
                $data['sellerName'] ?? 'Customer Lead',
                $data['sellerPhone'],
                $data['brand'] ?? 'Other',
                $data['modelName'] ?? 'Used Bike',
                (int)($data['year'] ?? date('Y')),
                (int)($data['km'] ?? 10000),
                $data['owner'] ?? '1st Owner',
                $data['estimatedPrice'] ?? '₹75,000',
                $data['status'] ?? 'New Lead'
            ]);

            echo json_encode(["success" => true, "message" => "Sell valuation submitted successfully", "id" => $id]);
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
            $stmt = $pdo->prepare("UPDATE sell_leads SET status = ? WHERE id = ?");
            $stmt->execute([$data['status'], $data['id']]);
            echo json_encode(["success" => true, "message" => "Sell lead status updated"]);
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
            echo json_encode(["success" => false, "message" => "Sell lead ID required."]);
            exit();
        }

        try {
            $stmt = $pdo->prepare("DELETE FROM sell_leads WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(["success" => true, "message" => "Sell lead deleted successfully"]);
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
