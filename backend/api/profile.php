<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once 'middleware.php';

if (!isAuthenticated()) {
    exit();
}

$user_data = $GLOBALS['user_data'];

http_response_code(200);
echo json_encode(array(
    "message" => "Access granted.",
    "user"    => $user_data
));

?>
