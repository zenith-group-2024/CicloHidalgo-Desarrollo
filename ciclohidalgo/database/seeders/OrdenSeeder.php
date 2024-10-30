<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Orden;
use App\Models\Producto;
use Illuminate\Support\Facades\DB;

class OrdenSeeder extends Seeder
{
    public function run()
    {
        // Array de id de usuarios que no incluyen al admin
        $usuarios = [2, 3, 4];
        
        // Métodos de envío y pago para variedad
        $metodosEnvio = ['envia', 'retiro'];
        $metodosPago = ['SINPE Móvil', 'Efectivo', 'Credomatic (Tasa 0)', 'Banco Nacional', 'Mini Cuotas Banco Nacional'];
        
        for ($i = 0; $i < 6; $i++) {
            $orden = Orden::create([
                'user_id' => $usuarios[array_rand($usuarios)],
                'metodo_envio' => $metodosEnvio[array_rand($metodosEnvio)],
                'nombre' => 'Nombre_' . $i,
                'apellido' => 'Apellido_' . $i,
                'telefono' => '8888-888' . $i,
                'direccion' => 'Dirección_' . $i,
                'direccion_detalles' => 'Detalles de Dirección_' . $i,
                'provincia' => 'Provincia_' . $i,
                'ciudad' => 'Ciudad_' . $i,
                'codigo_postal' => '000' . $i,
                'metodo_pago' => $metodosPago[array_rand($metodosPago)],
                'estado' => $i % 2 == 0 ? 'PENDIENTE' : 'COMPLETO',
                'total' => 10000 + $i * 1500,
            ]);

            // Llamada al método para poblar la tabla pivote con productos
            $this->attachProductos($orden);
        }
    }

    // Método para agregar productos a cada orden
    private function attachProductos($orden)
    {
        // Obtener todos los productos y seleccionar dos al azar
        $productos = Producto::inRandomOrder()->take(2)->get();

        foreach ($productos as $producto) {
            DB::table('orden_producto')->insert([
                'orden_id' => $orden->id,
                'producto_id' => $producto->id,
                'cantidad' => rand(1, 3),
                'precio' => $producto->precio,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
