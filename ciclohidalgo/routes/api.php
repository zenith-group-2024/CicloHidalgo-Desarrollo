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

Route::middleware(['auth', 'admin'])->group(function () {
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
    Route::get('/admin/users', [AdminUsersController::class, 'index']);
    Route::put('/admin/users/{id}/role', [AdminUsersController::class, 'updateRole']);
});


Route::get('/productos/all', [ProductoController::class, 'index']);
Route::get('/contenidos/all', [ContenidoController::class, 'index']);
Route::get('/productos/{id}', [ProductoController::class, 'show']);
Route::post('/user/login', [UserController::class, 'check']);
Route::post('/user/signin', [UserController::class, 'store']);
Route::post('/user/update/{id}', [UserController::class, 'update']);
Route::post('/productos/crear', [ProductoController::class, 'store']);
Route::post('/productos/update/{id}', [ProductoController::class, 'update']);
Route::get('/productos/delete/{id}', [ProductoController::class, 'destroy']);

Route::put('/productos/discount/{id}', [ProductoController::class, 'discount']);

Route::get('/user', function (Request $request) {return $request->user();});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user/getprofile/{id}', [ProfileController::class, 'getEditData']);
    Route::put('/user/update/{id}', [ProfileController::class, 'updateEditData']);
    Route::delete('/user/delete/{id}', [ProfileController::class, 'deleteUser']);
});

Route::get('/roles', function() {return App\Models\Role::all();});