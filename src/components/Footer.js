import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Leaf } from 'lucide-react';

export const Footer = () => {
  return (
    <footer data-testid="footer" className="bg-[#C69B1A] text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className="w-8 h-8 text-[#F4CE14]" />
              <span className="font-serif text-2xl font-bold">Dcielo</span>
            </div>
            <p className="text-white/80 leading-relaxed">
              Huevos ecológicos de gallinas criadas en libertad en las dehesas de Extremadura.
            </p>
            <div className="flex items-center gap-2 text-[#F4CE14]">
              <span className="text-sm font-medium">Certificado Ecológico EU</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-xl font-semibold">Enlaces</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-white/80 hover:text-white transition-colors">Inicio</Link>
              <Link to="/nosotros" className="text-white/80 hover:text-white transition-colors">Quiénes Somos</Link>
              <Link to="/granja" className="text-white/80 hover:text-white transition-colors">Nuestra Granja</Link>
              <Link to="/tienda" className="text-white/80 hover:text-white transition-colors">Tienda</Link>
              <Link to="/contacto" className="text-white/80 hover:text-white transition-colors">Contacto</Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-serif text-xl font-semibold">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 text-[#F4CE14]" />
                <span className="text-white/80">
                  Finca Dcielo<br />
                  Cáceres, Extremadura<br />
                  España
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#F4CE14]" />
                <span className="text-white/80">+34 927 XXX XXX</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#F4CE14]" />
                <span className="text-white/80">info@dcielo.es</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h4 className="font-serif text-xl font-semibold">Horario</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 mt-1 text-[#F4CE14]" />
                <div className="text-white/80">
                  <p>Lunes - Viernes</p>
                  <p className="font-medium text-white">9:00 - 18:00</p>
                  <p className="mt-2">Sábados</p>
                  <p className="font-medium text-white">10:00 - 14:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Dcielo. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6 text-sm text-white/60">
            <Link to="#" className="hover:text-white transition-colors">Política de Privacidad</Link>
            <Link to="#" className="hover:text-white transition-colors">Términos y Condiciones</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
