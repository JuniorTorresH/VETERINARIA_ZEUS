import { useRoute, Link } from "wouter";
import { services } from "@/lib/services-data";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Check, ArrowRight, Home, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ServiceDetail() {
    const [match, params] = useRoute("/servicio/:id");
    const service = match && params ? services.find(s => s.id === params.id) : null;

    if (!service) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center p-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Servicio no encontrado</h2>
                    <Link href="/">
                        <Button>Volver al inicio</Button>
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    // Get 3 random related services (excluding current one)
    const relatedServices = services
        .filter(s => s.id !== service.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

    return (
        <div className="min-h-screen bg-background font-body flex flex-col">
            <Navbar />

            <main className="flex-1">
                {/* Animated Hero Section with Background Image */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative h-[400px] md:h-[500px] flex items-center justify-center"
                >
                    {/* Background Image with Overlay */}
                    <div
                        className="absolute inset-0 bg-cover bg-center z-0"
                        style={{ backgroundImage: `url(${service.imageUrl})` }}
                    />
                    <div className="absolute inset-0 bg-gray-900/60 z-10" />

                    {/* Content */}
                    <div className="container px-4 md:px-6 relative z-20 text-center text-white">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            <div className="flex items-center justify-center gap-2 text-sm md:text-base mb-6 text-gray-200">
                                <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
                                    <Home className="w-4 h-4" /> Inicio
                                </Link>
                                <ChevronRight className="w-4 h-4" />
                                <Link href="/#services" className="hover:text-primary transition-colors">
                                    Servicios
                                </Link>
                                <ChevronRight className="w-4 h-4" />
                                <span className="text-primary font-semibold">{service.title}</span>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                                {service.title}
                            </h1>

                            <div className={`inline-flex p-4 rounded-full ${service.color.replace('text-', 'bg-').replace('bg-', 'text-white bg-opacity-20 backdrop-blur-sm border border-white/20')}`}>
                                <service.icon className="w-8 h-8 text-white" />
                            </div>
                        </motion.div>
                    </div>
                </motion.section>

                <section className="py-16 md:py-24">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="grid lg:grid-cols-3 gap-12 md:gap-16">

                            {/* Left Column: Description & Benefits */}
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="lg:col-span-2 space-y-10"
                            >
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Sobre el servicio</h2>
                                    <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line text-justify">
                                        {service.description}
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6">¿Qué incluye este servicio?</h3>
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        {service.benefits.map((benefit, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.1 }}
                                                className="flex items-start gap-4"
                                            >
                                                <div className="bg-white p-2 rounded-full shadow-sm text-primary">
                                                    <Check className="w-5 h-5" />
                                                </div>
                                                <span className="text-gray-700 font-medium pt-1">{benefit}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Right Column: Booking Card */}
                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="lg:col-span-1"
                            >
                                <Card className="sticky top-24 border-none shadow-2xl shadow-primary/5 bg-white overflow-hidden">
                                    <div className="bg-primary h-2 w-full"></div>
                                    <CardContent className="p-8 space-y-8">
                                        <div className="text-center">
                                            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Inversión</span>
                                            <div className="flex items-center justify-center gap-2 mt-2">
                                                <span className="text-4xl font-extrabold text-gray-900">
                                                    {service.price === "Consultar" || service.price === "Variable" ? "" : "S/."}
                                                    {service.price}
                                                </span>
                                            </div>
                                            {service.price !== "Consultar" && service.price !== "Variable" && (
                                                <span className="text-gray-500 text-sm">por sesión / consulta</span>
                                            )}
                                        </div>

                                        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100/50">
                                            <p className="text-sm text-blue-800 text-center leading-relaxed">
                                                <span className="font-semibold block mb-1">¡Reserva prioritaria!</span>
                                                Agenda ahora para asegurar el horario que mejor se adapte a ti.
                                            </p>
                                        </div>

                                        <a href="/#booking" className="block w-full">
                                            <Button className="w-full text-lg py-7 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300">
                                                Agendar Cita Ahora
                                            </Button>
                                        </a>
                                    </CardContent>
                                </Card>
                            </motion.div>

                        </div>
                    </div>
                </section>

                {/* Related Services Section */}
                <section className="py-20 bg-gray-50 border-t border-gray-200">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">También te puede interesar</h2>
                            <p className="text-gray-500 max-w-2xl mx-auto">
                                Explora otros servicios complementarios para el cuidado integral de tu mascota.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {relatedServices.map((related, index) => (
                                <Link key={related.id} href={`/servicio/${related.id}`}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group cursor-pointer h-full"
                                    >
                                        <Card className="h-full border-none shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                                            <div className="relative h-48 overflow-hidden">
                                                <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors z-10" />
                                                <img
                                                    src={related.imageUrl}
                                                    alt={related.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            </div>
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors flex items-center justify-between">
                                                    {related.title}
                                                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-gray-600 text-sm line-clamp-2">
                                                    {related.description}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
