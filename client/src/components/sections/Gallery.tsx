import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ZoomIn } from "lucide-react";

const galleryImages = [
  {
    src: "/images/hero-vet.png",
    alt: "Atención personalizada",
    category: "Consulta"
  },
  {
    src: "/images/clinic-interior.png",
    alt: "Instalaciones Modernas",
    category: "Instalaciones"
  },
  {
    src: "/images/gallery-cat.png",
    alt: "Cuidado Felino",
    category: "Medicina Felina"
  },
  {
    src: "/images/gallery-grooming.png",
    alt: "Servicio de Grooming",
    category: "Estética"
  },
  {
    src: "/images/gallery-surgery.png",
    alt: "Quirófano Equipado",
    category: "Cirugía"
  },
  {
    src: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=2070&auto=format&fit=crop", 
    alt: "Recuperación",
    category: "Hospitalización"
  }
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold tracking-wider text-sm uppercase mb-2 block">
            Galería
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nuestros pacientes y espacios
          </h2>
          <p className="text-gray-600">
            Momentos reales de atención, cuidado y recuperación de nuestros pacientes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group aspect-square overflow-hidden rounded-xl cursor-pointer"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div className="w-full h-full relative">
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center p-4">
                        <ZoomIn className="w-8 h-8 mx-auto mb-2" />
                        <p className="font-bold">{image.alt}</p>
                        <p className="text-sm opacity-80">{image.category}</p>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl bg-transparent border-none shadow-none p-0 overflow-hidden">
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-auto rounded-lg"
                  />
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
