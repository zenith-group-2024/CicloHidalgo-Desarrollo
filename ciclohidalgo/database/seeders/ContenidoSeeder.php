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
                'titulo' => 'Video de perritos',
                'descripcion' => 'video de perritos',
                'video_incrustado' => 'https://www.youtube.com/watch?v=H4JE6XDR6UE',
            ],
        ]);
    
}
 }
