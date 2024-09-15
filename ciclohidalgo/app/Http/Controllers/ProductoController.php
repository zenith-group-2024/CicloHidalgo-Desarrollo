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
        $request->validate([
            'marca' => 'required',
            'especificacion' => 'required',
            'subcategoria' => 'required',
            'categoria' => 'required',
            'modelo' => 'required',
            'precio' => 'required',
            'imagen' => 'required|file|mimes:jpg,png|max:2048',
            'codigo_barras' => 'required',
            'cantidad' => 'required',
            'destacado' => 'required'
        ]);

        $file = $request->file('image');
        $file_name = 'producto_'. time(). '.'.$file->getClientOriginalExtension();
        $path = public_path('images/');
        $file -> move($path, $file_name);

        $producto = Producto::create([
            'marca' => $request->marca,
            'especificacion' => $request->especificacion,
            'subcategoria' => $request->subcategoria,
            'categoria' => $request->categoria,
            'modelo' => $request->modelo,
            'precio' => $request->precio,
            'imagen' => 'images/'.$file_name,
            'codigo_barras' => $request->codigo_barras,
            'cantidad' => $request->cantidad,
            'destacado' => $request->destacado
        ]);

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
        $file = $request->file('image');
        $file_name = 'producto_'. time(). '.'.$file->getClientOriginalExtension();
        $path = public_path('images/');
        $file -> move($path, $file_name);

        $query = Producto::find($id);

        if ($query){

            $query->update(
                [
                    'marca' => $request->marca,
                    'especificacion' => $request->especificacion,
                    'subcategoria' => $request->subcategoria,
                    'categoria' => $request->categoria,
                    'modelo' => $request->modelo,
                    'precio' => $request->precio,
                    'imagen' => 'images/'.$file_name,
                    'codigo_barras' => $request->codigo_barras,
                    'cantidad' => $request->cantidad,
                    'destacado' => $request->destacado
                ]
            );

        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $result = Producto::find($id);
        $result -> delete();

        
    }
}
