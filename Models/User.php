<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'users';
    /**
     * @var array<int, string>
     */
    protected $fillable = [
        'nombre',
        'contacto',
        'direccion',
        'role_id',
        'email',
        'password',
        'cumpleanos',
        'boletin',
        'admin',
    ];

    /**
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        
    ];

    /**
     * @return array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'boletin' => 'boolean',
        'admin' => 'boolean',
    ];

    protected static function booted()
    {
        static::creating(function ($user) {
            if ($user->admin === null) {
                $user->admin = false;
            }
        });
    }

}
