import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Badge } from "./ui/badge";
import { Calendar as CalendarIcon, Clock, Users, CheckCircle2, Armchair } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "./ui/utils";
import { useTables } from "../contexts/TablesContext";

export function ClientReservation() {
  const { reserveTable, getAvailableTables } = useTables();
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date>();
  const [selectedTableId, setSelectedTableId] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "",
    time: "",
    specialRequests: "",
  });

  const timeSlots = [
    "11:30", "12:00", "12:30", "13:00", "13:30", "14:00",
    "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"
  ];

  const availableTables = date && formData.time && formData.guests
    ? getAvailableTables(
        format(date, "dd/MM/yyyy"),
        formData.time,
        parseInt(formData.guests)
      )
    : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date && selectedTableId) {
      reserveTable(
        selectedTableId,
        formData.name,
        format(date, "dd/MM/yyyy"),
        formData.time,
        parseInt(formData.guests)
      );
      setStep(3);
    }
  };

  if (step === 3) {
    const reservedTable = availableTables.find(t => t.id === selectedTableId);
    return (
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
        <Card className="max-w-lg w-full border-[#c7a17a]/20 shadow-2xl bg-card/95 backdrop-blur-sm">
          <CardContent className="p-12 text-center space-y-6">
            <div className="inline-block bg-gradient-to-br from-green-400 to-green-600 p-5 rounded-full">
              <CheckCircle2 className="w-16 h-16 text-white" />
            </div>
            <h2 className="text-[#4b2e05]">Reserva Confirmada!</h2>
            <p className="text-[#8b6f47]">
              Sua reserva foi realizada com sucesso. Enviamos uma confirmação para o e-mail {formData.email}.
            </p>
            <div className="bg-[#c7a17a]/10 p-6 rounded-lg space-y-2 text-left">
              <p className="text-[#4b2e05]"><strong>Nome:</strong> {formData.name}</p>
              <p className="text-[#4b2e05]"><strong>Data:</strong> {date ? format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : ""}</p>
              <p className="text-[#4b2e05]"><strong>Horário:</strong> {formData.time}</p>
              <p className="text-[#4b2e05]"><strong>Pessoas:</strong> {formData.guests}</p>
              {reservedTable && (
                <p className="text-[#4b2e05]"><strong>Mesa:</strong> {reservedTable.number}</p>
              )}
            </div>
            <Button
              onClick={() => {
                setStep(1);
                setDate(undefined);
                setSelectedTableId("");
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  guests: "",
                  time: "",
                  specialRequests: "",
                });
              }}
              className="bg-gradient-to-r from-[#c7a17a] to-[#b89968] hover:from-[#b89968] hover:to-[#a68a5c] text-white w-full"
            >
              Fazer Nova Reserva
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-[#4b2e05]">Reserva de Mesa</h1>
          <p className="text-[#8b6f47] max-w-2xl mx-auto">
            Reserve sua mesa e garanta uma experiência gastronômica inesquecível no Parma Ristorante
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 sm:gap-4">
          <div className={`flex items-center gap-1 sm:gap-2 ${step >= 1 ? "text-[#c7a17a]" : "text-[#8b6f47]"}`}>
            <div className={`w-8 sm:w-10 h-8 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base ${step >= 1 ? "bg-[#c7a17a] text-white" : "bg-[#e6d4c1]"}`}>
              1
            </div>
            <span className="hidden sm:inline text-sm sm:text-base">Data & Hora</span>
          </div>
          <div className="w-8 sm:w-16 h-1 bg-[#e6d4c1]"></div>
          <div className={`flex items-center gap-1 sm:gap-2 ${step >= 2 ? "text-[#c7a17a]" : "text-[#8b6f47]"}`}>
            <div className={`w-8 sm:w-10 h-8 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base ${step >= 2 ? "bg-[#c7a17a] text-white" : "bg-[#e6d4c1]"}`}>
              2
            </div>
            <span className="hidden sm:inline text-sm sm:text-base">Seus Dados</span>
          </div>
        </div>

        {/* Step 1: Date & Time Selection */}
        {step === 1 && (
          <Card className="border-[#c7a17a]/20 shadow-lg bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-[#4b2e05]">Escolha Data e Horário</CardTitle>
              <CardDescription className="text-[#8b6f47]">
                Selecione quando você gostaria de jantar conosco
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[#4b2e05]">Data da Reserva</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left border-[#c7a17a]/30",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : "Selecione uma data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-card border-[#c7a17a]/20">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guests" className="text-[#4b2e05]">Número de Pessoas</Label>
                  <Select value={formData.guests} onValueChange={(value) => setFormData({ ...formData, guests: value })}>
                    <SelectTrigger className="border-[#c7a17a]/30">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <SelectItem key={num} value={String(num)}>
                          {num} {num === 1 ? "pessoa" : "pessoas"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[#4b2e05]">Horário</Label>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setFormData({ ...formData, time })}
                      className={`p-2 sm:p-3 rounded-lg border transition-all text-sm sm:text-base ${
                        formData.time === time
                          ? "bg-gradient-to-r from-[#c7a17a] to-[#b89968] text-white border-[#c7a17a]"
                          : "border-[#c7a17a]/30 text-[#8b6f47] hover:border-[#c7a17a] hover:bg-[#c7a17a]/5"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Available Tables Selection */}
              {date && formData.time && formData.guests && (
                <div className="space-y-3 pt-4 border-t border-[#c7a17a]/20">
                  <div className="flex items-center justify-between">
                    <Label className="text-[#4b2e05]">Mesas Disponíveis</Label>
                    <Badge className="bg-[#c7a17a]/10 text-[#c7a17a] border-[#c7a17a]/30">
                      {availableTables.length} disponíveis
                    </Badge>
                  </div>
                  
                  {availableTables.length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                      {availableTables.map((table) => (
                        <button
                          key={table.id}
                          type="button"
                          onClick={() => setSelectedTableId(table.id)}
                          className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                            selectedTableId === table.id
                              ? "bg-gradient-to-br from-[#c7a17a] to-[#b89968] text-white border-[#c7a17a]"
                              : "border-[#c7a17a]/30 text-[#8b6f47] hover:border-[#c7a17a] hover:bg-[#c7a17a]/5"
                          }`}
                        >
                          <Armchair className="w-5 h-5" />
                          <span className="text-sm">Mesa {table.number}</span>
                          <span className="text-xs opacity-80">{table.capacity} lugares</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-[#8b6f47] bg-[#c7a17a]/5 rounded-lg">
                      <p>Não há mesas disponíveis para esta data, horário e número de pessoas.</p>
                      <p className="text-sm mt-2">Por favor, tente outro horário.</p>
                    </div>
                  )}
                </div>
              )}

              <Button
                onClick={() => setStep(2)}
                disabled={!date || !formData.guests || !formData.time || !selectedTableId}
                className="w-full bg-gradient-to-r from-[#c7a17a] to-[#b89968] hover:from-[#b89968] hover:to-[#a68a5c] text-white"
              >
                Continuar
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Personal Information */}
        {step === 2 && (
          <Card className="border-[#c7a17a]/20 shadow-lg bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-[#4b2e05]">Seus Dados</CardTitle>
              <CardDescription className="text-[#8b6f47]">
                Precisamos de algumas informações para confirmar sua reserva
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[#4b2e05]">Nome Completo</Label>
                  <Input
                    id="name"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border-[#c7a17a]/30 focus:border-[#c7a17a]"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#4b2e05]">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="border-[#c7a17a]/30 focus:border-[#c7a17a]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-[#4b2e05]">Telefone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="border-[#c7a17a]/30 focus:border-[#c7a17a]"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialRequests" className="text-[#4b2e05]">Pedidos Especiais (Opcional)</Label>
                  <Textarea
                    id="specialRequests"
                    placeholder="Alguma preferência de mesa, restrição alimentar ou celebração especial?"
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    className="border-[#c7a17a]/30 focus:border-[#c7a17a] resize-none"
                    rows={4}
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    onClick={() => setStep(1)}
                    variant="outline"
                    className="flex-1 border-[#c7a17a]/30"
                  >
                    Voltar
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-[#c7a17a] to-[#b89968] hover:from-[#b89968] hover:to-[#a68a5c] text-white"
                  >
                    Confirmar Reserva
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Info Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
          <Card className="border-[#c7a17a]/20 bg-card/60">
            <CardContent className="p-6 text-center space-y-3">
              <CalendarIcon className="w-10 h-10 text-[#c7a17a] mx-auto" />
              <h4 className="text-[#4b2e05]">Reserva Fácil</h4>
              <p className="text-sm text-[#8b6f47]">
                Reserve sua mesa em poucos minutos
              </p>
            </CardContent>
          </Card>

          <Card className="border-[#c7a17a]/20 bg-card/60">
            <CardContent className="p-6 text-center space-y-3">
              <Clock className="w-10 h-10 text-[#c7a17a] mx-auto" />
              <h4 className="text-[#4b2e05]">Confirmação Imediata</h4>
              <p className="text-sm text-[#8b6f47]">
                Receba confirmação por e-mail na hora
              </p>
            </CardContent>
          </Card>

          <Card className="border-[#c7a17a]/20 bg-card/60">
            <CardContent className="p-6 text-center space-y-3">
              <Users className="w-10 h-10 text-[#c7a17a] mx-auto" />
              <h4 className="text-[#4b2e05]">Atendimento Especial</h4>
              <p className="text-sm text-[#8b6f47]">
                Sua mesa estará pronta quando chegar
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
