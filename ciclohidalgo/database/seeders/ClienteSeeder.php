<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ClienteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('clientes')->insert([
            [
                'nombre' => 'Juan Pérez',
                'contacto' => '555-1234',
                'direccion' => 'Calle Falsa 123',
                'correo' => 'juan.perez@example.com',
                'contrasena' => Hash::make('password123'),
                'cumpleanos' => '1985-07-12',
                'boletin' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Ana Gómez',
                'contacto' => '555-5678',
                'direccion' => 'Avenida Siempre Viva 456',
                'correo' => 'ana.gomez@example.com',
                'contrasena' => Hash::make('password456'),
                'cumpleanos' => '1990-11-20',
                'boletin' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Luis Martínez',
                'contacto' => '555-8765',
                'direccion' => 'Boulevard de los Sueños 789',
                'correo' => 'luis.martinez@example.com',
                'contrasena' => Hash::make('password789'),
                'cumpleanos' => null,
                'boletin' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}