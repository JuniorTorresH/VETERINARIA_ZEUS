import { useAuth } from "@/hooks/use-auth";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar, Users, Activity } from "lucide-react";

export default function AdminPage() {
    const { user } = useAuth();
    const [, setLocation] = useLocation();

    if (!user) {
        setLocation("/auth");
        return null;
    }

    // Simple protection for demo
    if (user.username !== 'admin') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Acceso Denegado</h1>
                <p className="text-gray-600 mb-6">No tienes permisos para ver esta página.</p>
                <Link href="/">
                    <Button>Volver al Inicio</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <header className="bg-white border-b sticky top-0 z-30">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Activity className="text-primary" />
                        Panel de Control
                    </h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">Bienvenido, {user.username}</span>
                        <Link href="/">
                            <Button variant="outline" size="sm">Ver Sitio Web</Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium">Citas Hoy</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">4</div>
                            <p className="text-xs text-muted-foreground">+2 desde ayer</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium">Usuarios Registrados</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12</div>
                            <p className="text-xs text-muted-foreground">+10% mes pasado</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium">Servicios Activos</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">8</div>
                        </CardContent>
                    </Card>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h2 className="text-lg font-semibold mb-4">Próximas Citas</h2>
                    <p className="text-gray-500 text-sm">Funcionalidad de gestión de citas en desarrollo.</p>
                </div>
            </main>
        </div>
    );
}
