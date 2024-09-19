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
                'name' => 'Juan Pérez',
                'contacto' => '555-1234',
                'direccion' => 'Calle Falsa 123',
                'email' => 'juan.perez@example.com',
                'password' => Hash::make('password123'),
                'cumpleanos' => '1985-07-12',
                'boletin' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Ana Gómez',
                'contacto' => '555-5678',
                'direccion' => 'Avenida Siempre Viva 456',
                'email' => 'ana.gomez@example.com',
                'password' => Hash::make('password456'),
                'cumpleanos' => '1990-11-20',
                'boletin' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Luis Martínez',
                'contacto' => '555-8765',
                'direccion' => 'Boulevard de los Sueños 789',
                'email' => 'luis.martinez@example.com',
                'password' => Hash::make('password789'),
                'cumpleanos' => null,
                'boletin' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}