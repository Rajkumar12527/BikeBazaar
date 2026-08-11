<?php
// ============================================================
// BIKE BAZAAR PATNA - DATABASE CONFIGURATION & CORS HEADERS
// ============================================================

// Suppress HTML display errors so PHP API responses remain 100% clean JSON
error_reporting(0);
ini_set('display_errors', 0);

// Allow CORS from any origin for API access
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Handle HTTP OPTIONS Preflight Request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database Connection Credentials
$host     = "localhost";
$db_name  = "bike_bazaar_db";
$username = "root";
$password = ""; // Set your MySQL password if configured

try {
    $pdo = new PDO("mysql:host={$host};dbname={$db_name};charset=utf8mb4", $username, $password, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);
} catch (PDOException $e) {
    // Return error if database connection fails
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database Connection Failed: " . $e->getMessage()
    ]);
    exit();
}
?>
