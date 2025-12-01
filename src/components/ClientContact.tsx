import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useRestaurantData } from "../contexts/RestaurantDataContext";

export function ClientContact() {
  const { contactInfo } = useRestaurantData();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
  };

  return (
    <div className="min-h-screen">
      <section className="relative py-20 px-6 mb-12 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1695043478092-c59a4df9cae2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwZ3JhcGVzJTIwdmluZXlhcmR8ZW58MXx8fHwxNzYyMDQ0OTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Wine and grapes"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#4b2e05]/95 to-[#4b2e05]/80"></div>
        </div>
        
        <div className="relative text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-[#faf6f0]">Entre em Contato</h1>
          <p className="text-[#e6d4c1] text-lg">
            Estamos aqui para ajudar. Entre em contato conosco para reservas, eventos ou dúvidas
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Form */}
          <Card className="border-[#c7a17a]/20 shadow-lg bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-[#4b2e05]">Envie uma Mensagem</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="contact-name" className="text-[#4b2e05]">Nome</Label>
                  <Input
                    id="contact-name"
                    placeholder="Seu nome completo"
                    className="border-[#c7a17a]/30 focus:border-[#c7a17a]"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-email" className="text-[#4b2e05]">E-mail</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="seu@email.com"
                      className="border-[#c7a17a]/30 focus:border-[#c7a17a]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-phone" className="text-[#4b2e05]">Telefone</Label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      className="border-[#c7a17a]/30 focus:border-[#c7a17a]"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-subject" className="text-[#4b2e05]">Assunto</Label>
                  <Input
                    id="contact-subject"
                    placeholder="Como podemos ajudar?"
                    className="border-[#c7a17a]/30 focus:border-[#c7a17a]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-message" className="text-[#4b2e05]">Mensagem</Label>
                  <Textarea
                    id="contact-message"
                    placeholder="Escreva sua mensagem aqui..."
                    className="border-[#c7a17a]/30 focus:border-[#c7a17a] resize-none"
                    rows={6}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#c7a17a] to-[#b89968] hover:from-[#b89968] hover:to-[#a68a5c] text-white"
                >
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-[#c7a17a]/20 shadow-lg bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#c7a17a]/10 p-3 rounded-lg shrink-0">
                    <MapPin className="w-6 h-6 text-[#c7a17a]" />
                  </div>
                  <div>
                    <h4 className="text-[#4b2e05] mb-1">Endereço</h4>
                    <p className="text-[#8b6f47]">
                      {contactInfo.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#c7a17a]/10 p-3 rounded-lg shrink-0">
                    <Phone className="w-6 h-6 text-[#c7a17a]" />
                  </div>
                  <div>
                    <h4 className="text-[#4b2e05] mb-1">Telefone</h4>
                    <p className="text-[#8b6f47]">
                      {contactInfo.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#c7a17a]/10 p-3 rounded-lg shrink-0">
                    <Mail className="w-6 h-6 text-[#c7a17a]" />
                  </div>
                  <div>
                    <h4 className="text-[#4b2e05] mb-1">E-mail</h4>
                    <p className="text-[#8b6f47]">
                      {contactInfo.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#c7a17a]/10 p-3 rounded-lg shrink-0">
                    <Clock className="w-6 h-6 text-[#c7a17a]" />
                  </div>
                  <div>
                    <h4 className="text-[#4b2e05] mb-1">Horário de Funcionamento</h4>
                    <p className="text-[#8b6f47]">
                      {contactInfo.openingHours}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#c7a17a]/20 shadow-lg bg-gradient-to-br from-[#c7a17a] to-[#b89968]">
              <CardContent className="p-6 text-center space-y-4">
                <h4 className="text-white">Siga-nos nas Redes Sociais</h4>
                <div className="flex justify-center gap-4">
                  <button className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-all backdrop-blur-sm">
                    <Instagram className="w-6 h-6 text-white" />
                  </button>
                  <button className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-all backdrop-blur-sm">
                    <Facebook className="w-6 h-6 text-white" />
                  </button>
                </div>
                <p className="text-white/90 text-sm">
                  @parmaristorante
                </p>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card className="border-[#c7a17a]/20 shadow-lg overflow-hidden">
              <div className="h-64 bg-[#e6d4c1] flex items-center justify-center">
                <div className="text-center space-y-2">
                  <MapPin className="w-12 h-12 text-[#c7a17a] mx-auto" />
                  <p className="text-[#8b6f47]">Mapa do Local</p>
                  <p className="text-sm text-[#8b6f47]">{contactInfo.address}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
