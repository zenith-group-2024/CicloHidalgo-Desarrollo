import React, { useState, useEffect, useContext } from 'react';
import { X } from 'lucide-react';
import { GlobalContext } from '../GlobalState.jsx';

const PerfilCliente = () => {
    const { token } = useContext(GlobalContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        contacto: '',
        email: '',
        direccion: '',
        cumpleanos: '',
    });
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchUserData = async (token) => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/user/data', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
    
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
    
                const data = await response.json();
                console.log(data);
                const { name, contacto, email, direccion, cumpleanos } = data;
                setFormData({ name, contacto, email, direccion, cumpleanos });
                setAuthenticated(true);
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
                setAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };
    
        // Llama a la función pasando el token
        fetchUserData(token);
    }, [token]);
    

    if (loading) {
        return <p>Cargando datos...</p>; 
    }

    if (!authenticated) {
        return <p>No has iniciado sesión. Por favor, inicia sesión para ver tu perfil.</p>;
    }

    // Resto del componente...

    return (
        <div className="flex flex-col items-center">
            {/* Aquí sigue tu código para el modal y el resto del componente */}
        </div>
    );
};

export default PerfilCliente;
