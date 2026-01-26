import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import BookingForm from "@/components/sections/BookingForm";
import Specialists from "@/components/sections/Specialists";
import Gallery from "@/components/sections/Gallery";
import Footer from "@/components/layout/Footer";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Services />
        <BookingForm />
        <Specialists />
        <Gallery />
        
        {/* Testimonials Section inline for simplicity as it's small */}
        <section id="testimonials" className="py-20 bg-primary/5">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary font-semibold tracking-wider text-sm uppercase mb-2 block">
                Testimonios
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Lo que dicen nuestros clientes
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  text: "Gracias a VetCare mi perrito recibió atención inmediata y hoy está completamente recuperado. Excelente trato y profesionales.",
                  author: "María González",
                  pet: "Dueña de Max"
                },
                {
                  text: "El mejor servicio de grooming que he probado. Mi gato suele ser muy nervioso pero aquí lo trataron con mucha paciencia y cariño.",
                  author: "Carlos Rodríguez",
                  pet: "Dueño de Luna"
                },
                {
                  text: "Llevo años trayendo a mis mascotas aquí. La confianza que me transmiten los doctores es inigualable. 100% recomendados.",
                  author: "Ana Martínez",
                  pet: "Dueña de Rocky y Tobby"
                }
              ].map((testimonial, i) => (
                <Card key={i} className="border-none shadow-md bg-white">
                  <CardContent className="pt-6">
                    <div className="flex gap-1 mb-4 text-yellow-400">
                      {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-4 h-4 fill-current" />)}
                    </div>
                    <Quote className="text-primary/20 w-10 h-10 mb-2" />
                    <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">{testimonial.author[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{testimonial.author}</p>
                        <p className="text-xs text-gray-500">{testimonial.pet}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
      </main>

      <Footer />
    </div>
  );
}
