<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\Redirect;

class ProfileController extends Controller
{
  
    public function getEditData($id)
    {

        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        return response()->json([
            'name' => $user->name,
            'direccion' => $user->direccion,
            'contacto' => $user->contacto,
            'email' => $user->email,
            'cumpleanos' => $user->cumpleanos,
        ], 200);
    }

    public function deleteUser($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
        $user->delete();
        return response()->json(['message' => 'Usuario eliminado exitosamente'], 200);
    }

    public function edit(Request $request) {}


    public function updateEditData(Request $request, $id)
    {

        $validatedData = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'contacto' => 'sometimes|required|string|max:255',
            'direccion' => 'sometimes|required|string|max:255',
            'cumpleanos' => 'sometimes|nullable|date',
            'email' => 'sometimes|required|email|max:255|unique:users,email,' . $id,
            'boletin' => 'sometimes|required|boolean',
        ]);


        $user = User::find($id);


        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $user->update($validatedData);

        return response()->json(['message' => 'Perfil actualizado exitosamente'], 200);
    }

}
