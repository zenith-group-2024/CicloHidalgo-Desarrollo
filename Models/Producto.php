<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'marca',
        'especificacion', 
        'subcategoria', 
        'categoria', 
        'modelo' ,
        'precio',
        'imagen',
        'codigo_barras', 
        'cantidad', 
        'destacado',
    ];

    public function ordenes()
    {
        return $this->belongsToMany(Orden::class)
                    ->withPivot('cantidad', 'precio')
                    ->withTimestamps();
    }
}
