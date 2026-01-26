import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Inicio", href: "#hero" },
    { name: "Sobre Nosotros", href: "#about" },
    { name: "Servicios", href: "#services" },
    { name: "Especialistas", href: "#team" },
    { name: "Testimonios", href: "#testimonials" },
    { name: "Contacto", href: "#contact" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-border/40 py-2 shadow-sm"
          : "bg-transparent py-4 text-white"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a 
          href="#hero" 
          className="text-2xl font-heading font-bold flex items-center gap-2"
          onClick={(e) => handleScrollTo(e, "#hero")}
        >
          <span className={cn("text-primary", !isScrolled && "text-white")}>VET</span>
          <span className={cn("text-gray-800", !isScrolled && "text-white/90")}>CARE</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                !isScrolled ? "text-white/90 hover:text-white" : "text-gray-600"
              )}
            >
              {link.name}
            </a>
          ))}
          <Button 
            className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-full px-6"
            onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
          >
            Agendar Cita
          </Button>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={cn(!isScrolled && "text-white hover:bg-white/20 hover:text-white")}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 mt-10">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      handleScrollTo(e, link.href);
                      // Close sheet logic would go here if we had control over the state
                    }}
                    className="text-lg font-medium text-gray-800 hover:text-primary"
                  >
                    {link.name}
                  </a>
                ))}
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                  onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Agendar Cita
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
