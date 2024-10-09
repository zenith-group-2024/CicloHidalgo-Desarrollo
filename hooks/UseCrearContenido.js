import { useState } from "react";
export const useCrearContenido = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
  
    const crear = async (titulo,descripcion, video_incrustado) => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/contenido/crear', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            titulo,
            descripcion,
            video_incrustado
          }),
        });
        if (response.ok){
          setMessage('Video creado correctamente');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      
      }
    };
    
    return {
      isLoading,
      crear,
      message,
    };
  };