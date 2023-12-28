<?php

use App\Bootstrap\Router;
use App\Controllers\Master\RoleController;
use App\Controllers\UserController;


Router::get('master/roles', [RoleController::class, "show"]);
Router::apiMethods('users', [UserController::class]);
Router::post("user/login", [UserController::class, "login"]);
