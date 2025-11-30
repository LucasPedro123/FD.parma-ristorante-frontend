import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useRestaurantData, MenuItem } from "../contexts/RestaurantDataContext";

const categories = ["Antipasti", "Massas", "Pizzas", "Risotos", "Carnes", "Sobremesas", "Bebidas"];

export function Menu() {
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem } = useRestaurantData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });

  const handleOpenDialog = (item?: MenuItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        category: item.category,
        price: item.price,
        description: item.description,
      });
    } else {
      setEditingItem(null);
      setFormData({ name: "", category: "", price: "", description: "" });
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingItem) {
      updateMenuItem(editingItem.id, formData);
    } else {
      addMenuItem(formData);
    }
    setIsDialogOpen(false);
    setFormData({ name: "", category: "", price: "", description: "" });
  };

  const handleDelete = (id: string) => {
    deleteMenuItem(id);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Massas": "bg-amber-100 text-amber-700 border-amber-200",
      "Pizzas": "bg-red-100 text-red-700 border-red-200",
      "Risotos": "bg-yellow-100 text-yellow-700 border-yellow-200",
      "Sobremesas": "bg-pink-100 text-pink-700 border-pink-200",
      "Bebidas": "bg-purple-100 text-purple-700 border-purple-200",
    };
    return colors[category] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 opacity-5 pointer-events-none">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1739417083034-4e9118f487be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcGFzdGElMjBkaXNofGVufDF8fHx8MTc2MTk4MTI1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Italian cuisine"
            className="w-full h-full object-cover rounded-full blur-sm"
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between relative z-10">
          <div>
            <h1 className="text-[#4b2e05]">Cardápio</h1>
            <p className="text-[#8b6f47]">Gerenciar pratos e bebidas do restaurante</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={() => handleOpenDialog()}
                className="bg-gradient-to-r from-[#c7a17a] to-[#b89968] hover:from-[#b89968] hover:to-[#a68a5c] text-white shadow-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Prato
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-[#c7a17a]/20 max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-[#4b2e05]">
                  {editingItem ? "Editar Prato" : "Adicionar Novo Prato"}
                </DialogTitle>
                <DialogDescription className="text-[#8b6f47]">
                  {editingItem ? "Atualize as informações do prato" : "Preencha os detalhes do novo prato"}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[#4b2e05]">Nome do Prato</Label>
                  <Input
                    id="name"
                    placeholder="Ex: Spaghetti alla Carbonara"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border-[#c7a17a]/30 focus:border-[#c7a17a]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-[#4b2e05]">Categoria</Label>
                  <Select value={formData.category} onValueChange={(value : any) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger className="border-[#c7a17a]/30 focus:border-[#c7a17a]">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-[#4b2e05]">Preço</Label>
                  <Input
                    id="price"
                    placeholder="R$ 00,00"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="border-[#c7a17a]/30 focus:border-[#c7a17a]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-[#4b2e05]">Descrição</Label>
                  <Textarea
                    id="description"
                    placeholder="Descrição detalhada do prato..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="border-[#c7a17a]/30 focus:border-[#c7a17a] resize-none"
                    rows={3}
                  />
                </div>
                
                <Button 
                  onClick={handleSave}
                  disabled={!formData.name || !formData.category || !formData.price}
                  className="w-full bg-gradient-to-r from-[#c7a17a] to-[#b89968] hover:from-[#b89968] hover:to-[#a68a5c] text-white"
                >
                  {editingItem ? "Atualizar Prato" : "Adicionar Prato"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {menuItems.map((item) => (
            <Card 
              key={item.id} 
              className="border-[#c7a17a]/20 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-[#4b2e05] mb-2">{item.name}</CardTitle>
                    <Badge className={`${getCategoryColor(item.category)} border text-xs`}>
                      {item.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-[#8b6f47] leading-relaxed">{item.description}</p>
                
                <div className="flex items-center justify-between pt-2 border-t border-[#c7a17a]/10">
                  <p className="text-[#c7a17a]">{item.price}</p>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleOpenDialog(item)}
                      className="border-[#c7a17a]/30 text-[#8b6f47] hover:bg-[#c7a17a]/10 hover:text-[#4b2e05]"
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                      className="border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
