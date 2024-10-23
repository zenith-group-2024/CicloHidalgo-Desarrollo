import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../global/GlobalState';
import FetchUser from '../../hooks/FetchUser';
import { useUpdateUser } from '../../hooks/UserUpdate';
import { X } from 'lucide-react';
import Navbar from '../UI/Navbar';
import Footer from '../UI/Footer';

const PerfilCliente = () => {
  
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
        <div className="container mx-auto p-6 gap-8 grid flex-row ">
              <Navbar />
            <h2 className="text-2xl font-bold mb-4">{editing ? 'Editar Perfil' : 'Datos de Usuario'}</h2>

            {message && <p className="text-red mb-4">{message}</p>}
            {editing ? (
                <>
                <div className="w-5/6 h-full m-auto bg-white p-8 shadow-md rounded-lg">
                         <div className='' >
                        <label htmlFor="nombre" className="block font-semibold mb-1">Nombre:</label>
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
                </div>
           
                </>
            ) : (
                <div className='w-5/6 h-full m mx-auto bg-white p-8 shadow-md  rounded-lg'>
     
                <p className=''><strong>Nombre:</strong> {formData.nombre}</p>
                <p className=' '><strong>Contacto:</strong> {formData.contacto}</p>
                <p  className='' ><strong>Email:</strong> {formData.email}</p>
                <p c className='' ><strong>Dirección:</strong> {formData.direccion}</p>
                <p c className=' '><strong>Cumpleaños:</strong> {formData.cumpleanos}</p>
                <p  className='  '><strong>Boletín:</strong> {formData.boletin ? 'Sí' : 'No'}</p>
                
                <button onClick={() => setEditing(true)} className="mt-4 bg-red text-white rounded p-2">
                    Editar
                </button>
            </div>
            )}
               <Footer />  
        </div>
    );
};

export default PerfilCliente; 