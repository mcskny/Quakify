<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Veritabanı bağlantısı
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "quakify";

// Gelen verileri al
$data = json_decode(file_get_contents("php://input"));

// Formdan gelen veriler
$mag = isset($data->mag) ? $data->mag : null;
$depth = isset($data->depth) ? $data->depth : null;
$date = isset($data->date) ? $data->date : null;
$time = isset($data->time) ? $data->time : null;
$lat = isset($data->lat) ? $data->lat : null;
$long = isset($data->long) ? $data->long : null;

// Bağlantıyı kontrol et
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Tüm veriler dolu mu kontrol et
if (!$mag || !$depth || !$date || !$time || !$lat || !$long) {
    $response = array("error" => "Lütfen tüm alanları doldurun.");
} else {
    // "lat" ve "long" değerlerini birleştir
    $latLong = "$lat,$long";

    // SQL sorgusu için yer tutucu parametreleri kullanarak veriyi veritabanına ekle
    $sql = "INSERT INTO quaks (magnitude, depth, date, time, coordinates) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssss", $mag, $depth, $date, $time, $latLong);

    if ($stmt->execute()) {
        $response = array("message" => "Veri başarıyla eklendi.");
    } else {
        $response = array("error" => "Veri eklenirken bir hata oluştu: " . $conn->error);
    }

    // Veritabanı bağlantısını kapat
    $stmt->close();
}

// JSON formatında yanıt ver
echo json_encode($response);

// Veritabanı bağlantısını kapat
$conn->close();
?>
