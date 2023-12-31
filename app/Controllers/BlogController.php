<?php

namespace App\Controllers;

use App\Bootstrap\{Response, Request, Validation};
use App\Database\Query;

use Devker\Vaults\Vaults;

class BlogController
{

    public static function show($params)
    {
        $id = trim($params->id);

        if (empty($id)) {
            $db = Query::table("blog")->select();

            if ($db->count() > 0) {
                $response = new Response(["statusCode" => 200, "message" => "Successfully retrieved", "records" => $db->count(), "details" => $db->get()], 200);
            } else {
                $response = new Response(["statusCode" => 206, "message" => "No records found"], 206);
            }
        } else {
            $db = Query::table("blog")->select()->where("blog_id=?", [$id]);

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
        $blogID = date("YmdHis");
        $validator = new Validation($req->input());


        $validationRules = [
            "blog_title" => [
                "required" => "Blog title cannot be empty",
                "db-unique:blog,blog_title" => "Blog title exists. Please try another",
                "maxlength:255" => "Maximum 255 characters allowed"
            ],
            "blog_slug" => [
                "required" => "Blog slug cannot be empty",
                "db-unique:blog,blog_slug" => "Blog slug exists. Please try another",
                "maxlength:255" => "Maximum 255 characters allowed"
            ],
            "blog_post" => [
                "required" => "Blog post cannot be empty"
            ],
            "blog_cover_pic" => [
                "file-required" => "Cover pic required",
                "file-max-size:1048576" => "Maximum 1 MB allowed",
                "file-mime-type:image/jpg,image/jpeg" => "Only JPG/JPEG image allowed"
            ],
            "meta_keywords" => [
                "required" => "Meta keywords cannot be empty",
                "maxlength:500" => "Maximum 500 characters allowed"
            ],
            "meta_description" => [
                "required" => "Meta description cannot be empty",
                "maxlength:200" => "Maximum 200 characters allowed"
            ],
            "category_id" => [
                "required" => "Category cannot be empty"
            ],
            "status" => [
                "required" => "Status cannot be empty"
            ],

        ];

        $validator->validateRules($validationRules);

        if ($validator->validate()) {

            $fileTmpName = Vaults::fileDetails($req->input("blog_cover_pic"), "fileTempName");
            $pathDirectory = "cover_images/";
            if (!is_dir($pathDirectory)) {
                mkdir($pathDirectory, 0754);
            }

            $fileType = Vaults::fileDetails($req->input("blog_cover_pic"), "fileType");
            $extension = Vaults::fileDetails($req->input("blog_cover_pic"), "fileExtension");
            $fileName = md5(date("YmdHis"));

            $db = Query::table("blog")->insert(["blog_id" => $blogID, "blog_title" => trim($req->input("blog_title")), "blog_slug" => trim(strtolower($req->input("blog_slug"))), "blog_post" => trim($req->input("blog_post")), "meta_keywords" => trim($req->input("meta_keywords")), "meta_description" => trim($req->input("meta_description")), "status" => trim($req->input("status")), "created_by" => trim($req->input("created_by")), "created_on" => date("Y-m-d H:i:s"), "blog_cover_pic" => $fileName . "." . $extension, "blog_cover_pic_type" => $fileType, "category_id" => trim($req->input("category_id"))]);

            if ($db->save()) {
                Vaults::fileUpload($pathDirectory, $fileTmpName, $extension, $fileName);
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
        $blogID = trim($params->id);
        $validator = new Validation($req->input());

        $validationRules = [
            "blog_title" => [
                "required" => "Blog title cannot be empty",
                "db-unique-except:blog,blog_title,blog_id-$blogID" => "Blog title exists. Please try another",
                "maxlength:255" => "Maximum 255 characters allowed"
            ],
            "blog_slug" => [
                "required" => "Blog slug cannot be empty",
                "db-unique-except:blog,blog_slug,blog_id-$blogID" => "Blog slug exists. Please try another",
                "maxlength:255" => "Maximum 255 characters allowed"
            ],
            "blog_post" => [
                "required" => "Blog post cannot be empty"
            ],
            "meta_keywords" => [
                "required" => "Meta keywords cannot be empty",
                "maxlength:500" => "Maximum 500 characters allowed"
            ],
            "meta_description" => [
                "required" => "Meta description cannot be empty",
                "maxlength:200" => "Maximum 200 characters allowed"
            ],
            "category_id" => [
                "required" => "Category cannot be empty"
            ],
            "status" => [
                "required" => "Status cannot be empty"
            ],

        ];

        $validator->validateRules($validationRules);

        if ($validator->validate()) {
            $db = Query::table("blog")->update(["blog_title" => trim($req->input("blog_title")), "blog_slug" => trim(strtolower($req->input("blog_slug"))), "blog_post" => trim($req->input("blog_post")), "meta_keywords" => trim($req->input("meta_keywords")), "meta_description" => trim($req->input("meta_description")), "status" => trim($req->input("status")), "category_id" => trim($req->input("category_id"))])->where("blog_id=?", [$blogID]);

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

    public static function delete($params)
    {
        $blogID = trim($params->id);
        $db = Query::table("blog")->delete()->where("blog_id=?", [$blogID]);

        if ($db->save()) {
            $response = new Response(["statusCode" => 201, "message" => "Successfully deleted"], 201);
        } else {
            $response = new Response(["statusCode" => 500, "message" => "Server error", "errors" => "Cannot delete"], 500);
        }
        echo $response->responseJSON();
    }


    public static function change_pic(Request $req, $params)
    {
        $blogID = trim($params->id);

        $coverPic = Query::table("blog")->select()->where("blog_id=?", [$blogID])->single("blog_cover_pic");


        $validator = new Validation($req->input());
        $validationRules = [
            "blog_cover_pic" => [
                "file-required" => "Cover pic required",
                "file-max-size:1048576" => "Maximum 1 MB allowed",
                "file-mime-type:image/jpg,image/jpeg" => "Only JPG/JPEG image allowed"
            ],

        ];

        $validator->validateRules($validationRules);

        if ($validator->validate()) {

            $fileTmpName = Vaults::fileDetails($req->input("blog_cover_pic"), "fileTempName");
            $pathDirectory = "cover_images/";
            if (!is_dir($pathDirectory)) {
                mkdir($pathDirectory, 0754);
            }
            $fileType = Vaults::fileDetails($req->input("blog_cover_pic"), "fileType");
            $extension = Vaults::fileDetails($req->input("blog_cover_pic"), "fileExtension");
            $fileName = md5(date("YmdHis"));
            $db = Query::table("blog")->update(["blog_cover_pic" => $fileName . "." . $extension, "blog_cover_pic_type" => $fileType,])->where("blog_id=?", [$blogID]);

            if ($db->save()) {
                $dir = __DIR__ . "/../../public/cover_images/" . $coverPic;
                Vaults::deleteFile($dir);
                Vaults::fileUpload($pathDirectory, $fileTmpName, $extension, $fileName);
                $response = new Response(["statusCode" => 201, "message" => "Successfully changed"], 201);
            } else {
                $response = new Response(["statusCode" => 500, "message" => "Server error", "errors" => "Cannot save"], 500);
            }
        } else {
            $response = new Response(["statusCode" => 400, "message" => "Recorrect errors", "errors" => $validator->getErrors()], 400);
        }
        echo $response->responseJSON();
    }
}
