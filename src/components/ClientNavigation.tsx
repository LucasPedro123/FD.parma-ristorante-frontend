import { Wine, Home, UtensilsCrossed, Calendar, Phone } from "lucide-react";
import { Button } from "./ui/button";

interface ClientNavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onSwitchToAdmin: () => void;
}

export function ClientNavigation({ currentPage, onNavigate, onSwitchToAdmin }: ClientNavigationProps) {
  const navItems = [
    { id: "home", label: "Início", icon: Home },
    { id: "menu", label: "Cardápio", icon: UtensilsCrossed },
    { id: "reservation", label: "Reservas", icon: Calendar },
    { id: "contact", label: "Contato", icon: Phone },
  ];

  return (
    <nav className="bg-[#4b2e05] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => onNavigate("home")}>
            <Wine className="w-6 sm:w-8 h-6 sm:h-8 text-[#c7a17a]" />
            <div>
              <h1 className="text-[#c7a17a] tracking-wide text-base sm:text-xl">Parma Ristorante</h1>
              <p className="text-[#e6d4c1] text-xs sm:text-sm italic hidden sm:block">Autenticità Italiana</p>
            </div>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-all ${
                    isActive
                      ? "bg-[#c7a17a] text-white shadow-md"
                      : "text-[#e6d4c1] hover:bg-[#5d3a0a] hover:text-[#c7a17a]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline text-sm sm:text-base">{item.label}</span>
                </button>
              );
            })}
            <Button
              onClick={onSwitchToAdmin}
              variant="outline"
              className="ml-2 sm:ml-4 border-[#c7a17a] text-[#c7a17a] hover:bg-[#c7a17a] hover:text-white text-xs sm:text-sm px-2 sm:px-4"
            >
              Admin
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
