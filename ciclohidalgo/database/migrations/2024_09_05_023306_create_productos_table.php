<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('marca');
            $table->string('especificacion')->nullable();            
            $table->string('subcategoria');
            $table->string('categoria');
            $table->string('modelo')->nullable();
            $table->double('precio');
            //$table->string('imagen')->nullable();
            $table->string('codigo_barras');
            $table->double('descuento')->default(0);
            $table->integer('cantidad');
            $table->boolean('destacado')->default(false);
            $table->timestamps();
        });

        DB::statement('ALTER TABLE productos ADD imagen LONGBLOB');
    }

    public function down(): void
    {
        Schema::dropIfExists('productos');
    }
};
