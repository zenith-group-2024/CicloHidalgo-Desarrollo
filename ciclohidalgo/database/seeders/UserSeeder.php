<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'nombre' => 'Admin',
                'contacto' => '1111-1111',
                'direccion' => 'Calle Admin',
                'email' => 'admin@example.com',
                'password' => Hash::make('administrator'),
                'cumpleanos' => '1985-07-12',
                'boletin' => false,
                'admin' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Juan Pérez',
                'contacto' => '555-1234',
                'direccion' => 'Calle Falsa 123',
                'email' => 'juan.perez@example.com',
                'password' => Hash::make('password123'),
                'cumpleanos' => '1985-07-12',
                'boletin' => true,
                'admin' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Ana Gómez',
                'contacto' => '555-5678',
                'direccion' => 'Avenida Siempre Viva 456',
                'email' => 'ana.gomez@example.com',
                'password' => Hash::make('password456'),
                'cumpleanos' => '1990-11-20',
                'boletin' => false,
                'admin' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Luis Martínez',
                'contacto' => '555-8765',
                'direccion' => 'Boulevard de los Sueños 789',
                'email' => 'luis.martinez@example.com',
                'password' => Hash::make('password789'),
                'cumpleanos' => null,
                'boletin' => true,
                'admin' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}