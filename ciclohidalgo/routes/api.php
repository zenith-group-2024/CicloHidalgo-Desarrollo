<?php

use App\Http\Controllers\ClienteController;
use App\Http\Controllers\ProductoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/productos/all', [ProductoController::class, 'index']);
Route::post('/user/login', [ClienteController::class, 'check']);
Route::post('/user/singin', [ClienteController::class, 'store']);