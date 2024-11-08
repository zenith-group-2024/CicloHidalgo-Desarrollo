import { useState } from 'react';

const useDeleteAdmin = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

    const deleteAdmin = async (adminId) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/api/admin/delete/${adminId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) throw new Error('Error al eliminar el administrador');

            const result = await response.json();
            setMessage(result.message);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { deleteAdmin, loading, message, error };
};

export default useDeleteAdmin;