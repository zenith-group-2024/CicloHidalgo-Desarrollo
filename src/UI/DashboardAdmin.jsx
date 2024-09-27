import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardButton = ({ label, resource }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (label.startsWith('Añadir')) {
      navigate(`/crud/${resource}`);
    }
  };

  return (
    <button onClick={handleClick} className="bg-blue text-white px-4 py-2 mt-4 rounded-full hover:bg-red transition">
      {label}
    </button>
  );
};

const DashboardCard = ({ title, buttons }) => {
  const resourceMap = {
    Productos: 'productos',
    Servicios: 'servicios',
    Usuarios: 'usuarios',
    Ofertas: 'ofertas',
    Contenido: 'contenido',
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg text-center border-t-4 border-blue-500">
      <h2 className="text-3xl font-semibold mb-2">{title}</h2>
      <div className="flex flex-col items-center space-y-4 mt-4">
        {buttons.map((label, index) => (
          <DashboardButton key={index} label={label} resource={resourceMap[title]} />
        ))}
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const cardsData = [
    {
      title: 'Productos',
      buttons: ['Añadir Productos', 'Eliminar Productos', 'Editar Productos'],
    },
    {
      title: 'Servicios',
      buttons: ['Añadir Servicios', 'Eliminar Servicios', 'Editar Servicios'],
    },
    {
      title: 'Usuarios',
      buttons: ['Añadir Usuarios', 'Eliminar Usuarios', 'Editar Usuarios'],
    },
    {
      title: 'Ofertas',
      buttons: ['Añadir Ofertas', 'Eliminar Ofertas', 'Editar Ofertas'],
    },
    {
      title: 'Contenido',
      buttons: ['Añadir Contenido', 'Eliminar Contenido', 'Editar Contenido'],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <main className="flex-grow p-6 mt-10">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardsData.map((card, index) => (
            <DashboardCard key={index} title={card.title} buttons={card.buttons} />
          ))}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
