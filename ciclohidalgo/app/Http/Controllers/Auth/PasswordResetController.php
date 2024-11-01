<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

class PasswordResetController extends Controller
{
    public function enviarEnlaceRestablecimiento(Request $request)
    {
    
        $request->validate(['email' => 'required|email|exists:users,email']);


        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status === Password::RESET_LINK_SENT) {
            return response()->json(['message' => 'Enlace de recuperación enviado.'], 200);
        }

        return response()->json(['message' => 'Error al enviar el enlace.'], 500);
    }
}
