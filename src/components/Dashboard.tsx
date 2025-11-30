import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ShoppingBag, Clock, Users, CheckCircle } from "lucide-react";
import { useRestaurantData } from "../contexts/RestaurantDataContext";
import { useTables } from "../contexts/TablesContext";
import { useMemo } from "react";

export function Dashboard() {
  const { getTodayOrders, getOrdersByStatus } = useRestaurantData();
  const { tables } = useTables();

  const todayOrders = getTodayOrders();
  const ordersInProgress = getOrdersByStatus("Em preparo");
  const occupiedTables = tables.filter(t => t.status === "Occupied").length;
  const freeTables = tables.filter(t => t.status === "Free").length;

  const statsData = useMemo(() => [
    {
      title: "Pedidos de Hoje",
      value: todayOrders.length.toString(),
      icon: ShoppingBag,
      color: "from-[#c7a17a] to-[#b89968]",
      bgColor: "bg-[#c7a17a]/10",
    },
    {
      title: "Pedidos em Andamento",
      value: ordersInProgress.length.toString(),
      icon: Clock,
      color: "from-[#d4a574] to-[#c7a17a]",
      bgColor: "bg-[#d4a574]/10",
    },
    {
      title: "Mesas Ocupadas",
      value: `${occupiedTables}/${tables.length}`,
      icon: Users,
      color: "from-[#8b6f47] to-[#a68a5c]",
      bgColor: "bg-[#8b6f47]/10",
    },
    {
      title: "Mesas Disponíveis",
      value: freeTables.toString(),
      icon: CheckCircle,
      color: "from-[#b89968] to-[#8b6f47]",
      bgColor: "bg-[#b89968]/10",
    },
  ], [todayOrders, ordersInProgress, occupiedTables, freeTables, tables.length]);

  // Get the 5 most recent orders
  const recentOrders = todayOrders.slice(0, 5);
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-[#4b2e05]">Painel de Controle</h1>
          <p className="text-[#8b6f47]">
            Visão geral do restaurante - {new Date().toLocaleDateString('pt-BR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={index} 
                className="border-[#c7a17a]/20 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm"
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm text-[#8b6f47]">
                    {stat.title}
                  </CardTitle>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <Icon className={`w-5 h-5 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} style={{
                      fill: 'currentColor',
                      color: '#c7a17a'
                    }} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-[#4b2e05]">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Orders */}
        <Card className="border-[#c7a17a]/20 shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-[#4b2e05]">Pedidos Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <div 
                    key={order.id} 
                    className="flex items-center justify-between p-4 bg-white rounded-lg border border-[#c7a17a]/10 hover:border-[#c7a17a]/30 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-br from-[#c7a17a] to-[#b89968] text-white px-3 py-1 rounded-md shadow">
                        #{order.id.padStart(3, '0')}
                      </div>
                      <div>
                        <p className="text-[#4b2e05]">{order.client}</p>
                        <p className="text-sm text-[#8b6f47]">{order.items}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-sm text-[#8b6f47]">{order.time}</p>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        order.status === "Pronto" 
                          ? "bg-green-100 text-green-700" 
                          : order.status === "Entregue"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-[#8b6f47]">
                  Nenhum pedido hoje ainda
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
