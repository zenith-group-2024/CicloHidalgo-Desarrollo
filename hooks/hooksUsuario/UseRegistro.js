import { useState } from 'react';

export const useRegistro = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const register = async (email, password, nombre, direccion, cumpleanos, contacto, boletin) => {
    setIsLoading(true);
    setErrorMessage("");

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
        setErrorMessage(result.message || "Error en el registro.");
        return false;
      }

      return true;
    } catch (error) {
      setErrorMessage("Error de red o problema de conexión.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    errorMessage,
    register,
    setErrorMessage,
  };
};
