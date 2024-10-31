<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ordenes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('metodo_envio');
            $table->string('nombre');
            $table->string('apellido');
            $table->string('telefono');
            $table->string('direccion')->nullable();
            $table->string('direccion_detalles')->nullable();
            $table->string('provincia')->nullable();
            $table->string('ciudad')->nullable();
            $table->string('codigo_postal')->nullable();
            $table->string('metodo_pago')->default('SINPE');
            $table->string('estado')->default('PENDIENTE');
            $table->double('total');
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ordenes');
    }
};
