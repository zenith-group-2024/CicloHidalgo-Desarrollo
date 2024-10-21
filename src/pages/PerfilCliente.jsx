import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../global/GlobalState';
import FetchUser from '../../hooks/FetchUser';
import { useUpdateUser } from '../../hooks/UserUpdate';
import { X } from 'lucide-react';
import Navbar from '../UI/Navbar';

const PerfilCliente = () => {
    const { state } = useContext(GlobalContext);
    const [formData, setFormData] = useState({
        nombre: '',
        contacto: '',
        email: '',
        direccion: '',
        cumpleanos: '',
        boletin: false,
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [editing, setEditing] = useState(false);

    const { formData: fetchedUserData, loading: userLoading } = FetchUser();
    const updateUserData = useUpdateUser();

    useEffect(() => {
        if (!userLoading) {
            setFormData({
                nombre: fetchedUserData.nombre || '',
                contacto: fetchedUserData.contacto || '',
                email: fetchedUserData.email || '',
                direccion: fetchedUserData.direccion || '',
                cumpleanos: fetchedUserData.cumpleanos || '',
                boletin: fetchedUserData.boletin || false,
            });
            setLoading(false);
        }
    }, [userLoading, fetchedUserData]);

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSave = async () => {
        try {
            await updateUserData(formData);
            setEditing(false);
            setMessage('Datos actualizados correctamente.');
        } catch (error) {
            setMessage('Error al actualizar los datos: ' + error.message);
        }
    };

    if (loading) {
        return <p>Cargando datos...</p>;
    }
    return (
        <div className="container mx-auto px-6 py-4">
            <Navbar />
            <div className="max-w-3xl mx-auto bg-white p-8 shadow-md rounded-lg">
                <h2 className="text-3xl font-bold text-center mb-8">Editar Perfil</h2>
    
                {message && (
                    <p className="text-center text-red-500 bg-red-100 p-3 rounded-lg mb-6">
                        Error al actualizar los datos: {message}
                    </p>
                )}
    
                {editing ? (
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="nombre" className="block font-semibold mb-1">Nombre:</label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                className="border rounded-md p-3 w-full shadow-sm focus:ring-2 focus:ring-blue-300"
                            />
                        </div>
    
                        <div>
                            <label htmlFor="contacto" className="block font-semibold mb-1">Contacto:</label>
                            <input
                                type="text"
                                name="contacto"
                                value={formData.contacto}
                                onChange={handleChange}
                                className="border rounded-md p-3 w-full shadow-sm focus:ring-2 focus:ring-blue-300"
                            />
                        </div>
    
                        <div>
                            <label htmlFor="email" className="block font-semibold mb-1">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="border rounded-md p-3 w-full shadow-sm focus:ring-2 focus:ring-blue-300"
                            />
                        </div>
    
                        <div>
                            <label htmlFor="direccion" className="block font-semibold mb-1">Dirección:</label>
                            <input
                                type="text"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleChange}
                                className="border rounded-md p-3 w-full shadow-sm focus:ring-2 focus:ring-blue-300"
                            />
                        </div>
    
                        <div>
                            <label htmlFor="cumpleanos" className="block font-semibold mb-1">Cumpleaños:</label>
                            <input
                                type="date"
                                name="cumpleanos"
                                value={formData.cumpleanos}
                                onChange={handleChange}
                                className="border rounded-md p-3 w-full shadow-sm focus:ring-2 focus:ring-blue-300"
                            />
                        </div>
    
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="boletin"
                                name="boletin"
                                checked={formData.boletin}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="boletin" className="ml-2 block text-sm font-medium text-gray-700">
                                Deseo recibir ofertas especiales
                            </label>
                        </div>
    
                        <button
                            onClick={handleSave}
                            className="w-full bg-blue text-white rounded-md py-3 mt-6 shadow-md hover:bg-blue-600 transition-all"
                        >
                            Guardar
                        </button>
                    </form>
                ) : (
                    <div className="space-y-6">
                        <p><strong>Nombre:</strong> {formData.nombre}</p>
                        <p><strong>Contacto:</strong> {formData.contacto}</p>
                        <p><strong>Email:</strong> {formData.email}</p>
                        <p><strong>Dirección:</strong> {formData.direccion}</p>
                        <p><strong>Cumpleaños:</strong> {formData.cumpleanos}</p>
                        <p><strong>Boletín:</strong> {formData.boletin ? 'Sí' : 'No'}</p>
    
                        <button
                            onClick={() => setEditing(true)}
                            className="w-full bg-red text-white rounded-md py-3 shadow-md hover:bg-red-600 transition-all"
                        >
                            Editar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
    
    
    
};

export default PerfilCliente;
