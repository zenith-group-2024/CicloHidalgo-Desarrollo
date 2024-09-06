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
        Schema::create('ordenes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('productos_id')->constrained();
<<<<<<< HEAD
            $table->foreignId('users_id')->constrained();
            $table->double('entrega')->notNull();
            $table->double('estado_orden')->notNull();
            $table->double('total')->notNull();
=======
            $table->foreignId('clientes_id')->constrained();
            $table->double('entrega');
            $table->double('estado_orden');
            $table->double('total');
>>>>>>> 09fb55b7be6d92971924a1b6bf3105c85ad0d3bb
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ordenes');
    }
};
