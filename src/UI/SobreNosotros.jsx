import React from 'react';
import SobreNosotrosImagen from '../assets/images/sobre-nosotros.jpg'; 
const SobreNosotros = () => {
    return (
        <section className="bg-white p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Sobre Nosotros</h1>
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex-1 md:mr-8 mb-6 md:mb-0">
                    <p className="text-lg leading-relaxed">
                        Somos una empresa dedicada a ofrecer las mejores bicicletas del mercado, combinando calidad y tecnología para garantizar una experiencia de conducción inigualable. Nuestra misión es proporcionar a nuestros clientes productos que superen sus expectativas, con un enfoque en el servicio al cliente y la innovación constante. Cada bicicleta que vendemos es sometida a rigurosas pruebas para asegurar su rendimiento y durabilidad, y nuestro equipo está siempre disponible para ayudar con cualquier consulta o necesidad que puedas tener.
                    </p>
                </div>
                <div className="flex-1">
                    <img
                        src={SobreNosotrosImagen}
                        alt="Sobre Nosotros"
                        className="w-full h-auto object-cover rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </section>
    );
};

export default SobreNosotros;
