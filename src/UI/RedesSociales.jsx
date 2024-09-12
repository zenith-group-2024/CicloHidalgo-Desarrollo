import React from 'react';
import { Facebook, Instagram, MessageCircle } from 'lucide-react';

const SocialMediaSection = () => {
    return (
        <section className="py-16 bg-gray-100 mt-10">
            <div className="container mx-auto px-4">
                <div className="flex justify-center space-x-6">
                   
                    <a href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer">
                        <MessageCircle
                            size={40} 
                            className="text-blue transition-transform transform hover:scale-125" 
                            aria-label="WhatsApp"
                        />
                    </a>

                    
                    <a href="https://facebook.com/your-page" target="_blank" rel="noopener noreferrer">
                        <Facebook 
                            size={40} 
                            className="text-blue transition-transform transform hover:scale-125" 
                            aria-label="Facebook"
                        />


                        
                    </a>

                    
                    <a href="https://instagram.com/your-profile" target="_blank" rel="noopener noreferrer">
                        <Instagram 
                            size={40} 
                            className="text-blue transition-transform transform hover:scale-125" 
                            aria-label="Instagram"
                        />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default SocialMediaSection;
