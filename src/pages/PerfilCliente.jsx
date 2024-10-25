import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../global/GlobalState';
import FetchUser from '../../hooks/FetchUser';
import { useUpdateUser } from '../../hooks/UserUpdate';
import Navbar from '../UI/Navbar';
import Footer from '../UI/Footer';

const PerfilCliente = () => {
    const navigate = useNavigate(); 
    const { state, logout } = useContext(GlobalContext);
    const { isAuthenticated } = state;

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
        if (!userLoading && fetchedUserData) {
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

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/'); 
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSave = async () => {
        try {
            await updateUserData(formData);
            setEditing(false);
            setMessage('Datos actualizados correctamente.');

            setTimeout(() => {
                setMessage('');
            }, 2000);
        } catch (error) {
            setMessage('Error al actualizar los datos: ' + error.message);
            setTimeout(() => {
                setMessage('');
            }, 2000);
        }
    };

    if (loading) {
        return <p>Cargando datos...</p>;
    }

    return (
        <div className="mx-auto gap-4 grid flex-row ">
            <Navbar />
            <h2 className="text-2xl font-bold mb-4 text-center">{editing ? 'Editar Perfil' : 'Datos de Usuario'}</h2>

            {message && <p className="text-red text-lg text-center font-semibold">{message}</p>}
            {editing ? (
                <div className="w-5/6 h-full m-auto bg-white p-8 shadow-lg rounded-xl border border-old">
                    <h2 className="text-2xl font-bold text-black mb-6">Información del Perfil</h2>

                    {Object.entries(formData).map(([key, value]) => (
                        <div className="mb-4" key={key}>
                            <label htmlFor={key} className="block font-bold text-black">
                                {key.charAt(0).toUpperCase() + key.slice(1)}:
                            </label>
                            {key === 'boletin' ? (
                                <div className="flex items-center mb-6">
                                    <input
                                        type="checkbox"
                                        id={key}
                                        name={key}
                                        checked={value}
                                        onChange={handleChange}
                                        className="h-5 w-5 text-blue focus:ring-blue border-old rounded"
                                    />
                                    <label htmlFor={key} className="ml-2 text-black">
                                        Deseo recibir ofertas especiales
                                    </label>
                                </div>
                            ) : (
                                <input
                                    type={key === 'cumpleanos' ? 'date' : 'text'}
                                    name={key}
                                    value={value}
                                    onChange={handleChange}
                                    className="border border-old rounded-lg p-3 w-full text-old font-medium transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                                />
                            )}
                        </div>
                    ))}

                    <button
                        onClick={handleSave}
                        className="mt-4 bg-blue text-white rounded-xl font-bold p-3 hover:bg-red transition duration-300 transform hover:scale-105"
                    >
                        Guardar
                    </button>
                </div>
            ) : (
                <div className='w-4/6 h-full mx-auto bg-white p-8 shadow-lg rounded-3xl text-lg'>
                      <h2 className="text-2xl font-bold text-black mb-6">Información del Perfil</h2>
                    <div className='flex flex-col'>
                        {Object.entries(formData).map(([key, value]) => (
                            <p className='mb-6 flex items-center' key={key}>
                                <strong className='text-black text-xl'>
                                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                                </strong>
                                <span className="text-old ml-4">
                                    {key === 'boletin' ? (value ? 'Sí' : 'No') : value.toString()}
                                </span>
                            </p>
                        ))}
                    </div>

                    <button
                        onClick={() => setEditing(true)}
                        className="mt-6 bg-blue text-white font-bold py-3 px-6 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-110"
                    >
                        Editar
                    </button>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default PerfilCliente;
