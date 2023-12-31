<?php

namespace App\Controllers;

use App\Bootstrap\{Response, Request};
use App\Database\Query;
use Devker\Vaults\Vaults;

class SearchController
{

    public static function blogSearchBySlug($params)
    {
        $blog_slug = trim($params->blog_slug);
        $db = Query::table("blog")->select()->where("blog_slug=?", [$blog_slug])->order("created_on DESC");
        $blog = $db->single();
        $data = [];
        $dbc = Query::table("categories")->select()->where("category_id=?", [$blog['category_id']])->single();
        $dbu = Query::table("user_details")->select()->where("username=?", [$blog['created_by']])->single();

        $data['blog_id'] = $blog['blog_id'];
        $data['blog_slug'] = $blog['blog_slug'];
        $data['meta']['keywords'] = $blog['meta_keywords'];
        $data['meta']['description'] = $blog['meta_description'];
        $data['created']['by'] = $dbu;
        $data['created']['on'] = $blog['created_on'];
        $data['category']['id'] = $blog['category_id'];
        $data['category']['name'] = $dbc['category_name'];
        $data['category']['slug'] = $dbc['category_slug'];
        $data['cover']['pic'] = $blog['blog_cover_pic'];
        $data['cover']['pic_type'] = $blog['blog_cover_pic_type'];

        $response = new Response(["statusCode" => 200, "message" => "Records found", "details" => $data], 200);
        echo $response->responseJSON();
    }

    public static function categorySearchBySlug($params)
    {
        $category_slug = trim($params->category_slug);

        $pageNo = trim($params->page_no);
        $records = trim($params->records);

        $db = Query::table("categories")->select()->where("category_slug=?", [$category_slug]);
        $category = $db->single();
        $data = [];

        $data['category_id'] = $category['category_id'];
        $data['category_name'] = $category['category_name'];
        $data['category_slug'] = $category['category_slug'];
        $i = 0;
        $dbb = Query::table("blog")->select()->where("category_id=?", [$category['category_id']])->order("created_on DESC")->pagination($pageNo, $records)->get();

        while ($i < sizeof($dbb)) {

            $data['blogs'][$i]['id'] = $dbb[$i]['blog_id'];
            $data['blogs'][$i]['slug'] = $dbb[$i]['blog_slug'];
            $data['blogs'][$i]['meta']['keywords'] = $dbb[$i]['meta_keywords'];
            $data['blogs'][$i]['meta']['description'] = $dbb[$i]['meta_description'];
            $dbu = Query::table("user_details")->select()->where("username=?", [$dbb[$i]['created_by']])->single();
            $data['blogs'][$i]['created']['by'] = $dbu;
            $data['blogs'][$i]['created']['on'] = $dbb[$i]['created_on'];
            $data['blogs'][$i]['cover']['pic'] = $dbb[$i]['blog_cover_pic'];
            $data['blogs'][$i]['cover']['pic_type'] = $dbb[$i]['blog_cover_pic_type'];
            $i++;
        }
        $response = new Response(["statusCode" => 200, "message" => "Records found", "details" => $data], 200);
        echo $response->responseJSON();
    }
}
