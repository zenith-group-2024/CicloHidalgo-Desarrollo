<?php

namespace App\Mail;


use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class UserMail extends Mailable
{
    use Queueable, SerializesModels;

    protected $user, $id, $code, $isSuccess, $logo;

    /**
     * @return void
     */
    public function __construct($user, $id, $code)
    {
        $this->user = $user;
        $this->id = $id;
        $this->code = $code;
    }

    /**
     * @return $this
     */

     public function build()
    {
        return $this->view('emails.user')
                    ->with([
                        'user' => $this->user,
                        'id' => $this->id,
                        'code' => $this->code,
                    ])
                    ->subject('Welcome to Our Application');
    }
  
}