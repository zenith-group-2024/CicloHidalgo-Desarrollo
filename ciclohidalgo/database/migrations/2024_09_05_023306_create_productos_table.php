<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->string('marca')->notNull();
            $table->string('especificacion');            
            $table->string('subcategoria')->notNull();
            $table->string('categoria')->notNull();
            $table->double('precio')->notNull();
            $table->string('imagen');
            $table->string('codigo_barras')->notNull();
            $table->integer('cantidad')->notNull();
            $table->boolean('destacado')->notNull();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productos');
    }
};
