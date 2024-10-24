<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Producto;

class Orden extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'metodo_envio',
        'nombre',
        'apellido',
        'telefono',
        'direccion',
        'direccion_detalles',
        'provincia',
        'ciudad',
        'codigo_postal',
        'metodo_pago',
        'total',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function productos()
    {
        return $this->belongsToMany(Producto::class)
                    ->withPivot('cantidad', 'precio')
                    ->withTimestamps();
    }
}
