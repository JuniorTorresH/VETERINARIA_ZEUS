import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { insertUserSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthPage() {
    const { user, loginMutation, registerMutation } = useAuth();
    const [, setLocation] = useLocation();
    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        if (user) {
            setLocation("/");
        }
    }, [user, setLocation]);

    // Schemas
    const loginSchema = z.object({
        username: z.string().min(1, "El usuario es requerido"),
        password: z.string().min(1, "La contraseña es requerida"),
    });

    const registerSchema = insertUserSchema.extend({
        confirmPassword: z.string().min(1, "Confirma tu contraseña"),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    });

    // Forms
    const loginForm = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: { username: "", password: "" },
    });

    const registerForm = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            password: "",
            email: "",
            phone: "+51 ",
            confirmPassword: "",
            role: "user"
        },
    });

    if (user) return null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-body overflow-hidden">
            <Card className="w-full max-w-4xl h-[700px] shadow-2xl relative overflow-hidden rounded-2xl border-none mx-auto">
                <CardContent className="p-0 h-full flex flex-col lg:flex-row relative">

                    {/* Mobile Header (Green) */}
                    <div className="w-full h-40 bg-emerald-600 lg:hidden flex items-center justify-center relative overflow-hidden shrink-0">
                        <div className="absolute inset-0 bg-black/10" />
                        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=2070')] bg-cover bg-center" />
                        <div className="relative z-10 text-center p-4">
                            <h2 className="text-3xl font-extrabold text-white mb-1">{isLogin ? "Bienvenido" : "Únete a Zeus"}</h2>
                            <p className="text-white/90 font-medium text-sm">Tu veterinaria de confianza</p>
                        </div>
                    </div>

                    {/* Sliding Hero Section - Desktop Only */}
                    <motion.div
                        initial={false}
                        animate={{ x: isLogin ? "100%" : "0%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="absolute top-0 left-0 w-1/2 h-full z-20 hidden lg:block"
                    >
                        <div className="w-full h-full bg-emerald-600 relative flex items-center justify-center text-white p-12 overflow-hidden">
                            <div className="absolute inset-0 bg-black/10" />
                            {/* Background Image Effect */}
                            <div
                                className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=2070')] bg-cover bg-center"
                            />

                            <div className="relative z-10 text-center">
                                <motion.h2
                                    className="text-4xl font-extrabold mb-6 text-white"
                                    key={isLogin ? "login-hero" : "register-hero"}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    {isLogin ? "¿Nuevo en Zeus?" : "¿Ya tienes cuenta?"}
                                </motion.h2>
                                <p className="text-xl mb-8 text-white/90 font-bold">
                                    {isLogin
                                        ? "Regístrate para gestionar las citas y el historial de tu mascota fácilmente."
                                        : "Inicia sesión para ver tus próximas citas y actualizaciones."}
                                </p>
                                <Button
                                    variant="outline"
                                    className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-emerald-900 text-lg px-8 py-6 rounded-full font-extrabold transition-all hover:scale-105"
                                    onClick={() => setIsLogin(!isLogin)}
                                >
                                    {isLogin ? "REGISTRARSE" : "INICIAR SESIÓN"}
                                </Button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Login Form Section (Left Side) */}
                    <div className="w-full lg:w-1/2 h-full flex flex-col justify-center p-8 lg:p-12 bg-white lg:order-1">
                        <AnimatePresence mode="wait">
                            {isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8 max-w-sm mx-auto w-full"
                                >
                                    <div className="text-center mb-10">
                                        <h1 className="text-4xl font-extrabold text-black mb-2 tracking-tight">HOLA DE NUEVO</h1>
                                        <p className="text-gray-500 font-bold text-lg">Ingresa tus datos para entrar</p>
                                    </div>

                                    <Form {...loginForm}>
                                        <form onSubmit={loginForm.handleSubmit((data) => loginMutation.mutate(data))} className="space-y-6">
                                            <FormField
                                                control={loginForm.control}
                                                name="username"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-lg font-extrabold text-black">Usuario</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Tu usuario"
                                                                {...field}
                                                                className="h-12 border-2 border-gray-200 focus-visible:ring-emerald-600 focus-visible:border-emerald-600 font-bold text-lg"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={loginForm.control}
                                                name="password"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-lg font-extrabold text-black">Contraseña</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="password"
                                                                placeholder="••••••••"
                                                                {...field}
                                                                className="h-12 border-2 border-gray-200 focus-visible:ring-emerald-600 focus-visible:border-emerald-600 font-bold text-lg"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button
                                                type="submit"
                                                className="w-full h-14 text-xl font-extrabold mt-6 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg transform active:scale-95 transition-all"
                                                disabled={loginMutation.isPending}
                                            >
                                                {loginMutation.isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                                                ENTRAR
                                            </Button>
                                        </form>
                                    </Form>

                                    <div className="text-center mt-6 lg:hidden">
                                        <p className="text-gray-600 font-bold">¿No tienes cuenta? <span className="text-emerald-600 font-extrabold cursor-pointer" onClick={() => setIsLogin(false)}>Regístrate</span></p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Register Form Section (Right Side) */}
                    <motion.div
                        className={`w-full lg:w-1/2 h-auto lg:h-full flex-col justify-center p-8 lg:p-12 bg-white lg:absolute lg:top-0 lg:right-0 z-10 ${isLogin ? "hidden lg:flex" : "flex"}`}
                        animate={{
                            opacity: isLogin ? 0 : 1,
                            pointerEvents: isLogin ? "none" : "auto",
                        }}
                    >
                        <AnimatePresence mode="wait">
                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-4 max-w-sm mx-auto w-full overflow-y-auto max-h-full py-4 hide-scrollbar"
                                >
                                    <div className="text-center mb-6">
                                        <h1 className="text-3xl font-extrabold text-black mb-2">Crear Cuenta</h1>
                                        <p className="text-gray-500 font-medium text-lg">Únete a la familia Zeus</p>
                                    </div>

                                    <Form {...registerForm}>
                                        <form onSubmit={registerForm.handleSubmit((data) => registerMutation.mutate(data, {
                                            onSuccess: () => {
                                                setIsLogin(true);
                                                registerForm.reset();
                                            }
                                        }))} className="space-y-3">
                                            <FormField
                                                control={registerForm.control}
                                                name="username"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="font-extrabold text-black">Usuario</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Elige un usuario" {...field} className="h-11 border-2 focus-visible:ring-emerald-600 font-bold" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={registerForm.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="font-extrabold text-black">Correo Electrónico</FormLabel>
                                                        <FormControl>
                                                            <Input type="email" placeholder="ejemplo@correo.com" {...field} className="h-11 border-2 focus-visible:ring-emerald-600 font-bold" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={registerForm.control}
                                                name="phone"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="font-extrabold text-black">Celular</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="+51 999 999 999" {...field} className="h-11 border-2 focus-visible:ring-emerald-600 font-bold" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <div className="grid grid-cols-2 gap-4">
                                                <FormField
                                                    control={registerForm.control}
                                                    name="password"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="font-extrabold text-black">Contraseña</FormLabel>
                                                            <FormControl>
                                                                <Input type="password" placeholder="••••••••" {...field} className="h-11 border-2 focus-visible:ring-emerald-600 font-bold" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={registerForm.control}
                                                    name="confirmPassword"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="font-extrabold text-black">Confirmar</FormLabel>
                                                            <FormControl>
                                                                <Input type="password" placeholder="••••••••" {...field} className="h-11 border-2 focus-visible:ring-emerald-600 font-bold" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <Button type="submit" className="w-full h-12 text-lg font-extrabold mt-4 bg-emerald-600 hover:bg-emerald-700" disabled={registerMutation.isPending}>
                                                {registerMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                REGISTRARSE
                                            </Button>
                                        </form>
                                    </Form>

                                    <div className="text-center mt-4 lg:hidden">
                                        <p className="text-gray-600 font-bold">¿Ya tienes cuenta? <span className="text-emerald-600 font-extrabold cursor-pointer" onClick={() => setIsLogin(true)}>Ingresa</span></p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </CardContent>
            </Card>
        </div>
    );
}
