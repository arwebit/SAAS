<?php

use App\Bootstrap\Router;
use App\Controllers\Master\{BlogController, CategoryController, RoleController};
use App\Controllers\UserController;



Router::get('master/roles', [RoleController::class, "show"]);
Router::apiMethods('users', [UserController::class]);
Router::post("user/login", [UserController::class, "login"]);
Router::put("user/changepass", [UserController::class, "changepass"]);

/****************************************************************** */

Router::apiMethods('categories', [CategoryController::class]);
Router::apiMethods('blogs', [BlogController::class]);
Router::post('blogs/change_pic', [BlogController::class, "change_pic"]);
