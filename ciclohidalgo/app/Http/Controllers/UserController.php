<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Mail\UserMail;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index() {}

    public function create() {}

    public function obtenerUsuarios()
{
    $usuarios = User::select('id', 'nombre', 'contacto', 'direccion', 'email')->get();
    return response()->json($usuarios, 200);
}

    public function listAdmins()
    {
        $admins = User::where('admin', true)->get(['id', 'nombre', 'email', 'contacto', 'direccion']);

        if ($admins->isEmpty()) {
            return response()->json(['message' => 'No se encontraron administradores'], 404);
        }

        return response()->json($admins);
    }
    public function store(Request $request)
    {
        $validator = validator($request->all(), [
            'nombre' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'contacto' => ['nullable', 'string', 'max:255'],
            'direccion' => ['nullable', 'string', 'max:255'],
            'password' => [
                'required',
                'string',
                'min:8',
                'regex:/[A-Z]/',        
                'regex:/[@$!%*?&]/'  
            ],
            'cumpleanos' => ['nullable', 'string', 'max:255'],
            'boletin' => ['required', 'boolean'],
            'admin' => ['nullable', 'boolean']
        ], [
            'nombre.required' => 'El campo nombre es requerido.',
            'password.required' => 'El campo contraseña es requerido.',
            'password.min' => 'La contraseña debe tener al menos 8 caracteres.',
            'email.required' => 'El campo email es requerido.',
            'email.email' => 'El email debe ser una dirección de correo válida.',
            'email.unique' => 'El email ya ha sido registrado.',
            'boletin.required' => 'El campo boletín es obligatorio.',
            'boletin.boolean' => 'El boletín debe ser un valor booleano.'
        ]);
    
       
        if ($validator->fails()) {
            $errors = $validator->errors();
    
            $customErrors = [];
    
             if (strlen($request->password) < 8) {
            $customErrors[] = 'La contraseña debe tener al menos 8 caracteres.';
        }
            if (!preg_match('/[A-Z]/', $request->password)) {
                $customErrors[] = 'La contraseña debe contener al menos una letra mayúscula.';
            }
            if (!preg_match('/[@$!%*?&]/', $request->password)) {
                $customErrors[] = 'La contraseña debe contener al menos un carácter especial (@$!%*?&).';
            }
    
          
            $allErrors = array_merge(
                $errors->get('password') ? [] : $errors->all(),
                $customErrors
            );
    
            return response()->json(['message' => $allErrors], 400);
        }
    
        
        $validated = $validator->validated();
        $validated['password'] = Hash::make($validated['password']);
    
        $user = User::create($validated);
    
        return response()->json(['message' => 'Usuario creado exitosamente.', 'user' => $user], 201);
    }


    public function check(Request $request)
    {
        $validator = validator($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Contraseña o email incorrectos intente de nuevo '], 401);
        }

        $user = Auth::user();
        $user = User::where('email', $request['email'])->firstOrFail();

        if ($user) {
            return response()->json([
                'user' => $user,
            ]);
        }

        return response()->json(['message' => 'Autenticación fallida'], 400);
    }

    public function logout()
    {

        Auth::logout();
        session_start();
        session_destroy();
        return response()->json(['message' => 'Cierre de sesión exitoso']);
    }

    public function show(string $id)
    {

        $user = User::select(
            'users.nombre',
            'users.contacto',
            'users.direccion',
            'users.email',
            'users.cumpleanos',
            'users.boletin',
            'users.admin'
        )->where('id', $id)->first();


        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }


        return response()->json($user);
    }


    public function edit(string $id) {}

    public function update(Request $request, string $id)
    {
        $validator = validator($request->all(), [
            'nombre' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . $id],
            'contacto' => ['string', 'max:255'],
            'direccion' => ['string', 'max:255'],
            'cumpleanos' => ['string', 'max:255'],
            'boletin' => ['required', 'boolean'],
        ], [
            'nombre.required' => 'El campo nombre es requerido.',
            'boletin.required' => 'El campo boletín es requerido.',
            'email.required' => 'El campo email es requerido.',
            'email.email' => 'El email debe ser una dirección de correo válida.'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $validated = $validator->validated();
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'Usuario no encontrado.'], 404);
        }

        $user->nombre = $validated['nombre'];
        $user->email = $validated['email'];
        $user->contacto = $validated['contacto'];
        $user->direccion = $validated['direccion'];
        $user->cumpleanos = $validated['cumpleanos'];
        $user->boletin = $validated['boletin'];


        $user->save();

        return response()->json(['message' => 'Usuario actualizado exitosamente.', 'user' => $user]);
    }


    public function destroy(string $id)
    {
        $user = User::find($id);
        $user->delete();

        return response()->json(['message' => 'Usuario eliminado exitosamente.']);
    }

    public function getAdmins()
    {
        $admins = User::where('admin', true)->get();

        return response()->json($admins);
    }

    public function createAdmin(Request $request)
    {
        $validator = validator($request->all(), [
            'nombre' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
            'contacto' => ['nullable', 'string', 'max:255'],
            'direccion' => ['nullable', 'string', 'max:255'],
            'cumpleanos' => ['nullable', 'string', 'max:255']
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $validated = $validator->validated();
        $user = User::create([
            'nombre' => $validated['nombre'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'contacto' => $validated['contacto'] ?? null,
            'direccion' => $validated['direccion'] ?? null,
            'cumpleanos' => $validated['cumpleanos'] ?? null,
            'boletin' => false,
            'admin' => true
        ]);

        return response()->json(['message' => 'Administrador creado exitosamente.', 'user' => $user], 201);
    }

    public function updateAdmin(Request $request, $id)
    {
        $user = User::findOrFail($id);

        if (!$user->admin) {
            return response()->json(['message' => 'No autorizado para editar este usuario.'], 403);
        }

        $validator = validator($request->all(), [
            'nombre' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . $id],
            'password' => ['nullable', 'string', 'min:8'],
            'contacto' => ['nullable', 'string', 'max:255'],
            'direccion' => ['nullable', 'string', 'max:255'],
            'cumpleanos' => ['nullable', 'string', 'max:255']
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $validated = $validator->validated();
        $user->update([
            'nombre' => $validated['nombre'],
            'email' => $validated['email'],
            'password' => !empty($validated['password']) ? Hash::make($validated['password']) : $user->password,
            'contacto' => $validated['contacto'] ?? $user->contacto,
            'direccion' => $validated['direccion'] ?? $user->direccion,
            'cumpleanos' => $validated['cumpleanos'] ?? $user->cumpleanos,
            'boletin' => false,
        ]);

        return response()->json(['message' => 'Administrador actualizado exitosamente.', 'user' => $user]);
    }

    public function deleteAdmin($id)
    {
        $user = User::findOrFail($id);

        if (!$user->admin) {
            return response()->json(['message' => 'No autorizado para eliminar este usuario.'], 403);
        }

        $user->delete();

        return response()->json(['message' => 'Administrador eliminado exitosamente.']);
    }

    public function getAdmin($id)
    {
        $user = User::findOrFail($id);
        if (!$user->admin) {
            return response()->json(['message' => 'Usuario no es administrador.'], 403);
        }
        return response()->json($user);
    }
}
