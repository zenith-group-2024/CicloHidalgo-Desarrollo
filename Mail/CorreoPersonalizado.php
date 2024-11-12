<?php



namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CorreoPersonalizado extends Mailable
{
    use Queueable, SerializesModels;

    public $nombre;
    public $mensaje;

    /**
     * Crea una nueva instancia del mailable.
     *
     * @param string $nombre
     * @param string $mensaje
     */
    public function __construct($nombre, $mensaje)
    {
        $this->nombre = $nombre;
        $this->mensaje = $mensaje;
    }

    /**
     * Construye el mensaje.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.correo_personalizado')
                    ->subject('Correo Personalizado')
                    ->with([
                        'nombre' => $this->nombre,
                        'mensaje' => $this->mensaje,
                    ]);
    }
}
