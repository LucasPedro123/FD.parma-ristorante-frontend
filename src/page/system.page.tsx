import { useState, useEffect } from "react";
import { Login } from "../components/Login";
import { Navigation } from "../components/Navigation";
import { Dashboard } from "../components/Dashboard";
import { Orders } from "../components/Orders";
import { Menu } from "../components/Menu";
import { Tables } from "../components/Tables";
import { Settings } from "../components/Settings";
import { ClientNavigation } from "../components/ClientNavigation";
import { ClientHome } from "../components/ClientHome";
import { ClientMenu } from "../components/ClientMenu";
import { ClientReservation } from "../components/ClientReservation";
import { ClientContact } from "../components/ClientContact";
import { TablesProvider } from "../contexts/TablesContext";
import { RestaurantDataProvider } from "../contexts/RestaurantDataContext";
import { Toaster } from "../components/ui/sonner";

export default function SystemApp({ isLoggedInProp = false }: { isLoggedInProp?: boolean }) {
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp);
  const [mode, setMode] = useState<"client" | "admin">("client");
  const [currentPage, setCurrentPage] = useState("home");

  // Lê login do localStorage ao iniciar
  useEffect(() => {
    const data = localStorage.getItem("user_data");
    const userData = localStorage.getItem("user_data");

    if (data && userData) {
      const user = JSON.parse(userData);
      setIsLoggedIn(true);

      if (user.role === "Admin") {
        setMode("admin");
        setCurrentPage("dashboard");
      } else {
        setMode("client");
        setCurrentPage("home");
      }
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    const user = JSON.parse(localStorage.getItem("user_data")!);
    if (user.role === "Admin") {
      setMode("admin");
      setCurrentPage("dashboard");
    }
  };

  const handleNavigate = (page: string) => setCurrentPage(page);
  const handleSwitchToClient = () => { setMode("client"); setCurrentPage("home"); };
  const handleSwitchToAdmin = () => {
    setMode("admin");
    const user = localStorage.getItem("user_data");
    if (!user) setCurrentPage("login");
    else setCurrentPage("dashboard");
  };

  // Admin mode
  if (mode === "admin") {
    if (!isLoggedIn) return <Login onLogin={handleLogin} />;

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

  // Client mode
  return (
    <RestaurantDataProvider>
      <TablesProvider>
        <div className="min-h-screen bg-background">
          <ClientNavigation
            currentPage={currentPage}
            onNavigate={handleNavigate}
            onSwitchToAdmin={handleSwitchToAdmin}
            isLoggedIn={isLoggedIn}
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
