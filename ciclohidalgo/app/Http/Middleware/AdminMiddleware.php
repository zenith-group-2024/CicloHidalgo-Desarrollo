<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check() && Auth::user()->role_id === 1) { //EL NÚMERO DE AQUÍ CORRESPONDE CON EL ID DEL ROL ADMIN, ASUMÍ QUE ES EL 1

            return $next($request);
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }
}
