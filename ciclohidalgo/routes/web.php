<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PasswordResetController;
Route::get('/', function () {
    return view('welcome');
});
Route::get('/reset-password/{token}', [PasswordResetController::class, 'showResetForm'])->name('password.reset');
Route::post('/reset-password', [PasswordResetController::class, 'reset'])->name('password.update');

