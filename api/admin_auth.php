<?php
require_once __DIR__ . '/config.php';

$data = json_decode(file_get_contents("php://input"), true);
$action = $data['action'] ?? $_GET['action'] ?? '';

if ($action === 'login') {
    $email    = trim($data['email'] ?? '');
    $password = $data['password'] ?? '';

    if (empty($email) || empty($password)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Email and password are required."]);
        exit();
    }

    try {
        $stmt = $pdo->prepare("SELECT * FROM admin_users WHERE LOWER(email) = LOWER(?) LIMIT 1");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if ($user && ($user['password_hash'] === $password || password_verify($password, $user['password_hash']))) {
            echo json_encode([
                "success" => true,
                "message" => "Owner authentication successful",
                "user" => [
                    "email" => $user['email'],
                    "full_name" => $user['full_name'],
                    "phone" => $user['phone']
                ]
            ]);
        } else {
            http_response_code(401);
            echo json_encode(["success" => false, "message" => "Invalid email or password."]);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => $e->getMessage()]);
    }
} elseif ($action === 'update_password') {
    $email       = trim($data['email'] ?? 'rajkumar87036@gmail.com');
    $oldPassword = $data['oldPassword'] ?? '';
    $newPassword = $data['newPassword'] ?? '';

    if (empty($newPassword)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "New password required."]);
        exit();
    }

    try {
        $stmt = $pdo->prepare("UPDATE admin_users SET password_hash = ? WHERE LOWER(email) = LOWER(?)");
        $stmt->execute([$newPassword, $email]);

        echo json_encode(["success" => true, "message" => "Password updated successfully in database"]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid action specified."]);
}
?>
