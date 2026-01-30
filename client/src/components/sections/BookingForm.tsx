import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";
import { CalendarIcon, Loader2, User as UserIcon } from "lucide-react";
import { format, startOfDay } from "date-fns";
import { es } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";


const formSchema = z.object({
  ownerName: z.string().min(2, { message: "El nombre es requerido." }),
  petName: z.string().min(1, { message: "El nombre de la mascota es requerido." }),
  species: z.string().min(1, { message: "Selecciona una especie." }),
  serviceType: z.string().min(1, { message: "Selecciona un servicio." }),
  email: z.string().email({ message: "Email inválido." }),
  phone: z.string().min(8, { message: "Teléfono requerido." }),
  date: z.date({ required_error: "Selecciona una fecha." }),
  notes: z.string().optional(),
});

export default function BookingForm() {
  const { toast } = useToast();
  const { user } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ownerName: "",
      petName: "",
      email: "",
      phone: "",
      notes: "",
    },
  });

  const [, setLocation] = useLocation();

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      // Map form values to API schema
      const payload = {
        customerName: values.ownerName,
        petName: values.petName,
        species: values.species,
        serviceType: values.serviceType,
        email: values.email,
        phone: values.phone,
        preferredDate: values.date.toISOString(),
        observations: values.notes,
      };
      const res = await apiRequest("POST", "/api/appointments", payload);
      return await res.json();
    },
    onSuccess: (data) => {
      toast({
        title: "¡Cita agendada con éxito!",
        // Use preferredDate from the response
        description: `Te esperamos el ${format(new Date(data.preferredDate), "PPP", { locale: es })}. Hemos enviado un correo de confirmación.`,
        duration: 5000,
      });
      form.reset();
    },
    onError: (error: any) => {
      if (error.status === 401) {
        toast({
          title: "Sesión expirada",
          description: "Debes iniciar sesión para agendar una cita.",
          variant: "destructive",
        });
        setLocation("/auth");
      } else {
        toast({
          title: "Error",
          description: "Hubo un problema al agendar la cita. Por favor intenta nuevamente.",
          variant: "destructive",
        });
      }
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
      toast({
        title: "Inicia sesión",
        description: "Debes iniciar sesión para agendar una cita.",
        variant: "default",
      });
      setLocation("/auth");
      return;
    }
    mutation.mutate(values);
  }

  const isSubmitting = mutation.isPending;


  return (
    <section id="booking" className="py-20 relative bg-primary/5">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <span className="text-primary font-semibold tracking-wider text-sm uppercase mb-2 block">
              Agenda tu visita
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Sistema de Citas Online
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Reserva fácilmente una cita desde cualquier dispositivo. Nuestro sistema permite
              agendar consultas, servicios y controles médicos de forma rápida y segura.
            </p>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Horarios de Atención</h3>
              <ul className="space-y-3">
                <li className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Lunes - Viernes</span>
                  <span className="font-medium text-primary">8:00 AM - 8:00 PM</span>
                </li>
                <li className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Sábados</span>
                  <span className="font-medium text-primary">9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between pb-2">
                  <span className="text-gray-600">Domingos y Feriados</span>
                  <span className="font-medium text-accent-foreground">Solo Emergencias</span>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-2">¿Tienes una emergencia?</p>
                <a href="tel:+123456789" className="text-2xl font-bold text-red-500 hover:text-red-600 flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  (01) 123-4567
                </a>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-primary p-6 text-white text-center">
                <h3 className="text-2xl font-bold">Reserva tu Cita</h3>
                <p className="text-primary-foreground/80">Completa el formulario y te contactaremos</p>
              </div>

              <div className="p-6 md:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="ownerName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tu Nombre</FormLabel>
                            <FormControl>
                              <Input placeholder="Juan Pérez" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="petName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre de Mascota</FormLabel>
                            <FormControl>
                              <Input placeholder="Firulais" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="species"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Especie</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Seleccionar" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="perro">Perro</SelectItem>
                                <SelectItem value="gato">Gato</SelectItem>
                                <SelectItem value="ave">Ave</SelectItem>
                                <SelectItem value="otro">Otro</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Teléfono</FormLabel>
                            <FormControl>
                              <Input placeholder="999 999 999" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="correo@ejemplo.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="serviceType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tipo de Servicio</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Seleccionar" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="consulta">Consulta General</SelectItem>
                                <SelectItem value="vacuna">Vacunación</SelectItem>
                                <SelectItem value="grooming">Grooming</SelectItem>
                                <SelectItem value="cirugia">Cirugía</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Fecha Preferida</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP", { locale: es })
                                    ) : (
                                      <span>Seleccionar fecha</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < startOfDay(new Date()) || date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Observaciones (Opcional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Breve descripción de los síntomas o requerimientos..."
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-lg h-12" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Procesando...
                        </>
                      ) : (
                        "Confirmar Cita"
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
