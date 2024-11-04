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
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);
    
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                Log::info('Restableciendo contraseña para el usuario: ' . $user->email);
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->save();
            }
        );
    
        Log::info('Estado del restablecimiento de contraseña: ' . $status);
    
        return $status === Password::PASSWORD_RESET
                    ? redirect()->route('login')->with('status', __($status))
                    : back()->withErrors(['email' => [__($status)]]);
    }
     }

