import React, { useState } from 'react';
import { Link } from 'react-router';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('¡Gracias por suscribirte! Pronto recibirás nuestras novedades.');
      setEmail('');
    }
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="font-bold text-xl tracking-tight">EnterrLusst</span>
            </div>
            <p className="text-sm text-gray-600">
              Ropa urbana de diseño. Calidad premium, estilo auténtico.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Navegación</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-gray-600 hover:text-black transition-colors">Inicio</Link></li>
              <li><Link to="/catalog" className="text-sm text-gray-600 hover:text-black transition-colors">Catálogo</Link></li>
              <li><Link to="/about" className="text-sm text-gray-600 hover:text-black transition-colors">Sobre Nosotros</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-600 hover:text-black transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-semibold mb-4">Ayuda</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-sm text-gray-600 hover:text-black transition-colors">Preguntas Frecuentes</Link></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">Envíos</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">Devoluciones</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">Términos y Condiciones</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-gray-600 mb-4">
              Suscríbete para recibir ofertas exclusivas.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="w-full">
                Suscribirme
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            © 2026 EnterrLusst Streetwear. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};