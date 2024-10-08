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
    public function index()
    {
    }

    public function create()
    {
        
    }

    public function listAdmins()
    {
        $admins = User::where('admin', true)->get();

        return response()->json($admins);
    }
    public function store(Request $request)
    {
        $validator = validator($request->all(), [
            'nombre' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'contacto' => ['string', 'max:255'],
            'direccion' => ['string', 'max:255'],
            'password' => ['required', 'string', 'min:8'],
            'cumpleanos' => ['string', 'max:255'],
            'boletin' => ['required', 'boolean'],
            'admin' => ['required', 'boolean']
        ], [
            'nombre.required' => 'El campo nombre es requerido.',
            'password.required' => 'El campo contraseña es requerido.',
            'email.required' => 'El campo email es requerido.',
            'email.email' => 'El email debe ser una dirección de correo válida.'
        ]);

        if ($validator->fails()) {
            if ($request->is('api/*') || $request->wantsJson()) {
                return response()->json(['errors' => $validator->errors()], 400);
            } else {
                return redirect()->back()->withErrors($validator)->withInput();
            }
        }

        $validated = $validator->validated();
        $password = Hash::make($validated['password']);
        $rand_code = random_int(100000, 999999);

        $user = User::create([
            'nombre' => $validated['nombre'],
            'contacto' => $validated['contacto'],
            'email' => $validated['email'],
            'password' => $password,
            'direccion' => $validated['direccion'],
            'cumpleanos' => $validated['cumpleanos'],
            'boletin' => $validated['boletin'],
            'admin' => $validated['admin']
        ]);

        // Mail::to($validated['email'])->send(new UserMail($validated['name'], $user->id, $rand_code));

        if ($request->is('api/*') || $request->wantsJson()) {
            return response()->json(['message' => 'Usuario creado exitosamente.', 'user' => $user], 201);
        }

        if ($request->is('api/*') || $request->wantsJson()) {
          
        }

        return response()->json(['message' => 'Usuario Registrado'], 200);
        
    }

    public function check(Request $request)
    {
        if(!Auth::attempt($request->only('email', 'password')))
        {
            return response()->json(['message' => 'No autorizado'], 401);
        }

        $user = User::where('email', $request['email'])->firstOrFail();
        $uid =  $user->id;
        $user = Auth::user();
        $token = $user->createToken('ciclohidalgo')->plainTextToken;
        session_start();

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
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
        $user = User::findOrFail($id);

    if (!Auth::user()->admin || !$user->admin) {
        return response()->json(['message' => 'No autorizado'], 403);
    }

    return response()->json($user);
    }

    public function edit(string $id)
    {
        
    }

    public function update(Request $request, string $id)
    {
        
        $validator = validator($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'.$id],
            'contacto' => ['string', 'max:255'],
            'direccion' => ['string', 'max:255'],
            'password' => ['nullable', 'string', 'min:8'],
            'cumpleanos' => ['string', 'max:255'],
            'boletin' => ['required', 'boolean'],

        ], [
            'nombre.required' => 'El campo nombre es requerido.',
            'boletin.required' => 'El campo boletín es requerido.',
            'password.required' => 'El campo contraseña es requerido.',
            'email.required' => 'El campo email es requerido.',
            'email.email' => 'El email debe ser una dirección de correo válida.'
        ]);

        if ($validator->fails()) {
            if ($request->is('api/*') || $request->wantsJson()) {
                return response()->json(['errors' => $validator->errors()], 400);
            } else {
                return redirect()->back()->withErrors($validator)->withInput();
            }
        }

        $validated = $validator->validated();

        $user = User::find($id);
        $user->nombre = $validated['nombre'];
        $user->email = $validated['email'];
        $user->contacto = $validated['contacto'];
        $user->direccion = $validated['direccion'];
        $user->cumpleanos = $validated['cumpleanos'];
        $user->boletin = $validated['boletin'];
        if(!empty($validated['password'])){
            $user->password = Hash::make($validated['password']);
        }
        $user->save();

        if ($request->is('api/*') || $request->wantsJson()) {
            return response()->json(['message' => 'Usuario actualizado exitosamente.', 'user' => $user]);
          }

    }

    public function destroy(string $id)
    {
        $user = User::find($id);
        $user->delete();

        return response()->json(['message' => 'Usuario eliminado exitosamente.']);
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
        'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,'.$id],
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
}
