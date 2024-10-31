<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ContenidoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
         
        DB::table('contenidos')->insert([
            [
                'titulo' => '5 Productos de ciclismo feos pero que funcionan',
                'descripcion' => '5 Productos de ciclismo feos pero que funcionan   ',
                'video_incrustado' => 'https://www.youtube.com/watch?v=YWbh2wM8cV8',
            ],
            [
                'titulo' => '7 Tendencias que No nos gustan del Ciclismo Moderno',
                'descripcion' => '7 Tendencias que No nos gustan del Ciclismo Moderno',
                'video_incrustado' => 'https://www.youtube.com/watch?v=RebXydeUL8c',
            ],
            [
                'titulo' => 'Si tuviera que elegir UNA SOLA bici, ¿cuál sería?',
                'descripcion' => 'Si tuviera que elegir UNA SOLA bici, ¿cuál sería?',
                'video_incrustado' => 'https://www.youtube.com/watch?v=sXNA55fi_oQ',
            ],
        ]);
    
}
 }
