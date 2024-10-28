import React, { useEffect, useState } from 'react';

const FormEliminarAdmin = ({ onClose }) => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAdmin, setSelectedAdmin] = useState(null);

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/admins');
                const data = await response.json();
                setAdmins(data);
            } catch (error) {
                console.error('Error al obtener los administradores:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAdmins();
    }, []);

    const handleDelete = async () => {
        if (!selectedAdmin) return;

        try {
            const response = await fetch(`http://localhost:8000/api/admin/delete/${selectedAdmin}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el administrador');
            }

            const result = await response.json();
            alert(result.message);
            onClose();
        } catch (error) {
            console.error('Error al eliminar el administrador:', error);
        }
    };

    if (loading) {
        return <p className="text-center">Cargando administradores...</p>;
    }

    const filteredAdmins = admins.filter(admin =>
        admin.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Eliminar Administrador</h2>
            <p className="mb-4">Buscar administrador para eliminar:</p>

            <input
                type="text"
                placeholder="Buscar por nombre o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 p-2 rounded mb-4 w-full"
            />

            <ul className="max-h-60 overflow-y-auto border border-gray-300 mb-4">
                {filteredAdmins.length > 0 ? (
                    filteredAdmins.map(admin => (
                        <li
                            key={admin.id}
                            className={`admin-item p-2 cursor-pointer ${selectedAdmin === admin.id ? 'bg-gray-200' : ''}`}
                            onClick={() => setSelectedAdmin(admin.id)}
                        >
                            {admin.nombre} ({admin.email})
                        </li>
                    ))
                ) : (
                    <li className="p-2">No se encontraron administradores.</li>
                )}
            </ul>

            {selectedAdmin && (
                <div className="mb-4">
                    <p>¿Está seguro de que desea eliminar a este administrador?</p>
                    <button onClick={handleDelete} className="bg-red text-white px-4 py-2 rounded mr-2">
                        Eliminar
                    </button>
                    <button onClick={onClose} className="bg-gray text-white px-4 py-2 rounded">
                        Cancelar
                    </button>
                </div>
            )}
        </div>
    );
};

export default FormEliminarAdmin;

