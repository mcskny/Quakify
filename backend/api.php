<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Veritabanı bağlantısı
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "quakify";

$conn = new mysqli($servername, $username, $password, $dbname);

// Bağlantıyı kontrol et
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Veritabanından tüm verileri seç
$sql = "SELECT * FROM quaks";
$result = $conn->query($sql);

// Verileri dizi olarak topla
$quaks = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $quaks[] = $row;
    }
}

// JSON formatında yanıt ver
echo json_encode($quaks);

// Veritabanı bağlantısını kapat
?>
