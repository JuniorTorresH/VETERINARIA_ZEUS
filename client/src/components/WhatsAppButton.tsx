import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
    const phoneNumber = "51942421364";
    const message = "Hola Vet Zeus, me gustaría obtener información sobre sus servicios para mi mascota.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center"
            aria-label="Contactar por WhatsApp"
        >
            <FaWhatsapp size={32} />
        </a>
    );
}
