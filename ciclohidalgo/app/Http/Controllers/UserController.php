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
    $validator = validator($request->all(), [
        'email' => 'required|email',
        'password' => 'required|string|min:8',
    ]);

    if (!Auth::attempt($request->only('email', 'password'))) {
        return response()->json(['message' => 'No autorizado'], 401);
    }

    $user = User::where('email', $request['email'])->firstOrFail();
    
    if ($user) {
        $token = $user->createToken('TokenName')->plainTextToken;

        return response()->json([
            'token' => $token, 
            'user' => $user
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

    public function getAdmins()
    {
        $admins = User::where('admin', true)->get();

        return response()->json($admins);
    }
}
