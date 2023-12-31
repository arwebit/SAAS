<?php

use App\Bootstrap\Router;
use App\Controllers\{UserController, BlogController, SearchController};
use App\Controllers\Master\{CategoryController, RoleController};



Router::get('master/roles', [RoleController::class, "show"]);
Router::apiMethods('users', [UserController::class]);
Router::post("user/login", [UserController::class, "login"]);
Router::put("user/changepass", [UserController::class, "changepass"]);

/****************************************************************** */

Router::apiMethods('categories', [CategoryController::class]);
Router::apiMethods('blogs', [BlogController::class]);
Router::post('blogs/change_pic', [BlogController::class, "change_pic"]);


/****************************************************************** */

Router::get('search/blog/:blog_slug', [SearchController::class, "blogSearchBySlug"]);
Router::get('search/category/:category_slug', [SearchController::class, "categorySearchBySlug"]);
