<?php

const ADMIN_BASE_URL = "admin";

if (!function_exists("admin_url")) {
    function admin_url(string $url = "")
    {
        $url = ltrim($url, '/');
        $url = ADMIN_BASE_URL . "/{$url}";
        $url = rtrim($url, '/');
        return $url;
    }
}
