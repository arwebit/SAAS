<?php

namespace App\Controllers;

use App\Bootstrap\{Response, Request, Validation};
use App\Database\Query;

use Devker\Vaults\Vaults;

class UserController
{
    public static function show($params)
    {
        $response = new Response(["statusCode" => 200, "message" => "Get method"], 200);
        echo $response->responseJSON();
    }

    public static function create(Request $req, $params)
    {
        $response = new Response(["statusCode" => 201, "message" => "Post method"], 201);
        echo $response->responseJSON();
    }

    public static function update(Request $req, $params)
    {
        $response = new Response(["statusCode" => 201, "message" => "Put method"], 201);
        echo $response->responseJSON();
    }

    public static function delete($params)
    {
        $response = new Response(["statusCode" => 201, "message" => "Delete method"], 201);
        echo $response->responseJSON();
    }

    public static function login(Request $req, $params)
    {
        $validator = new Validation($req->input());

        $validationRules = [
            "username" => [
                "required" => "Username cannot be empty"
            ],
            "password" => [
                "required" => "Password cannot be empty"
            ]
        ];

        $validator->validateRules($validationRules);

        if ($validator->validate()) {

            // Do your code when there is no errors

        } else {

            // display errors : $validator->getErrors()

        }
    }
}
