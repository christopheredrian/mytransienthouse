<?php

namespace App\Utilities;

use App\Account;

class UiUtilities
{

    public static function getForAccount(Account $account)
    {
        $uiMatrix = [
            'main_title' => 'Rent home or rooms',
            'main_subtitle' => "Our home is open for all vacationers! Staying with us is a great way to start your ideal vacation. Get started and book your stay with us!",
            'main_image_url' => "https://source.unsplash.com/R-LK3sqLiBw/1600x1200",

            // disabled for now
            'get_started_link' => "GET STARTED",
            'learn_more' => "LEARN MORE",

            'primary_background' => '#fff',

            'primary' => "#06794f",
            'secondary' => "#0fa28b",
            'success' => "#3ac97c",
            'danger' => "#d73f30",
            'warning' => "#ebb20c",
            'info' => "#9d46cd",

            'bg_primary' => "white",
            'nav_link' => 'black',
            'navbar_brand' => 'black',

            'footer' => '#a2acba',
            'footer_bg' => 'white',

            'gallery_bg' => '#0061f2',

            // Gallery alias label
            'album_alias_label' => 'Albums',

        ];

        switch ($account->subdomain) {
            case 'testing':
            case 'espiritu':
                $uiMatrix['main_image_url'] = "//pix6.agoda.net/geo/city/17196/1_17196_02.jpg?s=1920x822";
                $uiMatrix['bg_primary'] = "#64b96a";
                $uiMatrix['footer'] = "#000000b8";
                $uiMatrix['footer_bg'] = "#64b96a";
                $uiMatrix['gallery_bg'] = '#6764b9';

                $uiMatrix['album_alias_label'] = 'Units';

                return $uiMatrix;

                break;

            default:
                return $uiMatrix;
        }

    }

}
