<?php

namespace App\Controllers\Master;

use App\Bootstrap\{Response, Request};
use App\Database\Query;

class RoleController
{

    public static function show($params)
    {
        $db = Query::table("mas_role")->select();
        if ($db->count() > 0) {
            $response = new Response(["status_code" => 200, "message" => "Records found", "success" => true, "data" => $db->get()], 200);
        } else {
            $response = new Response(["status_code" => 406, "message" => "No records found", "success" => false], 406);
        }
        echo  $response->responseJSON();
    }
}
