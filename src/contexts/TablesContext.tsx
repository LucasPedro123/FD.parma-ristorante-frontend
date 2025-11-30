import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export interface Table {
  id: string;
  number: string;
  status: "Free" | "Occupied" | "Reserved";
  waiter: string;
  guests?: number;
  capacity: number;
  reservationName?: string;
  reservationDate?: string;
  reservationTime?: string;
  openingTime: string;
  closingTime: string;
  isOpen: boolean;
}

interface TablesContextType {
  tables: Table[];
  isRestaurantOpen: boolean;
  addTable: (table: Omit<Table, "id">) => void;
  removeTable: (id: string) => void;
  updateTableStatus: (
    id: string,
    status: "Free" | "Occupied" | "Reserved",
  ) => void;
  updateTableWaiter: (id: string, waiter: string) => void;
  reserveTable: (
    id: string,
    name: string,
    date: string,
    time: string,
    guests: number,
  ) => void;
  getAvailableTables: (
    date: string,
    time: string,
    guests: number,
  ) => Table[];
  toggleRestaurantOpen: () => void;
  updateTableTiming: (
    id: string,
    openingTime: string,
    closingTime: string,
  ) => void;
  toggleTableOpen: (id: string) => void;
}

const TablesContext = createContext<
  TablesContextType | undefined
>(undefined);

const initialTables: Table[] = [
  {
    id: "1",
    number: "01",
    status: "Occupied",
    waiter: "Marco",
    guests: 4,
    capacity: 4,
    openingTime: "12:00",
    closingTime: "23:00",
    isOpen: true,
  },
  {
    id: "2",
    number: "02",
    status: "Free",
    waiter: "Sofia",
    capacity: 2,
    openingTime: "12:00",
    closingTime: "23:00",
    isOpen: true,
  },
  {
    id: "3",
    number: "03",
    status: "Occupied",
    waiter: "Giovanni",
    guests: 2,
    capacity: 2,
    openingTime: "12:00",
    closingTime: "23:00",
    isOpen: true,
  },
  {
    id: "4",
    number: "04",
    status: "Reserved",
    waiter: "Isabella",
    guests: 6,
    capacity: 6,
    openingTime: "12:00",
    closingTime: "23:00",
    isOpen: true,
  },
  {
    id: "5",
    number: "05",
    status: "Free",
    waiter: "Marco",
    capacity: 4,
    openingTime: "12:00",
    closingTime: "23:00",
    isOpen: true,
  },
  {
    id: "6",
    number: "06",
    status: "Occupied",
    waiter: "Antonio",
    guests: 3,
    capacity: 4,
    openingTime: "12:00",
    closingTime: "23:00",
    isOpen: true,
  },
  {
    id: "7",
    number: "07",
    status: "Free",
    waiter: "Sofia",
    capacity: 2,
    openingTime: "12:00",
    closingTime: "23:00",
    isOpen: true,
  },
  {
    id: "8",
    number: "08",
    status: "Occupied",
    waiter: "Elena",
    guests: 2,
    capacity: 2,
    openingTime: "12:00",
    closingTime: "23:00",
    isOpen: true,
  },
  {
    id: "9",
    number: "09",
    status: "Reserved",
    waiter: "Marco",
    guests: 4,
    capacity: 4,
    openingTime: "12:00",
    closingTime: "23:00",
    isOpen: true,
  },
  {
    id: "10",
    number: "10",
    status: "Free",
    waiter: "Giovanni",
    capacity: 4,
    openingTime: "12:00",
    closingTime: "23:00",
    isOpen: true,
  },
  {
    id: "11",
    number: "11",
    status: "Occupied",
    waiter: "Isabella",
    guests: 5,
    capacity: 6,
    openingTime: "12:00",
    closingTime: "23:00",
    isOpen: true,
  },
  {
    id: "12",
    number: "12",
    status: "Free",
    waiter: "Antonio",
    capacity: 4,
    openingTime: "12:00",
    closingTime: "23:00",
    isOpen: true,
  },
  {
    id: "13",
    number: "13",
    status: "Occupied",
    waiter: "Sofia",
    guests: 2,
    capacity: 2,
    openingTime: "12:00",
    closingTime: "23:00",
    isOpen: true,
  },
  {
    id: "14",
    number: "14",
    status: "Free",
    waiter: "Elena",
    capacity: 4,
    openingTime: "12:00",
    closingTime: "23:00",
    isOpen: true,
  },
  {
    id: "15",
    number: "15",
    status: "Occupied",
    waiter: "Marco",
    guests: 4,
    capacity: 4,
    openingTime: "12:00",
    closingTime: "23:00",
    isOpen: true,
  },
  {
    id: "16",
    number: "16",
    status: "Free",
    waiter: "Giovanni",
    capacity: 2,
    openingTime: "12:00",
    closingTime: "23:00",
    isOpen: true,
  },
  {
    id: "17",
    number: "17",
    status: "Occupied",
    waiter: "Isabella",
    guests: 3,
    capacity: 4,
    openingTime: "12:00",
    closingTime: "23:00",
    isOpen: true,
  },
  {
    id: "18",
    number: "18",
    status: "Reserved",
    waiter: "Antonio",
    guests: 8,
    capacity: 8,
    openingTime: "12:00",
    closingTime: "23:00",
    isOpen: true,
  },
  {
    id: "19",
    number: "19",
    status: "Free",
    waiter: "Sofia",
    capacity: 4,
    openingTime: "12:00",
    closingTime: "23:00",
    isOpen: true,
  },
  {
    id: "20",
    number: "20",
    status: "Occupied",
    waiter: "Elena",
    guests: 2,
    capacity: 2,
    openingTime: "12:00",
    closingTime: "23:00",
    isOpen: true,
  },
  {
    id: "21",
    number: "21",
    status: "Free",
    waiter: "Marco",
    capacity: 4,
    openingTime: "12:00",
    closingTime: "23:00",
    isOpen: true,
  },
  {
    id: "22",
    number: "22",
    status: "Free",
    waiter: "Giovanni",
    capacity: 2,
    openingTime: "12:00",
    closingTime: "23:00",
    isOpen: true,
  },
  {
    id: "23",
    number: "23",
    status: "Occupied",
    waiter: "Isabella",
    guests: 6,
    capacity: 6,
    openingTime: "12:00",
    closingTime: "23:00",
    isOpen: true,
  },
  {
    id: "24",
    number: "24",
    status: "Free",
    waiter: "Antonio",
    capacity: 4,
    openingTime: "12:00",
    closingTime: "23:00",
    isOpen: true,
  },
  {
    id: "25",
    number: "25",
    status: "Occupied",
    waiter: "Sofia",
    guests: 4,
    capacity: 4,
    openingTime: "12:00",
    closingTime: "23:00",
    isOpen: true,
  },
];

