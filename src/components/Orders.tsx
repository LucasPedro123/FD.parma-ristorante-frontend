import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Plus, Eye, Trash2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { useRestaurantData } from "../contexts/RestaurantDataContext";

export function Orders() {
  const { orders, menuItems, addOrder, updateOrderStatus, deleteOrder } = useRestaurantData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({
    client: "",
    item: "",
    quantity: "1",
    observations: "",
  });

  const handleCreateOrder = () => {
    addOrder({
      client: newOrder.client,
      items: `${newOrder.item} (${newOrder.quantity}x)`,
      status: "Em preparo",
    });
    
    setIsDialogOpen(false);
    setNewOrder({ client: "", item: "", quantity: "1", observations: "" });
  };

  const handleStatusChange = (id: string, newStatus: "Em preparo" | "Pronto" | "Entregue") => {
    updateOrderStatus(id, newStatus);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pronto": return "bg-green-100 text-green-700 border-green-200";
      case "Entregue": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Em preparo": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[#4b2e05]">Gestão de Pedidos</h1>
            <p className="text-[#8b6f47]">Gerenciar todos os pedidos do restaurante</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-[#c7a17a] to-[#b89968] hover:from-[#b89968] hover:to-[#a68a5c] text-white shadow-lg">
                <Plus className="w-4 h-4 mr-2" />
                Novo Pedido
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-[#c7a17a]/20">
              <DialogHeader>
                <DialogTitle className="text-[#4b2e05]">Criar Novo Pedido</DialogTitle>
                <DialogDescription className="text-[#8b6f47]">
                  Preencha os detalhes do novo pedido
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="client" className="text-[#4b2e05]">Cliente</Label>
                  <Input
                    id="client"
                    placeholder="Nome do cliente"
                    value={newOrder.client}
                    onChange={(e) => setNewOrder({ ...newOrder, client: e.target.value })}
                    className="border-[#c7a17a]/30 focus:border-[#c7a17a]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="item" className="text-[#4b2e05]">Item do Cardápio</Label>
                  <Select value={newOrder.item} onValueChange={(value) => setNewOrder({ ...newOrder, item: value })}>
                    <SelectTrigger className="border-[#c7a17a]/30 focus:border-[#c7a17a]">
                      <SelectValue placeholder="Selecione um prato" />
                    </SelectTrigger>
                    <SelectContent>
                      {menuItems.map((item) => (
                        <SelectItem key={item.id} value={item.name}>{item.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-[#4b2e05]">Quantidade</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={newOrder.quantity}
                    onChange={(e) => setNewOrder({ ...newOrder, quantity: e.target.value })}
                    className="border-[#c7a17a]/30 focus:border-[#c7a17a]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="observations" className="text-[#4b2e05]">Observações</Label>
                  <Textarea
                    id="observations"
                    placeholder="Observações especiais..."
                    value={newOrder.observations}
                    onChange={(e) => setNewOrder({ ...newOrder, observations: e.target.value })}
                    className="border-[#c7a17a]/30 focus:border-[#c7a17a] resize-none"
                    rows={3}
                  />
                </div>
                
                <Button 
                  onClick={handleCreateOrder}
                  disabled={!newOrder.client || !newOrder.item}
                  className="w-full bg-gradient-to-r from-[#c7a17a] to-[#b89968] hover:from-[#b89968] hover:to-[#a68a5c] text-white"
                >
                  Criar Pedido
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Orders Table */}
        <Card className="border-[#c7a17a]/20 shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-[#4b2e05]">Lista de Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {orders.map((order) => (
                <div 
                  key={order.id} 
                  className="flex items-center justify-between p-5 bg-white rounded-lg border border-[#c7a17a]/10 hover:border-[#c7a17a]/30 transition-all hover:shadow-md"
                >
                  <div className="flex items-center gap-6 flex-1">
                    <div className="bg-gradient-to-br from-[#c7a17a] to-[#b89968] text-white px-4 py-2 rounded-lg shadow-sm min-w-[4rem] text-center">
                      #{order.id.padStart(3, '0')}
                    </div>
                    <div className="flex-1">
                      <p className="text-[#4b2e05]">{order.client}</p>
                      <p className="text-sm text-[#8b6f47]">{order.items}</p>
                      <p className="text-xs text-[#8b6f47]/70">{order.time}</p>
                    </div>
                    <Select value={order.status} onValueChange={(value) => handleStatusChange(order.id, value as "Em preparo" | "Pronto" | "Entregue")}>
                      <SelectTrigger className="w-[140px] border-[#c7a17a]/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Em preparo">Em preparo</SelectItem>
                        <SelectItem value="Pronto">Pronto</SelectItem>
                        <SelectItem value="Entregue">Entregue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => deleteOrder(order.id)}
                    className="ml-4 border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
