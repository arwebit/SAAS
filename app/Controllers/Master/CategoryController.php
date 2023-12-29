<?php

namespace App\Controllers\Master;

use App\Bootstrap\{Response, Request, Validation};
use App\Database\Query;

class CategoryController
{
    public static function show($params)
    {
        $id = $params->id;

        if (empty($id)) {
            $db = Query::table("categories")->select();

            if ($db->count() > 0) {
                $response = new Response(["statusCode" => 200, "message" => "Successfully retrieved", "records" => $db->count(), "details" => $db->get()], 200);
            } else {
                $response = new Response(["statusCode" => 206, "message" => "No records found"], 206);
            }
        } else {
            $db = Query::table("categories")->select()->where("category_id=?", [$id]);

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
        $categoryID = date("YmdHis");
        $validator = new Validation($req->input());

        $validationRules = [
            "category_name" => [
                "required" => "Category name cannot be empty",
                "db-unique:categories,category_name" => "Category exists. Please try another",
                "maxlength:150" => "Maximum 150 characters allowed",
                "pattern:a-zA-Z" => "Only letters are allowed"
            ],
            "category_slug" => [
                "required" => "Category slug cannot be empty",
                "db-unique:categories,category_slug" => "Category slug exists. Please try another",
                "maxlength:255" => "Maximum 255 characters allowed",
                "pattern:a-zA-Z-" => "Only letters and hyphens are allowed"
            ],

        ];

        $validator->validateRules($validationRules);

        if ($validator->validate()) {

            $db = Query::table("categories")->insert(["category_id" => $categoryID, "category_name" => $req->input("category_name"), "category_slug" => strtolower($req->input("category_slug"))]);

            if ($db->save()) {
                $response = new Response(["statusCode" => 201, "message" => "Successfully saved"], 201);
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
        $categoryID = $params->id;
        $validator = new Validation($req->input());

        $validationRules = [
            "category_name" => [
                "required" => "Category name cannot be empty",
                "db-unique-except:categories,category_name,category_id-$categoryID" => "Category exists. Please try another",
                "maxlength:150" => "Maximum 150 characters allowed",
                "pattern:a-zA-Z" => "Only letters are allowed"
            ],
            "category_slug" => [
                "required" => "Category slug cannot be empty",
                "db-unique-except:categories,category_slug,category_id-$categoryID" => "Category slug exists. Please try another",
                "maxlength:255" => "Maximum 255 characters allowed",
                "pattern:a-zA-Z-" => "Only letters and hyphens are allowed"
            ],

        ];

        $validator->validateRules($validationRules);

        if ($validator->validate()) {

            $db = Query::table("categories")->update(["category_id" => $categoryID, "category_name" => $req->input("category_name"), "category_slug" => strtolower($req->input("category_slug"))])
                ->where("category_id=?", [$categoryID]);

            if ($db->save()) {
                $response = new Response(["statusCode" => 201, "message" => "Successfully updated"], 201);
            } else {
                $response = new Response(["statusCode" => 500, "message" => "Server error", "errors" => "Cannot save"], 500);
            }
        } else {
            $response = new Response(["statusCode" => 400, "message" => "Recorrect errors", "errors" => $validator->getErrors()], 400);
        }
        echo $response->responseJSON();
    }
}
