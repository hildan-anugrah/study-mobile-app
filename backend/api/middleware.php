<?php

require_once '../vendor/autoload.php';
require_once '../config/jwt_key.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;

function isAuthenticated() {
    if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $auth_header = $_SERVER['HTTP_AUTHORIZATION'];
        $arr = explode(" ", $auth_header);

        if (count($arr) < 2) {
            http_response_code(401);
            echo json_encode(array("message" => "Access denied. Invalid Authorization header format."));
            return false;
        }

        $jwt = $arr[1];

        try {
            $decoded = JWT::decode($jwt, new Key(JWT_KEY, 'HS256'));
            $GLOBALS['user_data'] = $decoded->data;
            return true;
        } catch (ExpiredException $e) {
            http_response_code(401);
            echo json_encode(array("message" => "Token has expired."));
            return false;
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array("message" => "Access denied. Invalid token. " . $e->getMessage()));
            return false;
        }
    } else {
        http_response_code(401);
        echo json_encode(array("message" => "Access denied. Authorization header not found."));
        return false;
    }
}

?>