export function TablesProvider({
  children,
}: {
  children: ReactNode;
}) {
  // Load from localStorage or use initial data
  const [tables, setTables] = useState<Table[]>(() => {
    const saved = localStorage.getItem("parma_tables");
    return saved ? JSON.parse(saved) : initialTables;
  });

  const [isRestaurantOpen, setIsRestaurantOpen] = useState(
    () => {
      const saved = localStorage.getItem(
        "parma_restaurant_open",
      );
      return saved ? JSON.parse(saved) : true;
    },
  );

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(
      "parma_tables",
      JSON.stringify(tables),
    );
  }, [tables]);

  useEffect(() => {
    localStorage.setItem(
      "parma_restaurant_open",
      JSON.stringify(isRestaurantOpen),
    );
  }, [isRestaurantOpen]);

  const addTable = (table: Omit<Table, "id">) => {
    const newId = (
      Math.max(...tables.map((t) => parseInt(t.id))) + 1
    ).toString();
    const newTable: Table = {
      ...table,
      id: newId,
    };
    setTables([...tables, newTable]);
  };

  const removeTable = (id: string) => {
    setTables(tables.filter((table) => table.id !== id));
  };

  const updateTableStatus = (
    id: string,
    status: "Free" | "Occupied" | "Reserved",
  ) => {
    setTables(
      tables.map((table) =>
        table.id === id ? { ...table, status } : table,
      ),
    );
  };

  const updateTableWaiter = (id: string, waiter: string) => {
    setTables(
      tables.map((table) =>
        table.id === id ? { ...table, waiter } : table,
      ),
    );
  };

  const reserveTable = (
    id: string,
    name: string,
    date: string,
    time: string,
    guests: number,
  ) => {
    setTables(
      tables.map((table) =>
        table.id === id
          ? {
              ...table,
              status: "Reserved",
              guests,
              reservationName: name,
              reservationDate: date,
              reservationTime: time,
            }
          : table,
      ),
    );
  };

  const getAvailableTables = (
    date: string,
    time: string,
    guests: number,
  ) => {
    // For simplicity, we'll just check capacity and free/not reserved status
    // In a real app, you'd check against specific dates/times
    return tables.filter(
      (table) =>
        (table.status === "Free" ||
          (table.status === "Reserved" &&
            table.reservationDate !== date &&
            table.reservationTime !== time)) &&
        table.capacity >= guests &&
        table.isOpen &&
        isRestaurantOpen,
    );
  };

  const toggleRestaurantOpen = () => {
    setIsRestaurantOpen(!isRestaurantOpen);
  };

  const updateTableTiming = (
    id: string,
    openingTime: string,
    closingTime: string,
  ) => {
    setTables(
      tables.map((table) =>
        table.id === id
          ? { ...table, openingTime, closingTime }
          : table,
      ),
    );
  };

  const toggleTableOpen = (id: string) => {
    setTables(
      tables.map((table) =>
        table.id === id
          ? { ...table, isOpen: !table.isOpen }
          : table,
      ),
    );
  };

  return (
    <TablesContext.Provider
      value={{
        tables,
        isRestaurantOpen,
        addTable,
        removeTable,
        updateTableStatus,
        updateTableWaiter,
        reserveTable,
        getAvailableTables,
        toggleRestaurantOpen,
        updateTableTiming,
        toggleTableOpen,
      }}
    >
      {children}
    </TablesContext.Provider>
  );
}

export function useTables() {
  const context = useContext(TablesContext);
  if (context === undefined) {
    throw new Error(
      "useTables must be used within a TablesProvider",
    );
  }
  return context;
}