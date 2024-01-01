<?php

namespace App\Controllers;

use App\Bootstrap\{Response, Request, Validation};
use App\Database\Query;


class UserController
{
    public static function show($params)
    {
        $id = $params->id;

        if (empty($id)) {
            $db = Query::table("user_details")->select();

            if ($db->count() > 0) {
                $response = new Response(["statusCode" => 200, "message" => "Successfully retrieved", "details" => $db->get()], 200);
            } else {
                $response = new Response(["statusCode" => 206, "message" => "No records found"], 206);
            }
        } else {
            $db = Query::table("user_details")->select()->where("user_id=?", [$id]);

            if ($db->count() > 0) {
                $response = new Response(["statusCode" => 200, "message" => "Successfully retrieved", "details" => $db->single()], 200);
            } else {
                $response = new Response(["statusCode" => 206, "message" => "No records found"], 206);
            }
        }
        echo $response->responseJSON();
    }

    public static function create(Request $req, $params)
    {
        $validator = new Validation($req->input());

        $validationRules = [
            "username" => [
                "required" => "Username cannot be empty",
                "db-unique:user_details,username" => "Username exists. Please try another",
                "maxlength:20" => "Maximum 20 characters allowed"
            ],
            "password" => [
                "required" => "Password cannot be empty",
                "maxlength:32" => "Maximum 32 characters allowed"
            ],
            "first_name" => [
                "required" => "First name cannot be empty",
                "maxlength:200" => "Maximum 200 characters allowed"
            ],
            "last_name" => [
                "required" => "Last name cannot be empty",
                "maxlength:100" => "Maximum 100 characters allowed"
            ],
            "email_id" => [
                "email" => "Invalid email",
                "db-unique:user_details,email_id" => "Email exists. Please try another",
                "maxlength:150" => "Maximum 150 characters allowed"
            ],
            "about" => [
                "required" => "About cannot be empty",
                "maxlength:255" => "Maximum 255 characters allowed"
            ],
            "linkedin_profile" => [
                "url" => "Invalid URL",
                "maxlength:255" => "Maximum 255 characters allowed"
            ],
            "facebook_profile" => [
                "url" => "Invalid URL",
                "maxlength:255" => "Maximum 255 characters allowed"
            ],
            "instagram_profile" => [
                "url" => "Invalid URL",
                "maxlength:255" => "Maximum 255 characters allowed"
            ],
            "role" => [
                "required" => "Role cannot be empty"
            ]
        ];

        $validator->validateRules($validationRules);

        if ($validator->validate()) {

            $login = Query::table("login_access")->insert(["username" => $req->input("username"), "password" => $req->input("password"), "role" => $req->input("role"), "status" => 1]);

            if ($login->save()) {
                $userDetails = Query::table("user_details")->insert(["username" => $req->input("username"), "first_name" => $req->input("first_name"), "last_name" => $req->input("last_name"), "email_id" => $req->input("email_id"), "about" => $req->input("about"), "linkedin_profile" => $req->input("linkedin_profile"), "facebook_profile" => $req->input("facebook_profile"), "instagram_profile" => $req->input("instagram_profile"), "status" => 1]);

                if ($userDetails->save()) {
                    $response = new Response(["statusCode" => 201, "message" => "Successfully saved"], 201);
                } else {
                    $response = new Response(["statusCode" => 500, "message" => "Server error", "errors" => "Cannot save"], 500);
                }
            } else {
                $response = new Response(["statusCode" => 500, "message" => "Server error", "errors" => "Cannot save"], 500);
            }
        } else {
            $response = new Response(["statusCode" => 400, "message" => "Recorrect errors", "errors" => $validator->getErrors()], 400);
        }
        echo $response->responseJSON();
    }

