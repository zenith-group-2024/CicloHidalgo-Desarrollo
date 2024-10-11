import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../global/GlobalState'; 
import FetchUser from '../../hooks/FetchUser'; 
import { useUpdateUser } from '../../hooks/UserUpdate';
import { X } from 'lucide-react';

const PerfilCliente = () => {
    const { state } = useContext(GlobalContext); 
    const [modalOpen, setModalOpen] = useState(false);
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

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    
    };

    const handleSave = async () => {
        try {
            console.log('Datos a actualizar:', formData); 
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

    if (!state.isAuthenticated) {
        return <p>No has iniciado sesión. Por favor, inicia sesión para ver tu perfil.</p>;
    }

    return (
        <div className="flex flex-col items-center">
            <nav className="bg-gray p-4 flex items-center shadow-md w-full">
                <button onClick={openModal} className="text-white focus:outline-none">
                    ☰
                </button>
                <span className="text-white ml-4 text-lg font-semibold">Perfil de Usuario</span>
            </nav>

            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>
                    <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-96">
                        <button onClick={closeModal} className="absolute top-4 right-4 text-gray">
                            <X size={24} />
                        </button>
                        <h2 className="text-2xl font-bold mb-4">{editing ? 'Editar Perfil' : 'Datos de Usuario'}</h2>
                        {message && <p className="text-red mb-4">{message}</p>}
                        {editing ? (
                            <>
                                <div>
                                    <label htmlFor="nombre" className="block">Nombre:</label>
                                    <input 
                                        type="text" 
                                        name="nombre" 
                                        value={formData.nombre} 
                                        onChange={handleChange} 
                                        className="border rounded p-2 w-full" 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contacto" className="block">Contacto:</label>
                                    <input 
                                        type="text" 
                                        name="contacto" 
                                        value={formData.contacto} 
                                        onChange={handleChange} 
                                        className="border rounded p-2 w-full" 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block">Email:</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        value={formData.email} 
                                        onChange={handleChange} 
                                        className="border rounded p-2 w-full" 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="direccion" className="block">Dirección:</label>
                                    <input 
                                        type="text" 
                                        name="direccion" 
                                        value={formData.direccion} 
                                        onChange={handleChange} 
                                        className="border rounded p-2 w-full" 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="cumpleanos" className="block">Cumpleaños:</label>
                                    <input 
                                        type="date" 
                                        name="cumpleanos" 
                                        value={formData.cumpleanos} 
                                        onChange={handleChange} 
                                        className="border rounded p-2 w-full" 
                                    />
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="boletin"
                                        name="boletin"
                                        checked={formData.boletin}
                                        onChange={handleChange} 
                                        className="h-4 w-4 text-blue focus:ring-blue border-gray rounded"
                                    />
                                    <label htmlFor="boletin" className="ml-2 block text-sm text-gray">
                                        Deseo recibir ofertas especiales
                                    </label>
                                </div>
                                <button onClick={handleSave} className="mt-4 bg-blue text-white rounded p-2">
                                    Guardar
                                </button>
                            </>
                        ) : (
                            <div>
                                <p><strong>Nombre:</strong> {formData.nombre}</p>
                                <p><strong>Contacto:</strong> {formData.contacto}</p>
                                <p><strong>Email:</strong> {formData.email}</p>
                                <p><strong>Dirección:</strong> {formData.direccion}</p>
                                <p><strong>Cumpleaños:</strong> {formData.cumpleanos}</p>
                                <p><strong>boletin:</strong> {formData.boletin ? 'Sí' : 'No'}</p>
                                <button onClick={() => setEditing(true)} className="mt-4 bg-red text-white rounded p-2">
                                    Editar
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PerfilCliente;
