import { motion } from "framer-motion";
import { 
  Stethoscope, 
  Syringe, 
  ShieldCheck, 
  Scissors, 
  Ambulance, 
  FlaskConical, 
  ScanLine, 
  Pill,
  Utensils 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    title: "Consulta General",
    description: "Evaluación clínica completa para detectar, prevenir y tratar enfermedades.",
    icon: Stethoscope,
    color: "bg-blue-100 text-blue-600"
  },
  {
    title: "Vacunación",
    description: "Programas de vacunación personalizados según especie, edad y estilo de vida.",
    icon: Syringe,
    color: "bg-green-100 text-green-600"
  },
  {
    title: "Desparasitación",
    description: "Tratamientos internos y externos para prevenir parásitos.",
    icon: ShieldCheck,
    color: "bg-purple-100 text-purple-600"
  },
  {
    title: "Cirugía Veterinaria",
    description: "Procedimientos seguros con monitoreo constante y anestesia controlada.",
    icon: Scissors,
    color: "bg-red-100 text-red-600"
  },
  {
    title: "Emergencias 24/7",
    description: "Atención inmediata para situaciones críticas y accidentes.",
    icon: Ambulance,
    color: "bg-orange-100 text-orange-600"
  },
  {
    title: "Laboratorio Clínico",
    description: "Análisis de sangre, orina y pruebas rápidas para diagnósticos precisos.",
    icon: FlaskConical,
    color: "bg-teal-100 text-teal-600"
  },
  {
    title: "Ecografías y Rayos X",
    description: "Diagnóstico por imágenes con equipos modernos.",
    icon: ScanLine,
    color: "bg-indigo-100 text-indigo-600"
  },
  {
    title: "Grooming",
    description: "Cuidado estético y sanitario (Baño y Corte).",
    icon: Scissors,
    color: "bg-pink-100 text-pink-600"
  },
  {
    title: "Farmacia",
    description: "Medicamentos certificados y productos especializados.",
    icon: Pill,
    color: "bg-yellow-100 text-yellow-600"
  },
  {
    title: "Nutrición",
    description: "Asesoría nutricional personalizada según edad y peso.",
    icon: Utensils,
    color: "bg-lime-100 text-lime-600"
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold tracking-wider text-sm uppercase mb-2 block">
            Nuestros Servicios
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Atención veterinaria integral de alta calidad
          </h2>
          <p className="text-gray-600">
            Ofrecemos una amplia gama de servicios médicos y estéticos para garantizar 
            el bienestar completo de tus mascotas en cada etapa de su vida.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="h-full border-none shadow-md hover:shadow-xl transition-shadow duration-300 bg-white group">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${service.color}`}>
                    <service.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
