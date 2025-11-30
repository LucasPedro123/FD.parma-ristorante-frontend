import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Save } from "lucide-react";
import { useRestaurantData } from "../contexts/RestaurantDataContext";
import { toast } from "sonner@2.0.3";

export function Settings() {
  const { contactInfo, updateContactInfo } = useRestaurantData();
  const [formData, setFormData] = useState(contactInfo);

  const handleSave = () => {
    updateContactInfo(formData);
    toast.success("Informações atualizadas com sucesso!");
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-[#4b2e05]">Configurações</h1>
          <p className="text-[#8b6f47]">Gerenciar informações de contato do restaurante</p>
        </div>

        {/* Contact Information Form */}
        <Card className="border-[#c7a17a]/20 shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-[#4b2e05]">Informações de Contato</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-[#4b2e05]">Telefone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="border-[#c7a17a]/30 focus:border-[#c7a17a]"
                placeholder="+55 11 3456-7890"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#4b2e05]">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border-[#c7a17a]/30 focus:border-[#c7a17a]"
                placeholder="contato@parmaristorante.com.br"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-[#4b2e05]">Endereço</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="border-[#c7a17a]/30 focus:border-[#c7a17a]"
                placeholder="Rua Augusta, 1234 - Consolação, São Paulo - SP"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="openingHours" className="text-[#4b2e05]">Horário de Funcionamento</Label>
              <Textarea
                id="openingHours"
                value={formData.openingHours}
                onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                className="border-[#c7a17a]/30 focus:border-[#c7a17a] resize-none"
                rows={3}
                placeholder="Terça a Domingo: 12h - 23h | Segunda: Fechado"
              />
            </div>

            <Button
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-[#c7a17a] to-[#b89968] hover:from-[#b89968] hover:to-[#a68a5c] text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card className="border-[#c7a17a]/20 shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-[#4b2e05]">Prévia - Como Aparecerá no Site</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-white rounded-lg border border-[#c7a17a]/10">
              <p className="text-sm text-[#8b6f47] mb-1">Telefone:</p>
              <p className="text-[#4b2e05]">{formData.phone}</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-[#c7a17a]/10">
              <p className="text-sm text-[#8b6f47] mb-1">E-mail:</p>
              <p className="text-[#4b2e05]">{formData.email}</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-[#c7a17a]/10">
              <p className="text-sm text-[#8b6f47] mb-1">Endereço:</p>
              <p className="text-[#4b2e05]">{formData.address}</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-[#c7a17a]/10">
              <p className="text-sm text-[#8b6f47] mb-1">Horário de Funcionamento:</p>
              <p className="text-[#4b2e05] whitespace-pre-line">{formData.openingHours}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
