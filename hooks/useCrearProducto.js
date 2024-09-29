import { useState } from "react";

export const useCrearProducto = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
  
    const crear = async (nombre,marca,especificacion,subcategoria,categoria,modelo,precio,imagen,codigo_barras,cantidad,destacado) => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/productos/crear', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            marca,
            especificacion,
            subcategoria,
            categoria,
            modelo,
            precio,
            imagen,
            codigo_barras,
            cantidad,
            destacado,
          }),
        });
        const result = await response.json();
        setMessage(result.message);
        
       
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        console.log(message);
      }
    };
  
    return {
      isLoading,
      crear,
      message,
    };
  };