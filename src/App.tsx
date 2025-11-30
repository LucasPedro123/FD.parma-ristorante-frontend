import { useState } from "react";
import { Login } from "./components/Login";
import { Navigation } from "./components/Navigation";
import { Dashboard } from "./components/Dashboard";
import { Orders } from "./components/Orders";
import { Menu } from "./components/Menu";
import { Tables } from "./components/Tables";
import { Settings } from "./components/Settings";
import { ClientNavigation } from "./components/ClientNavigation";
import { ClientHome } from "./components/ClientHome";
import { ClientMenu } from "./components/ClientMenu";
import { ClientReservation } from "./components/ClientReservation";
import { ClientContact } from "./components/ClientContact";
import { TablesProvider } from "./contexts/TablesContext";
import { RestaurantDataProvider } from "./contexts/RestaurantDataContext";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mode, setMode] = useState<"client" | "admin">("client"); // Start with client mode
  const [currentPage, setCurrentPage] = useState("home"); // Start at home for client

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage("dashboard");
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const handleSwitchToClient = () => {
    setMode("client");
    setCurrentPage("home");
  };

  const handleSwitchToAdmin = () => {
    setMode("admin");
    if (!isLoggedIn) {
      setCurrentPage("login");
    } else {
      setCurrentPage("dashboard");
    }
  };

  // Admin mode - requires login
  if (mode === "admin") {
    if (!isLoggedIn) {
      return <Login onLogin={handleLogin} />;
    }

    return (
      <RestaurantDataProvider>
        <TablesProvider>
          <div className="min-h-screen bg-background">
            <Navigation 
              currentPage={currentPage} 
              onNavigate={handleNavigate}
              onSwitchToClient={handleSwitchToClient}
            />
            
            {currentPage === "dashboard" && <Dashboard />}
            {currentPage === "orders" && <Orders />}
            {currentPage === "menu" && <Menu />}
            {currentPage === "tables" && <Tables />}
            {currentPage === "settings" && <Settings />}
            <Toaster />
          </div>
        </TablesProvider>
      </RestaurantDataProvider>
    );
  }

  // Client mode - public access
  return (
    <RestaurantDataProvider>
      <TablesProvider>
        <div className="min-h-screen bg-background">
          <ClientNavigation 
            currentPage={currentPage} 
            onNavigate={handleNavigate}
            onSwitchToAdmin={handleSwitchToAdmin}
          />
          
          {currentPage === "home" && <ClientHome onNavigate={handleNavigate} />}
          {currentPage === "menu" && <ClientMenu />}
          {currentPage === "reservation" && <ClientReservation />}
          {currentPage === "contact" && <ClientContact />}
        </div>
      </TablesProvider>
    </RestaurantDataProvider>
  );
}
