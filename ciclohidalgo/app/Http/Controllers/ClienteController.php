<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Mail\UserMail;
use Illuminate\Http\Request;
use App\Models\Cliente;
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
        $validator = validator($request->all(), [
            'nombre' => ['required', 'string', 'max:255'],
            'contacto' => ['string', 'max:255', 'unique:clientes'],
            'direccion' => ['string', 'max:255'],
            'correo' => ['required', 'string', 'email', 'max:255', 'unique:clientes'],
            'contrasena' => ['required', 'string', 'min:8'],
            'cumpleanos' => ['date'],
            'boletin' => ['required','boolean']
            
        ], [
            'nombre.required' => 'this field is required.',
            'contrasena.required' => 'this field is required.',
            'corrreo.correo' => 'this field is required.',
            'boletin.boletin' => 'this field is required.'
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
        $password = Hash::make($validated['contrasena']);
        $rand_code = random_int(100000, 999999);

        // Crear usuario en la base de datos
        $user = Cliente::create([
            'nombre' => $validated['nombre'],
            'contacto' => $validated['contacto'],
            'direccion' => $validated['direccion'],
            'correo' => $validated['correo'],
            'contrasena' => $password,
            'cumpleanos' => $validated['cumpleanos'],
            'boletin' => $validated['boletin'],
        ]);

        // Enviar correo electrónico
        Mail::to($validated['correo'])->send(new UserMail($validated['nombre'], $user->id, $rand_code));

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