    public static function update(Request $req, $params)
    {
        $id = $params->id;
        $validator = new Validation($req->input());

        $validationRules = [
            "first_name" => [
                "required" => "First name cannot be empty",
                "maxlength:200" => "Maximum 200 characters allowed"
            ],
            "last_name" => [
                "required" => "Last name cannot be empty",
                "maxlength:100" => "Maximum 100 characters allowed"
            ],
            "email_id" => [
                "email" => "Invalid email",
                "db-unique-except:user_details,email_id,user_id-$id" => "Email exists. Please try another",
                "maxlength:150" => "Maximum 150 characters allowed"
            ],
            "about" => [
                "required" => "About cannot be empty",
                "maxlength:255" => "Maximum 255 characters allowed"
            ],
            "linkedin_profile" => [
                "url" => "Invalid URL",
                "maxlength:255" => "Maximum 255 characters allowed"
            ],
            "facebook_profile" => [
                "url" => "Invalid URL",
                "maxlength:255" => "Maximum 255 characters allowed"
            ],
            "instagram_profile" => [
                "url" => "Invalid URL",
                "maxlength:255" => "Maximum 255 characters allowed"
            ],
            "status" => [
                "required" => "Status cannot be empty",
                "in:0,1" => "Status must be between 0 and 1"
            ]
        ];

        $validator->validateRules($validationRules);

        if ($validator->validate()) {

            $userDetails = Query::table("user_details")->update(["first_name" => $req->input("first_name"), "last_name" => $req->input("last_name"), "email_id" => $req->input("email_id"), "about" => $req->input("about"), "linkedin_profile" => $req->input("linkedin_profile"), "facebook_profile" => $req->input("facebook_profile"), "instagram_profile" => $req->input("instagram_profile"), "status" => $req->input("status")])->where("user_id=?", [$id]);

            if ($userDetails->save()) {
                $response = new Response(["statusCode" => 201, "message" => "Successfully updated"], 201);
            } else {
                $response = new Response(["statusCode" => 500, "message" => "Server error", "errors" => "Cannot update"], 500);
            }
        } else {
            $response = new Response(["statusCode" => 400, "message" => "Recorrect errors", "errors" => $validator->getErrors()], 400);
        }
        echo $response->responseJSON();
    }

    public static function changepass(Request $req, $params)
    {
        $id = $params->id;
        $validator = new Validation($req->input());

        $validationRules = [
            "new_pass" => [
                "required" => "First name cannot be empty",
                "maxlength:10" => "Maximum 10 characters allowed"
            ],
            "confirm_pass" => [
                "required" => "Last name cannot be empty",
                "maxlength:10" => "Maximum 10 characters allowed",
                "same:new_pass" => "Password doesnot matches"
            ]
        ];

        $validator->validateRules($validationRules);

        if ($validator->validate()) {

            $userDetails = Query::table("login_access")->update(["password" => $req->input("new_pass")])->where("user_id=?", [$id]);

            if ($userDetails->save()) {
                $response = new Response(["statusCode" => 201, "message" => "Successfully changed password"], 201);
            } else {
                $response = new Response(["statusCode" => 500, "message" => "Server error", "errors" => "Cannot update"], 500);
            }
        } else {
            $response = new Response(["statusCode" => 400, "message" => "Recorrect errors", "errors" => $validator->getErrors()], 400);
        }
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

            $db = Query::table("login_access")->select()->where("username=? AND password=?", [$req->input("username"), $req->input("password")]);

            if ($db->count() > 0) {
                $response = new Response(["statusCode" => 200, "message" => "Successfully logged in", "details" => ["user_id" => $db->single("user_id"), "role_id" => $db->single("role"), "username" => $req->input("username")]], 200);
            } else {
                $response = new Response(["statusCode" => 206, "message" => "Login failed", "errors" => "Wrong username or password"], 206);
            }
        } else {

            $response = new Response(["statusCode" => 400, "message" => "Recorrect errors", "errors" => $validator->getErrors()], 400);
        }
        echo $response->responseJSON();
    }
}
