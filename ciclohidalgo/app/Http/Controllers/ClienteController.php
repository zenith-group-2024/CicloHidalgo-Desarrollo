<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Mail\UserMail;
use Illuminate\Http\Request;
use App\Models\Cliente;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validar los datos del formulario
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'username' => ['required', 'string', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8']
        ], [
            'name.required' => 'Name field is required.',
            'username.required' => 'Username field is required.',
            'password.required' => 'Password field is required.',
            'email.required' => 'Email field is required.',
            'email.email' => 'Email must be a valid email address.'
        ]);

        // Manejar errores de validación
        if ($validator->fails()) {
            if ($request->is('api/*') || $request->wantsJson()) {
                return response()->json(['errors' => $validator->errors()], 400);
            } else {
                return redirect()->back()->withErrors($validator)->withInput();
            }
        }

        // Obtener datos validados
        $validated = $validator->validated();
        $password = Hash::make($validated['password']);
        $rand_code = random_int(100000, 999999);

        // Crear usuario en la base de datos
        $user = Cliente::create([
            'name' => $validated['name'],
            'username' => $validated['username'],
            'email' => $validated['email'],
            'password' => $password,
            'user_type' => 0,
            'courses_id' => json_encode([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
        ]);

        // Enviar correo electrónico
        Mail::to($validated['email'])->send(new UserMail($validated['name'], $user->id, $rand_code));

        // Retornar respuesta JSON si es una solicitud API
        if ($request->is('api/*') || $request->wantsJson()) {
            return response()->json(['message' => 'User created successfully.', 'user' => $user], 201);
        }

        return response()->json(['message' => 'registered successfully'], 200);
        // Redirigir a la vista de administración
        //return redirect()->route('admin.index')->with('success', 'User created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    public function login(Request $request)
    {

        if(!Auth::attempt($request->only('email', 'password')))
        {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user = Cliente::where('email', $request['email'])->firstOrFail();
        
        $token = $user->createToken('auth_token')->plainTextToken;

        $uid =  $user->id;

        session_start();

        return response()->json($user);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();
        Auth::logout();
        //destroy session and variables
        session_start();
        session_destroy();
        return response()->json(['message' => 'Logged out successfully']);
        //return redirect()->route('admin.login');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
