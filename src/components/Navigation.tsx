import { Wine, Home, ShoppingBag, UtensilsCrossed, Users, Settings } from "lucide-react";
import { Button } from "./ui/button";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onSwitchToClient?: () => void;
}

export function Navigation({ currentPage, onNavigate, onSwitchToClient }: NavigationProps) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "orders", label: "Pedidos", icon: ShoppingBag },
    { id: "menu", label: "Cardápio", icon: UtensilsCrossed },
    { id: "tables", label: "Mesas", icon: Users },
    { id: "settings", label: "Configurações", icon: Settings },
  ];

  return (
    <nav className="bg-[#4b2e05] shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <Wine className="w-8 h-8 text-[#c7a17a]" />
            <div>
              <h1 className="text-[#c7a17a] tracking-wide">Parma Ristorante</h1>
              <p className="text-[#e6d4c1] text-sm italic">Autenticità Italiana</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all ${
                    isActive
                      ? "bg-[#c7a17a] text-white shadow-md"
                      : "text-[#e6d4c1] hover:bg-[#5d3a0a] hover:text-[#c7a17a]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            {onSwitchToClient && (
              <Button
                onClick={onSwitchToClient}
                variant="outline"
                className="ml-4 border-[#c7a17a] text-[#c7a17a] hover:bg-[#c7a17a] hover:text-white"
              >
                Ver Site
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
