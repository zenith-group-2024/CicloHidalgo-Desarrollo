import React, { useState, useEffect, useContext } from 'react';
import { X } from 'lucide-react';


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
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/user')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
                return response.json(); // Procesa JSON
            })
            .then(data => {
                const { name, contacto, email, direccion, cumpleanos } = data;
                setFormData({
                    name: name || '',
                    contacto: contacto || '',
                    email: email || '',
                    direccion: direccion || '',
                    cumpleanos: cumpleanos || '',
                });
                setAuthenticated(true);
            })
            .catch(error => {
                console.error('Error al obtener los datos del usuario:', error);
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

    if (!isAuthenticated) {
        return <p>No has iniciado sesión. Por favor, inicia sesión para ver tu perfil.</p>;
    }

    // Resto del componente...

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
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="border border-gray rounded-lg p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-red"
                                    placeholder="Nombre"
                                />
                                <input
                                    type="text"
                                    name="contacto"
                                    value={formData.contacto}
                                    onChange={handleChange}
                                    className="border border-gray rounded-lg p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-red"
                                    placeholder="Usuario"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="border border-gray rounded-lg p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-red"
                                    placeholder="Email"
                                />
                                <input
                                    type="text"
                                    name="direccion"
                                    value={formData.direccion}
                                    onChange={handleChange}
                                    className="border border-gray rounded-lg p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-red"
                                    placeholder="Dirección"
                                />
                                <input
                                    type="date"
                                    name="cumpleanos"
                                    value={formData.cumpleanos}
                                    onChange={handleChange}
                                    className="border border-gray rounded-lg p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-red"
                                />
                                <button 
                                    onClick={handleSave} 
                                    className="bg-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                                >
                                    Guardar
                                </button>
                            </>
                        ) : (
                            <div className="p-4 rounded-lg shadow-md mb-4">
                                <p className="mb-4"><strong>Nombre:</strong> {formData.name}</p>
                                <p className="mb-4"><strong>Usuario:</strong> {formData.contacto}</p>
                                <p className="mb-4"><strong>Email:</strong> {formData.email}</p>
                                <p className="mb-4"><strong>Dirección:</strong> {formData.direccion}</p>
                                <p className="mb-4"><strong>Cumpleaños:</strong> {formData.cumpleanos}</p>
                                <button onClick={() => setEditing(true)} className="bg-blue text-white px-4 py-2 rounded-lg h transition">
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
