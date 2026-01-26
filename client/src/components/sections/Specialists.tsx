import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const specialists = [
  {
    name: "Dr. Carlos Ruiz",
    role: "Director Médico / Cirujano",
    specialty: "Cirugía de Tejidos Blandos",
    initials: "CR",
  },
  {
    name: "Dra. Ana López",
    role: "Medicina Interna",
    specialty: "Dermatología Veterinaria",
    initials: "AL",
  },
  {
    name: "Dr. Miguel Ángel",
    role: "Especialista en Diagnóstico",
    specialty: "Ecografía y Radiología",
    initials: "MA",
  },
  {
    name: "Dra. Sofía Mendez",
    role: "Emergencias",
    specialty: "Cuidados Intensivos",
    initials: "SM",
  },
];

export default function Specialists() {
  return (
    <section id="team" className="py-20 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold tracking-wider text-sm uppercase mb-2 block">
            Nuestro Equipo
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Especialistas certificados
          </h2>
          <p className="text-gray-600">
            Nuestro equipo está conformado por médicos veterinarios colegiados, con formación continua 
            y amplia experiencia, garantizando una atención integral para cada paciente.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {specialists.map((doctor, index) => (
            <Card key={index} className="border-none shadow-none text-center group">
              <CardHeader className="flex flex-col items-center pb-2">
                <div className="w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-gray-100 group-hover:border-primary/20 transition-all shadow-lg">
                  <Avatar className="w-full h-full">
                    {/* Placeholder avatars since we can't generate specific people images efficiently in batch */}
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${doctor.name}`} alt={doctor.name} />
                    <AvatarFallback className="text-2xl bg-primary/10 text-primary">{doctor.initials}</AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                  {doctor.name}
                </h3>
                <p className="text-primary font-medium text-sm">{doctor.role}</p>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary" className="bg-secondary/10 text-secondary-foreground hover:bg-secondary/20">
                  {doctor.specialty}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
