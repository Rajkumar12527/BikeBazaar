<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        try {
            $stmt = $pdo->query("SELECT * FROM bikes ORDER BY created_at DESC");
            $bikes = $stmt->fetchAll();

            // Format JSON strings back into arrays/objects for frontend
            foreach ($bikes as &$bike) {
                $bike['price'] = (float)$bike['price'];
                $bike['originalPrice'] = $bike['originalPrice'] ? (float)$bike['originalPrice'] : null;
                $bike['year'] = (int)$bike['year'];
                $bike['km'] = (int)$bike['km'];
                $bike['isFeatured'] = (bool)$bike['isFeatured'];
                $bike['images'] = json_decode($bike['images'], true) ?: [];
                $bike['badges'] = json_decode($bike['badges'], true) ?: [];
                $bike['specs']  = json_decode($bike['specs'], true) ?: new stdClass();
            }

            echo json_encode(["success" => true, "data" => $bikes]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => $e->getMessage()]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data || empty($data['name']) || empty($data['price'])) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Vehicle name and price required."]);
            exit();
        }

        try {
            $id = !empty($data['id']) ? $data['id'] : 'bike-' . time();
            $stmt = $pdo->prepare("INSERT INTO bikes 
                (id, name, brand, model, year, price, originalPrice, km, owner, fuelType, cc, score, location, isFeatured, status, images, badges, specs) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

            $stmt->execute([
                $id,
                $data['name'],
                $data['brand'] ?? 'Other',
                $data['model'] ?? 'Standard',
                (int)($data['year'] ?? date('Y')),
                (float)$data['price'],
                isset($data['originalPrice']) ? (float)$data['originalPrice'] : null,
                (int)($data['km'] ?? 10000),
                $data['owner'] ?? '1st Owner',
                $data['fuelType'] ?? 'Petrol',
                $data['cc'] ?? '150',
                (int)($data['score'] ?? 95),
                $data['location'] ?? 'Patna, Bihar',
                !empty($data['isFeatured']) ? 1 : 0,
                $data['status'] ?? 'Available',
                json_encode($data['images'] ?? []),
                json_encode($data['badges'] ?? ['Certified']),
                json_encode($data['specs'] ?? new stdClass())
            ]);

            echo json_encode(["success" => true, "message" => "Vehicle added successfully", "id" => $id]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => $e->getMessage()]);
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data || empty($data['id'])) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Vehicle ID required for update."]);
            exit();
        }

        try {
            $stmt = $pdo->prepare("UPDATE bikes SET 
                name = ?, brand = ?, model = ?, year = ?, price = ?, originalPrice = ?, km = ?, 
                owner = ?, fuelType = ?, cc = ?, score = ?, location = ?, isFeatured = ?, status = ?, 
                images = ?, badges = ?, specs = ? 
                WHERE id = ?");

            $stmt->execute([
                $data['name'],
                $data['brand'],
                $data['model'],
                (int)$data['year'],
                (float)$data['price'],
                isset($data['originalPrice']) ? (float)$data['originalPrice'] : null,
                (int)$data['km'],
                $data['owner'],
                $data['fuelType'],
                $data['cc'],
                (int)$data['score'],
                $data['location'],
                !empty($data['isFeatured']) ? 1 : 0,
                $data['status'],
                json_encode($data['images'] ?? []),
                json_encode($data['badges'] ?? []),
                json_encode($data['specs'] ?? new stdClass()),
                $data['id']
            ]);

            echo json_encode(["success" => true, "message" => "Vehicle updated successfully"]);
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
            echo json_encode(["success" => false, "message" => "Vehicle ID required to delete."]);
            exit();
        }

        try {
            $stmt = $pdo->prepare("DELETE FROM bikes WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(["success" => true, "message" => "Vehicle deleted successfully"]);
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
