<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $listaProductos = Producto::all();

        if($request->is('api/*') || $request->wantsJson()){
            
            return response()->json(['productos' => $listaProductos]);
        
        }
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, String $id)
    {
        //
        $producto =Producto::select(
            'productos.id',
            'productos.marca',
            'productos.especificacion',
            'productos.subcategoria',
            'productos.categoria',
            'productos.modelo',
            'productos.precio',
            'productos.imagen',
            'productos.codigo_barras',
            'productos.cantidad',
            'productos.destacado',   
        )->where('id',$id)
        ->first();

        // Determinar si la solicitud espera una respuesta JSON
        if ($request->is('api/*') || $request->wantsJson()) {
            // Retornar el evento como una respuesta JSON
            return response()->json(['event' => $producto]);
        }

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
