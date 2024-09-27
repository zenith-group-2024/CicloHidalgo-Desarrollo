import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../src/global/GlobalState';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  //const { setUser } = useContext(GlobalContext);

    const login = async (email,password) => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/user/login',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                }), 
            }
        );
        const result = await response.json();
        console.log(result);
       
    if (response.ok) {
      // Si el inicio de sesión fue exitoso, almacena el token en localStorage
      localStorage.setItem('authToken', result.token); // Asumiendo que el token está en result.token
      console.log('Token guardado en localStorage:', result.token); // Verifica el token guardado
    } else {
      console.error('Error de inicio de sesión:', result.message); // Muestra el mensaje de error si hay
    }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

  return {
    isLoading,
    login
  };
};