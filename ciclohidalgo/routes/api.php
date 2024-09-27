<?php

use App\Http\Controllers\ContenidoController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminUsersController;
use App\Http\Controllers\ProfileController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/productos/all', [ProductoController::class, 'index']);
Route::get('/contenidos/all', [ContenidoController::class, 'index']);
Route::get('/productos/{id}', [ProductoController::class, 'show']);
Route::post('/user/login', [UserController::class, 'check']);
Route::post('/user/singin', [UserController::class, 'store']);
Route::post('/user/update/{id}', [UserController::class, 'update']);
Route::post('/productos/crear', [ProductoController::class, 'store']);
Route::post('/productos/update/{id}', [ProductoController::class, 'update']);
Route::get('/productos/delete/{id}', [ProductoController::class, 'destroy']);

Route::get('/admin/users', [AdminUsersController::class, 'index']);
Route::put('/admin/users/{id}/role', [AdminUsersController::class, 'updateRole']);
Route::get('/user', function (Request $request) {return $request->user();}); //user() pero sin el middleware

Route::get('/user/{id}', [ProfileController::class, 'getEditData']);//Añadir sanctum o middleware
Route::put('/user/{id}', [ProfileController::class, 'updateEditData']);//Añadir sanctum o middleware
//Route::get('/user/data', [ProfileController::class, 'getUserData']);
//Route::get('/user/infoupdate', [ProfileController::class, 'updateUserInfo']);
//Route::get('/user/emailupdate', [ProfileController::class, 'updateUserEmail']);
Route::get('/user/deleteacc', [ProfileController::class, 'destroy']);

Route::get('/roles', function() {return App\Models\Role::all();});