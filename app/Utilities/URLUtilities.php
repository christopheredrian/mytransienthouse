<?php

namespace App\Utilities;


class URLUtilities
{

    public static function getSubdomain($url)
    {

        // in case scheme relative URI is passed, e.g., //www.google.com/
        $url = trim($url, '/');

        // If scheme not included, prepend it
        if (!preg_match('#^http(s)?://#', $url)) {
            $url = 'http://' . $url;
        }

        $urlParts = parse_url($url);

        // remove www
        $domain = preg_replace('/^www\./', '', $urlParts['host']);

        $subdomain = explode('.', $domain)[0];

        return $subdomain;
    }

}
