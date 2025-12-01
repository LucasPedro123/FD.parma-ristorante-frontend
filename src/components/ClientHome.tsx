import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Clock, MapPin, Phone, Star, Wine, UtensilsCrossed, Calendar } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { HeroSlider } from "./ui/hero-silider/hero-slider";

interface ClientHomeProps {
  onNavigate: (page: string) => void;
  isLoggedIn?: boolean;
}

export function ClientHome({ onNavigate, isLoggedIn }: ClientHomeProps) {
  const features = [
    {
      icon: UtensilsCrossed,
      title: "Cardápio Autêntico",
      description: "Pratos tradicionais italianos preparados com ingredientes frescos e importados",
    },
    {
      icon: Wine,
      title: "Vinhos Selecionados",
      description: "Carta de vinhos com as melhores seleções da Itália e do mundo",
    },
    {
      icon: Calendar,
      title: "Reservas Online",
      description: "Reserve sua mesa com facilidade através da nossa plataforma",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] sm:h-[600px] overflow-hidden">
        <HeroSlider />
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1722587561829-8a53e1935e20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcmVzdGF1cmFudCUyMGludGVyaW9yfGVufDF8fHx8MTc2MTk0NjkwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Restaurant interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#4b2e05]/90 to-[#4b2e05]/60"></div>
        </div>

        <div className="relative h-full flex items-center justify-center">
          <div className="text-center space-y-6 px-6 max-w-3xl">
            <div className="inline-block bg-[#c7a17a]/20 backdrop-blur-sm px-6 py-3 rounded-full border border-[#c7a17a]/30">
              <p className="text-[#c7a17a] italic">Bem-vindo ao</p>
            </div>
            <h1 className="text-[#faf6f0] text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              Parma Ristorante
            </h1>
            <p className="text-[#e6d4c1] text-lg sm:text-xl md:text-2xl italic">
              A autêntica experiência italiana no coração da cidade
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                onClick={() => onNavigate("menu")}
                className="bg-gradient-to-r from-[#c7a17a] to-[#b89968] hover:from-[#b89968] hover:to-[#a68a5c] text-white shadow-lg px-6 sm:px-8 py-4 sm:py-6"
              >
                Ver Cardápio
              </Button>
              <Button
                onClick={() => onNavigate("reservation")}
                variant="outline"
                className="border-2 border-[#c7a17a] text-[#c7a17a] hover:bg-[#c7a17a] hover:text-white px-6 sm:px-8 py-4 sm:py-6 bg-white/10 backdrop-blur-sm"
              >
                Fazer Reserva
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-[#4b2e05] mb-4">Nossa Essência</h2>
            <p className="text-[#8b6f47] max-w-2xl mx-auto">
              Tradição italiana combinada com excelência no atendimento e ingredientes da mais alta qualidade
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-[#c7a17a]/20 shadow-lg hover:shadow-xl transition-all bg-card/80 backdrop-blur-sm">
                  <CardContent className="p-8 text-center space-y-4">
                    <div className="inline-block bg-gradient-to-br from-[#c7a17a] to-[#b89968] p-5 rounded-2xl shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-[#4b2e05]">{feature.title}</h3>
                    <p className="text-[#8b6f47]">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-[#4b2e05]">Nossa História</h2>
              <p className="text-[#8b6f47] leading-relaxed">
                Fundado em 1985, o Parma Ristorante nasceu do sonho de trazer a verdadeira culinária italiana
                para nosso país. Com receitas tradicionais passadas de geração em geração, nossos chefs preparam
                cada prato com dedicação e amor pela gastronomia.
              </p>
              <p className="text-[#8b6f47] leading-relaxed">
                Utilizamos apenas ingredientes frescos e selecionados, muitos importados diretamente da Itália,
                para garantir a autenticidade e qualidade que nossos clientes merecem.
              </p>
              <div className="flex gap-4 pt-4">
                <div className="flex items-center gap-2 text-[#c7a17a]">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <span className="text-[#8b6f47]">Mais de 10.000 clientes satisfeitos</span>
              </div>
            </div>

            <div className="group relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1516750548995-3db798a6f427?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwZm9vZCUyMHRhYmxlfGVufDF8fHx8MTc2MjA0NDk0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Italian food"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-120"
              />
            </div>


          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 sm:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="border-[#c7a17a]/20 shadow-lg bg-card/80 backdrop-blur-sm">
              <CardContent className="p-8 space-y-4">
                <div className="bg-[#c7a17a]/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-[#c7a17a]" />
                </div>
                <h3 className="text-[#4b2e05]">Horário de Funcionamento</h3>
                <div className="space-y-2 text-[#8b6f47]">
                  <p>Segunda a Quinta: 11:30 - 23:00</p>
                  <p>Sexta e Sábado: 11:30 - 00:00</p>
                  <p>Domingo: 12:00 - 22:00</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#c7a17a]/20 shadow-lg bg-card/80 backdrop-blur-sm">
              <CardContent className="p-8 space-y-4">
                <div className="bg-[#c7a17a]/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#c7a17a]" />
                </div>
                <h3 className="text-[#4b2e05]">Localização</h3>
                <div className="space-y-2 text-[#8b6f47]">
                  <p>Rua das Flores, 123</p>
                  <p>Centro - São Paulo, SP</p>
                  <p>CEP: 01234-567</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#c7a17a]/20 shadow-lg bg-card/80 backdrop-blur-sm">
              <CardContent className="p-8 space-y-4">
                <div className="bg-[#c7a17a]/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-[#c7a17a]" />
                </div>
                <h3 className="text-[#4b2e05]">Contato</h3>
                <div className="space-y-2 text-[#8b6f47]">
                  <p>Telefone: (11) 3456-7890</p>
                  <p>WhatsApp: (11) 98765-4321</p>
                  <p>contato@parmaristorante.com.br</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 px-6 bg-gradient-to-r from-[#4b2e05] to-[#5d3a0a] text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-[#faf6f0]">Pronto para uma Experiência Inesquecível?</h2>
          <p className="text-[#e6d4c1] text-base sm:text-lg">
            Reserve sua mesa hoje e descubra por que somos o restaurante italiano mais querido da cidade
          </p>
          <Button
            onClick={() => onNavigate("reservation")}
            className="bg-gradient-to-r from-[#c7a17a] to-[#b89968] hover:from-[#b89968] hover:to-[#a68a5c] text-white shadow-lg px-6 sm:px-8 py-4 sm:py-6"
          >
            Fazer Reserva Agora
          </Button>
        </div>
      </section>
    </div>
  );
}
