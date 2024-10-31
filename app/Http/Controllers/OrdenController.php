<?php

namespace App\Http\Controllers;

use App\Models\Orden;
use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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
            'direccion' => $validatedData['direccion'] ?? null,
            'direccion_detalles' => $validatedData['direccion_detalles'] ?? null,
            'provincia' => $validatedData['provincia'] ?? null,
            'ciudad' => $validatedData['ciudad'] ?? null,
            'codigo_postal' => $validatedData['codigo_postal'] ?? null,
            'metodo_pago' => $validatedData['metodo_pago'],
            'estado' => 'PENDIENTE',
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

    public function ordenCompleta($id)
    {
        $orden = Orden::find($id);
        if (!$orden) {
            return response()->json(['mensaje' => 'Orden no encontrada'], 404);
        }
        $orden->estado = 'COMPLETO';
        $orden->save();
        return response()->json(['mensaje' => 'Orden completada', 'orden' => $orden], 200);
    }

    public function toggleEstadoOrden($id)
    {
        $orden = Orden::find($id);
        if (!$orden) {
            return response()->json(['error' => 'Orden no encontrada'], 404);
        }
        $orden->estado = $orden->estado === 'PENDIENTE' ? 'COMPLETO' : 'PENDIENTE';
        $orden->save();
        return response()->json(['mensaje' => 'Estado de la orden actualizado exitosamente', 'estado' => $orden->estado], 200);
    }

    public function getTopProductosVendidos()
    {
        $topProductos = DB::table('orden_producto')
            ->join('ordenes', 'orden_producto.orden_id', '=', 'ordenes.id')
            ->select('orden_producto.producto_id', DB::raw('SUM(orden_producto.cantidad) as total_cantidad'))
            ->where('ordenes.estado', 'COMPLETO')
            ->groupBy('orden_producto.producto_id')
            ->orderByDesc('total_cantidad')
            ->limit(5)
            ->get();

        $productosConInfo = Producto::whereIn('id', $topProductos->pluck('producto_id'))
            ->get()
            ->map(function ($producto) use ($topProductos) {
                $producto->total_cantidad = $topProductos->firstWhere('producto_id', $producto->id)->total_cantidad;
                return $producto;
            });

        return response()->json(['top_productos' => $productosConInfo]);
    }
}
