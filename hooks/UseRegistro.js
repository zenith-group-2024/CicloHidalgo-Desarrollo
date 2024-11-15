import { useState } from 'react';

export const useRegistro = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const register = async (email, password, nombre, direccion, cumpleanos, contacto, boletin) => {
    setError(""); 
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/user/signin', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          nombre,
          direccion,
          cumpleanos,
          contacto,
          boletin,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Extrae los mensajes de error y combínalos en un solo string
        const errorMessages = [];

        if (result.errors?.password) {
          errorMessages.push(result.errors.password.join(', '));
        }
        if (result.errors?.email) {
          errorMessages.push(result.errors.email.join(', '));
        }
        // Añadir otros errores si los hay
        // ...

        // Combinar mensajes y actualizar el estado de error
        setError(errorMessages.length > 0 ? errorMessages.join(' | ') : "Error en el registro.");
        return false;
      }

      return true; 
    } catch (error) {
      console.error(error);
      setError("Error en la conexión con el servidor.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    register,
    error,
  };
};
