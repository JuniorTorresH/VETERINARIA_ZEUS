import { motion } from "framer-motion";
import { CheckCircle2, Heart, Award, Stethoscope, Clock } from "lucide-react";

export default function About() {
  const stats = [
    { label: "Años de experiencia", value: "+10", icon: Clock },
    { label: "Mascotas atendidas", value: "+8,000", icon: Heart },
    { label: "Veterinarios especializados", value: "5", icon: Stethoscope },
    { label: "Calidad Médica", value: "100%", icon: Award },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-semibold tracking-wider text-sm uppercase mb-2 block">
              Sobre Nosotros
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Comprometidos con el bienestar de tu mascota
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              En VetCare creemos que cada mascota merece una vida larga, saludable y feliz. 
              Nuestro centro veterinario nace con la misión de brindar atención médica de calidad, 
              combinando experiencia profesional, tecnología clínica y un trato humano tanto para 
              las mascotas como para sus familias.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Trabajamos bajo principios de ética veterinaria, prevención, diagnóstico oportuno y 
              acompañamiento continuo, asegurando que cada paciente reciba la atención adecuada 
              según su condición y etapa de vida.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                "Amor y respeto por los animales",
                "Profesionalismo médico",
                "Tecnología moderna",
                "Atención de emergencias 24/7"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="text-accent h-5 w-5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image/Visuals */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/images/clinic-interior.png" 
                alt="Instalaciones de VetCare" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            {/* Floating Stats Card */}
            <div className="absolute -bottom-10 -left-6 bg-white p-6 rounded-xl shadow-xl max-w-xs hidden md:block border-l-4 border-primary">
              <p className="text-gray-500 text-sm mb-1">Nuestra misión</p>
              <p className="font-semibold text-gray-900 italic">
                "Brindar atención veterinaria integral, preventiva y especializada."
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-primary/5 transition-colors"
            >
              <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-primary">
                <stat.icon className="h-7 w-7" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
