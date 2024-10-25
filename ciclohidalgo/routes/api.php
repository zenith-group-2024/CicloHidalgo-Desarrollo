<?php

use App\Http\Controllers\ContenidoController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\AdminUsersController;
use App\Http\Controllers\ProfileController;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use App\Http\Controllers\OrdenController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware(['auth:sanctum'])->group(function () {

});

    Route::get('/admins', [UserController::class, 'listAdmins']);
    Route::post('/admin/create', [UserController::class, 'createAdmin']);
    Route::put('/admin/update/{id}', [UserController::class, 'updateAdmin']);
    Route::delete('/admin/delete/{id}', [UserController::class, 'deleteAdmin']);
    Route::get('/admin/{id}', [UserController::class, 'getAdmin']);
    

Route::get('/productos/all', [ProductoController::class, 'index']);
Route::get('/productos/{id}', [ProductoController::class, 'show']);
Route::post('/productos/crear', [ProductoController::class, 'store']);
Route::post('/productos/update/{id}', [ProductoController::class, 'update']);
Route::delete('/productos/delete/{id}', [ProductoController::class, 'destroy']);

Route::post('/user/login', [UserController::class, 'check'])->name('login');
Route::post('/user/signin', [UserController::class, 'store']);
Route::put('/user/update/{id}', [UserController::class, 'update']);
Route::get('/user/{id}', [UserController::class, 'show']);

Route::post('/actualizar-descuento', [ProductoController::class, 'actualizarDescuento']);
Route::get('/sin-descuento/all', [ProductoController::class, 'noDiscountlist']);
Route::get('/con-descuento/all', [ProductoController::class, 'discountList']);

Route::get('/contenidos/all', [ContenidoController::class, 'index']);
Route::post('/contenido/creacion', [ContenidoController::class, 'store']);
Route::get('/contenido/delete/{id}', [ContenidoController::class, 'destroy']);
Route::put('/contenido/update/{id}', [ContenidoController::class, 'update']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user/getprofile/{id}', [ProfileController::class, 'getEditData']);
    Route::put('/user/update/{id}', [ProfileController::class, 'updateEditData']);
    Route::delete('/user/delete/{id}', [ProfileController::class, 'deleteUser']);
});

Route::post('/registrar-orden', [OrdenController::class, 'registrarOrden']);
Route::get('/ordenes/all', [OrdenController::class, 'getOrdenes']);
Route::get('/ordenes-usuario/{id}', [OrdenController::class, 'getOrdenesByUser']);
Route::delete('/borrar-orden/{id}', [OrdenController::class, 'destroyOrden']);

Route::get('/roles', function() {return App\Models\Role::all();});