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
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'contacto' => ['string', 'max:255'],
            'direccion' => ['string', 'max:255'],
            'password' => ['required', 'string', 'min:8'],
            'cumpleanos' => ['string', 'max:255'],
            'boletin' => ['required', 'boolean', 'max:255', 'unique:users'],

        ], [
            'name.required' => 'Name field is required.',
            'boletin.required' => 'Boletin field is required.',
            'password.required' => 'Password field is required.',
            'email.required' => 'Email field is required.',
            'email.email' => 'Email must be a valid email address.'
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
            'name' => $validated['name'],
            'contacto' => $validated['contacto'],
            'email' => $validated['email'],
            'password' => $password,
            'direccion' => $validated['direccion'],
            'cumpleanos' => $validated['cumpleanos'],
            'boletin' => $validated['boletin']
        ]);

        Mail::to($validated['email'])->send(new UserMail($validated['name'], $user->id, $rand_code));

        if ($request->is('api/*') || $request->wantsJson()) {
            return response()->json(['message' => 'User created successfully.', 'user' => $user], 201);
        }

        return response()->json(['message' => 'registered successfully'], 200);

        if ($request->is('api/*') || $request->wantsJson()) {
          //  return response()->json(['message' => 'User created successfully.', 'user' => $user], 201);
        }

        return response()->json(['message' => 'registered successfully'], 200);
        //return redirect()->route('admin.index')->with('success', 'User created successfully.');
    }

    public function check(Request $request)
    {
        if(!Auth::attempt($request->only('email', 'password')))
        {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user = User::where('email', $request['email'])->firstOrFail();
        
        //$token = $user->createToken('auth_token')->plainTextToken;

        $uid =  $user->id;
        session_start();

        return response()->json($user);
    }

    public function logout()
    {
        //auth()->user()->tokens()->delete(); Esta línea no se necesita de momento, Auth::logout(); ya hace el trabajo de eliminar los tokens, según Codeium
        Auth::logout();
        session_start();
        session_destroy();
        return response()->json(['message' => 'Logged out successfully']);
        //return redirect()->route('admin.login');
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
            'boletin' => ['required', 'boolean', 'max:255', 'unique:users'],

        ], [
            'name.required' => 'Name field is required.',
            'boletin.required' => 'Boletin field is required.',
            'password.required' => 'Password field is required.',
            'email.required' => 'Email field is required.',
            'email.email' => 'Email must be a valid email address.'
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
        $user->name = $validated['name'];
        $user->email = $validated['email'];
        $user->contacto = $validated['contacto'];
        $user->cumpleanos = $validated['cumpleanos'];
        $user->boletin = $validated['boletin'];
        if(!empty($validated['password'])){
            $user->password = Hash::make($validated['password']);
        }
        $user->save();

        if ($request->is('api/*') || $request->wantsJson()) {
            return response()->json(['message' => 'User updated successfully.', 'user' => $user]);
          }

    }

    public function destroy(string $id)
    {
        
    }
}
