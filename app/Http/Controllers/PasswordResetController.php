<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class PasswordResetController extends Controller
{
   
    public function showResetForm($token)
    {
        return view('auth.reset-password', ['token' => $token]);
    }

    
    public function reset(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|confirmed|min:8',
            'token' => 'required'
        ]);
    
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                \Log::info("Usuario: {$user->email}, Nueva contraseña: {$password}");
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->save();
            }
        );
    
        return $status === Password::PASSWORD_RESET
                    ? redirect()->route('login')->with('status', __($status))
                    : back()->withErrors(['email' => __($status)]);
    }
     }

