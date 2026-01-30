import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, User as UserIcon, LogOut, UserCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NAV_ITEMS = [
  { name: "Inicio", href: "/" },
  { name: "Servicios", href: "/#servicios" },
  { name: "Nosotros", href: "/#nosotros" },
  { name: "Contacto", href: "/#contacto" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);

    if (location !== "/") {
      window.location.href = href;
      return;
    }

    if (href === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (href.startsWith("/#")) {
      const id = href.substring(2);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("/");
            }}
            className="text-xl md:text-2xl font-bold text-primary flex items-center gap-2 cursor-pointer"
          >
            <span className="text-2xl md:text-3xl">🐾</span> Veterinaria Zeus
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={cn(
                    "text-sm font-medium transition-colors duration-300 hover:text-primary relative group",
                    scrolled ? "text-primary" : "text-white"
                  )}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4 relative">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className={cn(
                      "flex items-center gap-2 transition-colors duration-300 group cursor-pointer",
                      scrolled ? "text-emerald-950 hover:text-emerald-800" : "text-white hover:text-white/80"
                    )}>
                      <div className={cn(
                        "p-1 rounded-full transition-colors duration-300",
                        scrolled ? "group-hover:bg-emerald-950/10" : "group-hover:bg-white/10"
                      )}>
                        <UserCircle className="w-6 h-6" />
                      </div>
                      <span className="text-base font-bold">Hola, {user.username}</span>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="absolute right-0 top-full mt-2 w-56 bg-white shadow-xl border border-gray-100 z-[100]">
                    <DropdownMenuItem className="cursor-pointer text-[#000000] font-extrabold hover:bg-gray-100 focus:text-black">
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>Mi Perfil</span>
                    </DropdownMenuItem>

                    {user.username === 'admin' && (
                      <Link href="/admin">
                        <DropdownMenuItem className="cursor-pointer text-black font-extrabold hover:bg-gray-100 focus:text-black">
                          <span className="mr-2">⚡</span>
                          <span>Panel de Control</span>
                        </DropdownMenuItem>
                      </Link>
                    )}

                    <DropdownMenuItem
                      onClick={() => logoutMutation.mutate()}
                      className="cursor-pointer border-t mt-1 text-black font-extrabold hover:bg-gray-100 focus:text-black"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Cerrar Sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/auth" className={cn(
                  "flex items-center gap-2 transition-colors duration-300 group",
                  scrolled ? "text-emerald-950 hover:text-emerald-800" : "text-white hover:text-white/80"
                )}>
                  <div className={cn(
                    "p-1 rounded-full transition-colors duration-300",
                    scrolled ? "group-hover:bg-emerald-950/10" : "group-hover:bg-white/10"
                  )}>
                    <UserCircle className="w-6 h-6" />
                  </div>
                  <span className="text-base font-bold">Iniciar Sesión</span>
                </Link>
              )}

              <Button
                onClick={() => handleNavClick("/#booking")}
                className="rounded-full px-6 bg-primary hover:bg-primary/90"
              >
                Agendar Cita
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b shadow-lg animate-in slide-in-from-top-5">
          <div className="flex flex-col p-4 gap-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="text-gray-600 font-medium py-2 hover:text-primary transition-colors"
              >
                {item.name}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t">
              {user ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm font-medium px-2 py-1.5 text-gray-600">
                    <UserIcon className="h-4 w-4" />
                    {user.username}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => logoutMutation.mutate()}
                    className="w-full text-red-600 hover:text-red-600"
                  >
                    Cerrar Sesión
                  </Button>
                </div>
              ) : (
                <Link href="/auth">
                  <Button variant="outline" className="w-full">
                    Iniciar Sesión
                  </Button>
                </Link>
              )}
              <Button onClick={() => handleNavClick("/#booking")} className="w-full">
                Agendar Cita
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
