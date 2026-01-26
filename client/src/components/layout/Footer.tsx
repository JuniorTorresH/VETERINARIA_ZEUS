import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { MapPin, Phone, Mail } from "lucide-react" // Mantenemos estos de Lucide porque no están tachados


export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white pt-20 pb-10">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-heading font-bold">
                <span className="text-primary">VET</span> ZEUS
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Comprometidos con la salud y felicidad de tus mascotas. 
              Atención ética, profesional y cercana para quienes son parte de tu familia.
            </p>
            <div className="flex gap-4">
  {/* Botón Facebook */}
  <Button asChild variant="ghost" size="icon" className="rounded-full bg-white/5 hover:bg-primary hover:text-white text-white">
    <a href="https://www.facebook.com/junior.torreshinostroza" target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={faFacebookF} className="h-4 w-4" />
    </a>
  </Button>

  {/* Botón Instagram */}
  <Button asChild variant="ghost" size="icon" className="rounded-full bg-white/5 hover:bg-primary hover:text-white text-white">
    <a href="https://www.facebook.com/junior.torreshinostroza" target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={faInstagram} className="h-4 w-4" />
    </a>
  </Button>

  {/* Botón Twitter/X */}
  <Button asChild variant="ghost" size="icon" className="rounded-full bg-white/5 hover:bg-primary hover:text-white text-white">
    <a href="https://www.facebook.com/junior.torreshinostroza" target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={faXTwitter} className="h-4 w-4" />
    </a>
  </Button>
</div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              {["Inicio", "Sobre Nosotros", "Servicios", "Especialistas", "Testimonios", "Citas"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-400">Av. Principal 123, Urb. Los Pinos, Ciudad Veterinaria.</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-gray-400">(01) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-gray-400">contacto@veterinaria-zeus.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-bold mb-6">Horarios</h4>
            <ul className="space-y-3">
              <li className="flex justify-between text-gray-400">
                <span>Lunes - Viernes</span>
                <span className="text-white">8am - 8pm</span>
              </li>
              <li className="flex justify-between text-gray-400">
                <span>Sábados</span>
                <span className="text-white">9am - 6pm</span>
              </li>
              <li className="flex justify-between text-gray-400">
                <span>Domingos</span>
                <span className="text-white">Emergencias</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Vet-Zeus - Centro Veterinario Integral Zeus. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
