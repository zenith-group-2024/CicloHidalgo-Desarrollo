<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    public function index(Request $request)
    {
        
        $listaProductos = Producto::all();

        if($request->is('api/*') || $request->wantsJson()){
            
            return response()->json(['productos' => $listaProductos]);
        
        }
    }

    public function create()
    {
        
    }

    public function store(Request $request)
    {
        
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

        $file = $request->file('imagen');
        $file_name = 'producto_'. $file->getClientOriginalName().'.'.$file->getClientOriginalExtension();
        $path = public_path('images/productos/');
        $file -> move($path, $file_name);

        $producto = Producto::create([
            'marca' => $request->marca,
            'especificacion' => $request->especificacion,
            'subcategoria' => $request->subcategoria,
            'categoria' => $request->categoria,
            'modelo' => $request->modelo,
            'precio' => $request->precio,
            'imagen' => 'images/productos/'.$file_name,
            'codigo_barras' => $request->codigo_barras,
            'cantidad' => $request->cantidad,
            'destacado' => $request->destacado
        ]);
    }

    public function show(Request $request, String $id)
    {
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

        if ($request->is('api/*') || $request->wantsJson()) {
            return response()->json(['producto' => $producto]);
        }

    }

    public function edit(string $id)
    {
        
    }

    public function update(Request $request, string $id)
    {
        $file = $request->file('imagen');
        $file_name = 'producto_'. $file->getClientOriginalName().'.'.$file->getClientOriginalExtension();
        $path = public_path('images/productos/');
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
                    'imagen' => 'images/productos/'.$file_name,
                    'codigo_barras' => $request->codigo_barras,
                    'cantidad' => $request->cantidad,
                    'destacado' => $request->destacado
                ]
            );

        }
    }

    public function destroy(string $id)
    {
        $result = Producto::find($id);
        $result -> delete(); 
    }
}
