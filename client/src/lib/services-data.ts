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

export const services = [
    {
        id: "consulta-general",
        title: "Consulta General",
        description: "Nuestra consulta general es el primer paso para garantizar la salud integral de tu mascota. Realizamos una evaluación clínica completa que incluye la revisión de todos los sistemas corporales, medición de signos vitales y un análisis detallado del historial médico. Nuestros veterinarios expertos se toman el tiempo necesario para escuchar tus preocupaciones y observar el comportamiento de tu compañero, asegurando un diagnóstico preciso y un plan de tratamiento personalizado.",
        benefits: [
            "Evaluación física completa nariz-a-cola",
            "Control de peso y condición corporal",
            "Asesoramiento preventivo personalizado"
        ],
        price: "50.00",
        icon: Stethoscope,
        color: "bg-blue-100 text-blue-600",
        imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop"
    },
    {
        id: "vacunacion",
        title: "Vacunación",
        description: "Protege a tu mascota contra enfermedades graves y potencialmente mortales con nuestros protocolos de vacunación actualizados. Diseñamos un calendario de inmunización adaptado a la especie, edad, raza y estilo de vida de tu mascota. Utilizamos vacunas de alta calidad y cadena de frío garantizada para asegurar la máxima eficacia y protección para tu mejor amigo.",
        benefits: [
            "Calendarios personalizados por edad",
            "Registro oficial de vacunación",
            "Recordatorios automáticos de refuerzos"
        ],
        price: "45.00",
        icon: Syringe,
        color: "bg-green-100 text-green-600",
        imageUrl: "https://images.unsplash.com/photo-1583336663277-620dc1996580?q=80&w=2069&auto=format&fit=crop"
    },
    {
        id: "desparasitacion",
        title: "Desparasitación",
        description: "Mantén a tu mascota libre de parásitos internos y externos que pueden afectar su salud y la de tu familia. Ofrecemos tratamientos efectivos contra pulgas, garrapatas, gusanos intestinales y del corazón. Nuestros expertos te guiarán para elegir el método más adecuado y seguro, ya sea tópico, oral o inyectable, garantizando una protección continua.",
        benefits: [
            "Eliminación de parásitos internos y externos",
            "Prevención de enfermedades zoonóticas",
            "Productos de amplio espectro y larga duración"
        ],
        price: "25.00",
        icon: ShieldCheck,
        color: "bg-purple-100 text-purple-600",
        imageUrl: "https://images.unsplash.com/photo-1599443015574-be5fe8a05783?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "cirugia-veterinaria",
        title: "Cirugía Veterinaria",
        description: "Contamos con un quirófano completamente equipado para realizar procedimientos quirúrgicos con los más altos estándares de seguridad. Desde esterilizaciones rutinarias hasta cirugías de tejidos blandos y ortopédicas. Utilizamos anestesia inhalatoria y monitoreo multiparamétrico constante para minimizar riesgos y asegurar una recuperación rápida y sin dolor.",
        benefits: [
            "Quirófano estéril y monitoreo avanzado",
            "Anestesia segura y control del dolor",
            "Cuidados postoperatorios detallados"
        ],
        price: "Consultar",
        icon: Scissors,
        color: "bg-red-100 text-red-600",
        imageUrl: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2000&auto=format&fit=crop"
    },
    {
        id: "emergencias-24-7",
        title: "Emergencias 24/7",
        description: "Sabemos que las emergencias no tienen horario. Nuestro servicio de urgencias está disponible las 24 horas del día, los 7 días de la semana. Contamos con personal capacitado y equipos listos para atender situaciones críticas como traumatismos, intoxicaciones, dificultades respiratorias y más, brindando la atención inmediata que puede salvar la vida de tu mascota.",
        benefits: [
            "Atención inmediata sin cita previa",
            "Personal de guardia permanente",
            "Equipamiento de soporte vital avanzado"
        ],
        price: "Desde 80.00",
        icon: Ambulance,
        color: "bg-orange-100 text-orange-600",
        imageUrl: "https://images.unsplash.com/photo-1535930749574-1399327ce78f?q=80&w=1936&auto=format&fit=crop"
    },
    {
        id: "laboratorio-clinico",
        title: "Laboratorio Clínico",
        description: "Disponemos de un laboratorio propio para realizar análisis clínicos con rapidez y precisión. Realizamos hemogramas, bioquímicas sanguíneas, uroanálisis, coproparasitoscópicos y pruebas rápidas de enfermedades virales. Obtener resultados en tiempo real nos permite diagnosticar patologías de manera temprana e iniciar el tratamiento adecuado sin demoras.",
        benefits: [
            "Resultados rápidos y confiables",
            "Amplia gama de pruebas diagnósticas",
            "Detección temprana de patologías"
        ],
        price: "Desde 35.00",
        icon: FlaskConical,
        color: "bg-teal-100 text-teal-600",
        imageUrl: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "ecografias-rayos-x",
        title: "Ecografías y Rayos X",
        description: "La tecnología de imagenología es fundamental para ver lo que sucede dentro del cuerpo de tu mascota. Ofrecemos servicios de radiología digital y ultrasonido para evaluar órganos internos, huesos y articulaciones. Estas herramientas no invasivas son esenciales para diagnósticos precisos de gestación, problemas cardíacos, abdominales y traumatológicos.",
        benefits: [
            "Imágenes de alta resolución",
            "Diagnósticos no invasivos",
            "Informe detallado por especialistas"
        ],
        price: "60.00",
        icon: ScanLine,
        color: "bg-indigo-100 text-indigo-600",
        imageUrl: "https://images.unsplash.com/photo-1516382799247-87df95d790b7?q=80&w=2074&auto=format&fit=crop"
    },
    {
        id: "grooming",
        title: "Grooming",
        description: "Más que estética, nuestro servicio de grooming es salud. Incluye baño con productos dermatológicos, corte de pelo según la raza, corte de uñas y limpieza de oídos. Nuestros estilistas trabajan con paciencia y cariño para que la experiencia sea relajante, ayudando a mantener la piel y el pelaje de tu mascota en óptimas condiciones.",
        benefits: [
            "Estética profesional según la raza",
            "Productos hipoalergénicos de calidad",
            "Revisión de piel y pelaje incluida"
        ],
        price: "40.00",
        icon: Scissors,
        color: "bg-pink-100 text-pink-600",
        imageUrl: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "farmacia",
        title: "Farmacia",
        description: "En nuestra farmacia encontrarás todos los medicamentos necesarios para el tratamiento de tu mascota. Disponemos de antibióticos, antiinflamatorios, suplementos, y productos de cuidado preventivo, todos de laboratorios certificados. Te asesoramos sobre la correcta administración y dosificación para garantizar la efectividad del tratamiento prescrito.",
        benefits: [
            "Medicamentos certificados y seguros",
            "Variedad de suplementos y preventivos",
            "Asesoría farmacéutica veterinaria"
        ],
        price: "Variable",
        icon: Pill,
        color: "bg-yellow-100 text-yellow-600",
        imageUrl: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "nutricion",
        title: "Nutrición",
        description: "La alimentación es la base de la salud. Ofrecemos asesoría nutricional especializada para cada etapa de la vida (cachorro, adulto, senior) y para condiciones específicas como obesidad, alergias o enfermedades renales. Te ayudamos a seleccionar la mejor dieta, ya sea comercial o natural, para optimizar la salud y longevidad de tu compañero.",
        benefits: [
            "Planes nutricionales a medida",
            "Control y manejo de peso",
            "Dietas para patologías específicas"
        ],
        price: "35.00",
        icon: Utensils,
        color: "bg-lime-100 text-lime-600",
        imageUrl: "https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=2000&auto=format&fit=crop"
    }
];
