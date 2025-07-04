<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Producto;
use Illuminate\Http\Request;
use Intervention\Image\Laravel\Facades\Image;
use Illuminate\Support\Facades\Storage;

class ProductoController extends Controller
{
    public function index(Request $request)
    {

        $listaProductos = Producto::all();

        if ($request->is('api/*') || $request->wantsJson()) {

            return response()->json(['productos' => $listaProductos]);
        }
    }

    public function create() {}

    public function store(Request $request)
    {

        $validator = validator($request->all(), [
            'nombre' => ['required'],
            'marca' => ['required'],
            'especificacion' => ['required'],
            'subcategoria' => ['required'],
            'categoria' => ['required'],
            'modelo' => ['required'],
            'precio' => ['required'],
            'imagen' => ['required'],
            'codigo_barras' => ['required'],
            'cantidad' => ['required'],
            'descuento',
            'destacado' => ['required'],
        ]);

        if ($validator->fails()) {
            if ($request->is('api/*') || $request->wantsJson()) {
                return response()->json(['errors' => $validator->errors()], 400);
            }
        }

        $validated = $validator->validated();
        $imagen_64 = $request->input('imagen');
        $extension = explode('/', explode(':', substr($imagen_64, 0, strpos($imagen_64, ';')))[1])[1];
        //$imagen_Replace = substr($imagen_64, 0, strpos($imagen_64, ',') + 1);
        //$imagen = str_replace($imagen_Replace, '', $imagen_64);
        //$imagen = str_replace(' ', '+', $imagen);
        $imagenNombre = 'producto_' . time() . '.' . $extension;
        $path = public_path('images/productos/');
        Image::read($imagen_64)->save($path.$imagenNombre);
        //file_put_contents($path . $imagenNombre, base64_decode($imagen));


        $producto = Producto::create([
            'nombre' => $validated['nombre'],
            'marca' => $validated['marca'],
            'especificacion' => $validated['especificacion'],
            'subcategoria' => $validated['subcategoria'],
            'categoria' => $validated['categoria'],
            'modelo' => $validated['modelo'],
            'precio' => $validated['precio'],
            'imagen' => $imagen_64,
            'codigo_barras' => $validated['codigo_barras'],
            'cantidad' => $validated['cantidad'],
            'destacado' => $validated['destacado']
        ]);



        if ($request->is('api/*') || $request->wantsJson()) {
            return response()->json(['message' => 'producto creado correctamente'], 200);
        }
    }

    public function show(Request $request, String $id)
    {
        $producto = Producto::select(
            'productos.id',
            'productos.nombre',
            'productos.marca',
            'productos.especificacion',
            'productos.subcategoria',
            'productos.categoria',
            'productos.modelo',
            'productos.precio',
            'productos.imagen',
            'productos.codigo_barras',
            'productos.cantidad',
            'productos.descuento',
            'productos.destacado',
        )->where('id', $id)
            ->first();

        if ($request->is('api/*') || $request->wantsJson()) {
            return response()->json(['producto' => $producto]);
        }
    }

    public function edit(string $id) {}

    public function update(Request $request, string $id)
    {
        $validator = validator($request->all(), [
            'nombre' => 'required',
            'marca' => 'required',
            'especificacion' => 'required',
            'subcategoria' => 'required',
            'categoria' => 'required',
            'modelo' => 'required',
            'precio' => 'required',
            'imagen' => 'required',
            'codigo_barras' => 'required',
            'cantidad' => 'required',
            'destacado' => 'required'
        ]);

        if ($validator->fails()) {
            if ($request->is('api/*') || $request->wantsJson()) {
                return response()->json(['errors' => $validator->errors()], 400);
            }
        }

        $validated = $validator->validated();
        $imagen_64 = $request->input('imagen');
        $extension = explode('/', explode(':', substr($imagen_64, 0, strpos($imagen_64, ';')))[1])[1];
        $imagen_Replace = substr($imagen_64, 0, strpos($imagen_64, ',') + 1);
        $imagen = str_replace($imagen_Replace, '', $imagen_64);
        $imagen = str_replace(' ', '+', $imagen);
        $imagenNombre = 'producto_' . time() . '.' . $extension;
        $path = public_path('images/productos/');
        file_put_contents($path . $imagenNombre, base64_decode($imagen));

        $query = Producto::find($id);

        if ($query) {

            $query->update(
                [
                    'nombre' => $validated['nombre'],
                    'marca' => $validated['marca'],
                    'especificacion' => $validated['especificacion'],
                    'subcategoria' => $validated['subcategoria'],
                    'categoria' => $validated['categoria'],
                    'modelo' => $validated['modelo'],
                    'precio' => $validated['precio'],
                    'imagen' => $imagen_64,
                    'codigo_barras' => $validated['codigo_barras'],
                    'cantidad' => $validated['cantidad'],
                    'destacado' => $validated['destacado']
                ]
            );
        }

        if ($request->is('api/*') || $request->wantsJson()) {
            return response()->json(['message' => 'producto actualizado correctamente'], 200);
        }
    }

    public function discount(Request $request, $id)
    {
        $producto = Producto::find($id);

        if (!$producto) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        $producto->descuento = $request->input('descuento');
        $producto->save();

        return response()->json(['message' => 'Descuento actualizado correctamente', 'producto' => $producto]);
    }

    public function destroy(string $id)
    {
        $result = Producto::find($id);
        $result->delete();

        return response()->json(['message' => 'producto borrado correctamente'], 200);
    }

    /////DESCUENTOS
    public function discountlist(Request $request)
    {
        $listaProductos = Producto::where('descuento', '>', 0)->get();

        if ($request->is('api/*') || $request->wantsJson()) {
            return response()->json(['productos' => $listaProductos], 200);
        }

        return response()->json(['message' => 'No se encontraron productos con descuento.'], 200);
    }
    public function noDiscountlist(Request $request)
    {
        $listaProductos = Producto::where('descuento', 0)
        ->get();
        if ($request->is('api/*') || $request->wantsJson()) {
            return response()->json(['productos' => $listaProductos], 200);
        }
        return response()->json(['message' => 'No se encontraron productos con descuento.'], 404);
    }
    public function actualizarDescuento(Request $request)
    {
        $validated = $request->validate([
            'ids' => 'required|array',
            'descuento' => 'required|numeric|min:0|max:100',
        ]);

        foreach ($validated['ids'] as $id) {
            $producto = Producto::find($id);
            if ($producto) {
                $producto->descuento = $validated['descuento'];
                $producto->save();
            }
        }

        return response()->json(['message' => 'Descuentos actualizados!']);
    }

    public function getDestacados()
    {
        $productosDestacados = Producto::where('destacado', true)->get();
        return response()->json(['productos' => $productosDestacados]);
    }
}
