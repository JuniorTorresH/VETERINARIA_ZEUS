import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Hero() {
  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };
  
  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-vet.png')" }}
      />
      
      {/* Overlay: oscuro suave (35%) */}
      <div className="absolute inset-0 z-10 bg-black/35" />

      {/* Content */}
      <div className="container relative z-20 px-4 md:px-6 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Salud, cuidado y amor para quienes son parte de tu familia
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl drop-shadow-md">
            Atención veterinaria integral con profesionales certificados y tecnología moderna.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
              onClick={scrollToBooking}
            >
              Agendar cita
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6 rounded-full backdrop-blur-sm transition-all"
              onClick={scrollToServices}
            >
              Ver servicios
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
