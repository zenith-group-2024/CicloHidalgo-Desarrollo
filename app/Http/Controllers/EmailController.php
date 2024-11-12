<?php

namespace App\Http\Controllers;

use App\Mail\CorreoPersonalizado;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Password;
use App\Models\User;
class EmailController extends Controller 
{
    public function enviarCorreoPersonalizado(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
            ]);

            $email = $request->input('email');

            $user = User::where('email', $email)->first();

            if (!$user) {
                return response()->json(['error' => 'El correo no pertenece a un usuario registrado'], 400);
            }


            $token = Password::createToken($user);  

           
            $nombre = $user->nombre;
            $url = url("/reset-password/{$token}");
            $mensaje = "Hola {$nombre},\n\nEste es un mensaje personalizado para ti.\n\nPara restablecer tu contraseña, por favor visita el siguiente enlace: {$url}";

       
            Mail::to($email)->send(new CorreoPersonalizado($nombre, $mensaje));

            return response()->json(['message' => 'Correo de restablecimiento de contraseña enviado exitosamente']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}