import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
}

export interface Order {
  id: string;
  client: string;
  items: string;
  time: string;
  status: "Em preparo" | "Pronto" | "Entregue";
  date: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  openingHours: string;
}

interface RestaurantDataContextType {
  menuItems: MenuItem[];
  orders: Order[];
  contactInfo: ContactInfo;
  addMenuItem: (item: Omit<MenuItem, "id">) => void;
  updateMenuItem: (id: string, item: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  addOrder: (order: Omit<Order, "id" | "time" | "date">) => void;
  updateOrderStatus: (id: string, status: "Em preparo" | "Pronto" | "Entregue") => void;
  deleteOrder: (id: string) => void;
  updateContactInfo: (info: Partial<ContactInfo>) => void;
  getTodayOrders: () => Order[];
  getOrdersByStatus: (status: string) => Order[];
}

const RestaurantDataContext = createContext<RestaurantDataContextType | undefined>(undefined);

const initialMenuItems: MenuItem[] = [
  // Antipasti
  { id: "1", name: "Bruschetta Tradizionale", category: "Antipasti", price: "R$ 28,00", description: "Pão italiano tostado com tomates frescos, manjericão e azeite extra virgem" },
  { id: "2", name: "Carpaccio di Manzo", category: "Antipasti", price: "R$ 45,00", description: "Finas fatias de filé mignon cru com rúcula, parmesão e molho de alcaparras" },
  { id: "3", name: "Prosciutto e Melone", category: "Antipasti", price: "R$ 38,00", description: "Presunto Parma com melão fresco" },
  
  // Massas
  { id: "4", name: "Spaghetti alla Carbonara", category: "Massas", price: "R$ 58,00", description: "Massa italiana com ovos, queijo pecorino romano e guanciale" },
  { id: "5", name: "Fettuccine Alfredo", category: "Massas", price: "R$ 52,00", description: "Fettuccine ao molho cremoso de manteiga e parmesão" },
  { id: "6", name: "Lasagna Bolognese", category: "Massas", price: "R$ 62,00", description: "Camadas de massa fresca com ragù bolognese e molho bechamel" },
  { id: "7", name: "Ravioli ai Funghi", category: "Massas", price: "R$ 68,00", description: "Ravióli recheado com cogumelos porcini ao molho de manteiga e sálvia" },
  { id: "8", name: "Penne Arrabbiata", category: "Massas", price: "R$ 48,00", description: "Penne ao molho de tomate picante com alho e pimenta calabresa" },
  
  // Pizzas
  { id: "9", name: "Pizza Margherita", category: "Pizzas", price: "R$ 52,00", description: "Molho de tomate, mussarela de búfala, manjericão fresco e azeite" },
  { id: "10", name: "Pizza Quattro Formaggi", category: "Pizzas", price: "R$ 65,00", description: "Gorgonzola, mussarela, parmesão e fontina" },
  { id: "11", name: "Pizza Prosciutto e Funghi", category: "Pizzas", price: "R$ 68,00", description: "Presunto parma, cogumelos frescos e mussarela" },
  { id: "12", name: "Pizza Diavola", category: "Pizzas", price: "R$ 62,00", description: "Salame picante, mussarela e pimentas" },
  
  // Risotos
  { id: "13", name: "Risotto ai Funghi Porcini", category: "Risotos", price: "R$ 72,00", description: "Risoto cremoso com cogumelos porcini e parmesão" },
  { id: "14", name: "Risotto allo Zafferano", category: "Risotos", price: "R$ 68,00", description: "Risoto milanês com açafrão e medula bovina" },
  { id: "15", name: "Risotto ai Frutti di Mare", category: "Risotos", price: "R$ 85,00", description: "Risoto com frutos do mar frescos ao vinho branco" },
  
  // Carnes
  { id: "16", name: "Ossobuco alla Milanese", category: "Carnes", price: "R$ 95,00", description: "Ossobuco cozido lentamente com vinho branco e legumes" },
  { id: "17", name: "Saltimbocca alla Romana", category: "Carnes", price: "R$ 88,00", description: "Escalopes de vitela com presunto parma e sálvia" },
  { id: "18", name: "Bistecca Fiorentina", category: "Carnes", price: "R$ 125,00", description: "T-bone grelhado ao ponto com alecrim e azeite (para 2 pessoas)" },
  
  // Sobremesas
  { id: "19", name: "Tiramisù Classico", category: "Sobremesas", price: "R$ 28,00", description: "Clássica sobremesa com mascarpone, café e cacau" },
  { id: "20", name: "Panna Cotta", category: "Sobremesas", price: "R$ 25,00", description: "Creme italiano delicado com calda de frutas vermelhas" },
  { id: "21", name: "Cannoli Siciliani", category: "Sobremesas", price: "R$ 32,00", description: "Massa crocante recheada com ricota doce e pistache" },
  { id: "22", name: "Gelato Artigianale", category: "Sobremesas", price: "R$ 22,00", description: "Sorvete artesanal italiano (3 sabores)" },
  
  // Bebidas
  { id: "23", name: "Prosecco DOC", category: "Bebidas", price: "R$ 95,00", description: "Espumante italiano autêntico, garrafa 750ml" },
  { id: "24", name: "Chianti Classico", category: "Bebidas", price: "R$ 120,00", description: "Vinho tinto toscano, garrafa 750ml" },
  { id: "25", name: "Limoncello", category: "Bebidas", price: "R$ 18,00", description: "Licor de limão siciliano, dose" },
  { id: "26", name: "Espresso Italiano", category: "Bebidas", price: "R$ 8,00", description: "Café expresso tradicional italiano" },
];

const initialOrders: Order[] = [
  { id: "1", client: "Marco Rossi", items: "Carbonara, Vinho Tinto", time: "14:30", status: "Em preparo", date: new Date().toISOString().split('T')[0] },
  { id: "2", client: "Sofia Romano", items: "Margherita, Tiramisu", time: "14:25", status: "Pronto", date: new Date().toISOString().split('T')[0] },
  { id: "3", client: "Giovanni Bianchi", items: "Lasagna, Panna Cotta", time: "14:20", status: "Em preparo", date: new Date().toISOString().split('T')[0] },
  { id: "4", client: "Isabella Ferrari", items: "Ravioli, Prosecco", time: "14:15", status: "Entregue", date: new Date().toISOString().split('T')[0] },
  { id: "5", client: "Antonio Costa", items: "Risotto, Limoncello", time: "14:10", status: "Em preparo", date: new Date().toISOString().split('T')[0] },
];

const initialContactInfo: ContactInfo = {
  phone: "+55 11 3456-7890",
  email: "contato@parmaristorante.com.br",
  address: "Rua Augusta, 1234 - Consolação, São Paulo - SP",
  openingHours: "Terça a Domingo: 12h - 23h | Segunda: Fechado",
};

export function RestaurantDataProvider({ children }: { children: ReactNode }) {
  // Load from localStorage or use initial data
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem("parma_menu_items");
    return saved ? JSON.parse(saved) : initialMenuItems;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("parma_orders");
    return saved ? JSON.parse(saved) : initialOrders;
  });

  const [contactInfo, setContactInfo] = useState<ContactInfo>(() => {
    const saved = localStorage.getItem("parma_contact_info");
    return saved ? JSON.parse(saved) : initialContactInfo;
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("parma_menu_items", JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem("parma_orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("parma_contact_info", JSON.stringify(contactInfo));
  }, [contactInfo]);

  // Menu functions
  const addMenuItem = (item: Omit<MenuItem, "id">) => {
    const newId = (Math.max(0, ...menuItems.map(m => parseInt(m.id))) + 1).toString();
    const newItem: MenuItem = {
      ...item,
      id: newId,
    };
    setMenuItems([...menuItems, newItem]);
  };

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  // Order functions
  const addOrder = (order: Omit<Order, "id" | "time" | "date">) => {
    const now = new Date();
    const newId = (Math.max(0, ...orders.map(o => parseInt(o.id))) + 1).toString();
    const newOrder: Order = {
      ...order,
      id: newId,
      time: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      date: now.toISOString().split('T')[0],
    };
    setOrders([newOrder, ...orders]);
  };

  const updateOrderStatus = (id: string, status: "Em preparo" | "Pronto" | "Entregue") => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status } : order
    ));
  };

  const deleteOrder = (id: string) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  // Contact info function
  const updateContactInfo = (info: Partial<ContactInfo>) => {
    setContactInfo({ ...contactInfo, ...info });
  };

  // Helper functions
  const getTodayOrders = () => {
    const today = new Date().toISOString().split('T')[0];
    return orders.filter(order => order.date === today);
  };

  const getOrdersByStatus = (status: string) => {
    return orders.filter(order => order.status === status);
  };

  return (
    <RestaurantDataContext.Provider 
      value={{ 
        menuItems,
        orders,
        contactInfo,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        updateContactInfo,
        getTodayOrders,
        getOrdersByStatus,
      }}
    >
      {children}
    </RestaurantDataContext.Provider>
  );
}

export function useRestaurantData() {
  const context = useContext(RestaurantDataContext);
  if (context === undefined) {
    throw new Error("useRestaurantData must be used within a RestaurantDataProvider");
  }
  return context;
}
