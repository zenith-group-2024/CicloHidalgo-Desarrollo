<?php

namespace App\Http\Controllers;

use App\Models\Orden;
use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrdenController extends Controller
{

    public function getOrdenes()
    {
        $ordenes = Orden::with(['user', 'productos'])->get();
        return response()->json($ordenes);
    }

    public function getOrdenesByUser($id)
{
    $ordenes = Orden::with('productos')->where('user_id', $id)->get();
    return response()->json($ordenes);
}

    public function destroyOrden($id)
{
    $orden = Orden::find($id);

    if (!$orden) {
        return response()->json(['error' => 'Orden no encontrada'], 404);
    }

    $orden->delete();

    return response()->json(['message' => 'Orden eliminada correctamente'], 200);
}

    public function registrarOrden(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'metodo_envio' => 'required|string',
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            'telefono' => 'required|string|max:20',
            'direccion' => 'nullable|string|max:255',
            'direccion_detalles' => 'nullable|string|max:255',
            'provincia' => 'nullable|string|max:255',
            'ciudad' => 'nullable|string|max:255',
            'codigo_postal' => 'nullable|string|max:10',
            'metodo_pago' => 'required|string',
            'productos' => 'required|array',
            'productos.*.id' => 'required|exists:productos,id',
            'productos.*.cantidad' => 'required|integer|min:1',
        ]);

        $total = 0;
        foreach ($validatedData['productos'] as $producto) {
            $productoModel = Producto::find($producto['id']);
            $total += $productoModel->precio * $producto['cantidad'];
        }

        $orden = Orden::create([
            'user_id' => $validatedData['user_id'],
            'metodo_envio' => $validatedData['metodo_envio'],
            'nombre' => $validatedData['nombre'],
            'apellido' => $validatedData['apellido'],
            'telefono' => $validatedData['telefono'],
            'direccion' => $validatedData['direccion'],
            'direccion_detalles' => $validatedData['direccion_detalles'],
            'provincia' => $validatedData['provincia'],
            'ciudad' => $validatedData['ciudad'],
            'codigo_postal' => $validatedData['codigo_postal'],
            'metodo_pago' => $validatedData['metodo_pago'],
            'total' => $total,
        ]);
        foreach ($validatedData['productos'] as $producto) {
            $orden->productos()->attach($producto['id'], [
                'cantidad' => $producto['cantidad'],
                'precio' => Producto::find($producto['id'])->precio,
            ]);
        }
        return response()->json(['message' => 'Orden registrada con éxito', 'orden_id' => $orden->id], 201);
    }
}