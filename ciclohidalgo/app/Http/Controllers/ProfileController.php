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
    /**
     * Display the user's profile form.
     */


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

    /* public function getUserData(Request $request)
    {
        //DEBE HABER INICIADO SESION(por eso no se busca con id
        $user = $request->user();

        return response()->json([
            'name' => $user->name,
            'email' => $user->email,
            'contacto' => $user->contacto,
            'direccion' => $user->direccion,
            'cumpleanos' => $user->cumpleanos,
            'boletin' => $user->boletin,
        ]);
    }

    public function updateUserInfo(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'contacto' => 'sometimes|required|string|max:255',
            'direccion' => 'sometimes|required|string|max:255',
            'cumpleanos' => 'sometimes|nullable|date',
            'email' => 'sometimes|required|email|max:255|unique:users,email,' . $request->user()->id,
            'boletin' => 'sometimes|required|boolean',
        ]);

        $user = $request->user();
        $user->update($validatedData);

        return response()->json(['message' => 'Profile updated successfully'], 200);
    } */

    public function updateEditData(Request $request, $id)
    {
        // Validación de los datos recibidos
        $validatedData = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'contacto' => 'sometimes|required|string|max:255',
            'direccion' => 'sometimes|required|string|max:255',
            'cumpleanos' => 'sometimes|nullable|date',
            'email' => 'sometimes|required|email|max:255|unique:users,email,' . $id,
            'boletin' => 'sometimes|required|boolean',
        ]);

        // Encuentra al usuario por su ID
        $user = User::find($id);

        // Si no se encuentra el usuario, devuelve un error 404
        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        // Actualiza el usuario con los datos validados
        $user->update($validatedData);

        return response()->json(['message' => 'Perfil actualizado exitosamente'], 200);
    }

    /**
     * Delete the user's account.
     */
    /* public function destroy(Request $request)
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();
        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Account deleted!'], 200);
    } */
}
