<?php
header('Content-Type: application/json; charset=utf-8');

$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "portfolio";

// Connect to MySQL
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode([
        'status'  => 'error',
        'message' => 'Database connection failed: ' . $conn->connect_error
    ]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name    = trim($_POST['full_name'] ?? '');
    $email   = trim($_POST['email'] ?? '');
    $subject = trim($_POST['subject'] ?? '');
    $message = trim($_POST['message'] ?? '');

    $stmt = $conn->prepare("INSERT INTO contact (name, email, subject, message) VALUES (?, ?, ?, ?)");

    if ($stmt) {
        $stmt->bind_param("ssss", $name, $email, $subject, $message);

        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode([
                'status'  => 'success',
                'message' => 'Thank you! Your message has been recorded successfully.'
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                'status'  => 'error',
                'message' => 'Failed to insert data: ' . $stmt->error
            ]);
        }
        $stmt->close();
    } else {
        http_response_code(500);
        echo json_encode([
            'status'  => 'error',
            'message' => 'Prepare statement failed: ' . $conn->error
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode([
        'status'  => 'error',
        'message' => 'Invalid request method.'
    ]);
}

$conn->close();
