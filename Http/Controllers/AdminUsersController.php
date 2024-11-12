<?php

namespace App\Http\Controllers;


use App\Models\User;
use App\Models\Role;

use Illuminate\Http\Request;

class AdminUsersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with('role')->get();
        return response()->json($users);
    }
    // Esto luego lo podemos cambiar para que 
    // por defecto solo muestre los usuarios
    // con permisos, y que luego se puedan
    // buscar por nombre o algo

    /**
     * Update the specified resource in storage.
     */
    public function updateRole(Request $request, $id)
    {
        $request->validate([
            'role_id' => 'required|exists:roles,id',
        ]);

        $user = User::findOrFail($id);
        $user->role_id = $request->role_id;
        $user->save();

        return response()->json(['message' => 'Rol actualizado!']);
    }
}