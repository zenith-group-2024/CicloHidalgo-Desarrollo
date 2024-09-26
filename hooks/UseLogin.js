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
        //setUser(result);
         // Aquí aseguramos que setData establece el evento correctamente
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