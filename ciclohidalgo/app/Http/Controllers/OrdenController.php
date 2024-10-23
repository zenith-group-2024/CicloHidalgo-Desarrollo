<?php

namespace App\Http\Controllers;

use App\Models\Orden;
use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrdenController extends Controller
{
    public function registrarOrden(Request $request)
    {
        // Validar la solicitud
        $validatedData = $request->validate([
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

        // Obtener el usuario autenticado
        $user = Auth::user();

        // Calcular el total de la orden
        $total = 0;
        foreach ($validatedData['productos'] as $producto) {
            $productoModel = Producto::find($producto['id']);
            $total += $productoModel->precio * $producto['cantidad'];
        }

        // Crear la orden
        $orden = Orden::create([
            'user_id' => $user->id,
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

        // Asociar los productos a la orden
        foreach ($validatedData['productos'] as $producto) {
            $orden->productos()->attach($producto['id'], [
                'cantidad' => $producto['cantidad'],
                'precio' => Producto::find($producto['id'])->precio,
            ]);
        }

        // Responder con éxito
        return response()->json(['message' => 'Orden registrada con éxito', 'orden_id' => $orden->id], 201);
    }
}