import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useRestaurantData } from "../contexts/RestaurantDataContext";

export function ClientMenu() {
  const { menuItems } = useRestaurantData();
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  // Get unique categories from menu items
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(menuItems.map(item => item.category)));
    return ["Todos", ...uniqueCategories.sort()];
  }, [menuItems]);

  const filteredMenu = selectedCategory === "Todos" 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Antipasti": "bg-green-100 text-green-700 border-green-200",
      "Massas": "bg-amber-100 text-amber-700 border-amber-200",
      "Pizzas": "bg-red-100 text-red-700 border-red-200",
      "Risotos": "bg-yellow-100 text-yellow-700 border-yellow-200",
      "Carnes": "bg-orange-100 text-orange-700 border-orange-200",
      "Sobremesas": "bg-pink-100 text-pink-700 border-pink-200",
      "Bebidas": "bg-purple-100 text-purple-700 border-purple-200",
    };
    return colors[category] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      {/* Header */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 mb-8 sm:mb-12 rounded-2xl overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1625938144755-652e08e359b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwYnJlYWQlMjBvbGl2ZXN8ZW58MXx8fHwxNzYyMDQ0OTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Italian food"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#4b2e05]/95 to-[#4b2e05]/80"></div>
        </div>
        
        <div className="relative text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-[#faf6f0]">Nosso Cardápio</h1>
          <p className="text-[#e6d4c1] text-lg">
            Saboreie a autêntica culinária italiana com pratos preparados com ingredientes frescos e tradicionais
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto">
        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-6 sm:mb-8">
          <TabsList className="w-full justify-start overflow-x-auto bg-white border border-[#c7a17a]/20 p-2 rounded-lg shadow-md flex-wrap h-auto gap-2 scrollbar-hide">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#c7a17a] data-[state=active]:to-[#b89968] data-[state=active]:text-white rounded-lg px-4 sm:px-6 py-2 text-sm sm:text-base whitespace-nowrap"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-6 sm:mt-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredMenu.map((item) => (
                <Card 
                  key={item.id} 
                  className="border-[#c7a17a]/20 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm group"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <CardTitle className="text-[#4b2e05] mb-2 group-hover:text-[#c7a17a] transition-colors">
                          {item.name}
                        </CardTitle>
                        <Badge className={`${getCategoryColor(item.category)} border text-xs`}>
                          {item.category}
                        </Badge>
                      </div>
                      <div className="text-[#c7a17a] shrink-0">
                        {item.price}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[#8b6f47] leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Download Menu CTA */}
        <Card className="mt-12 border-[#c7a17a]/20 shadow-lg bg-gradient-to-r from-[#c7a17a]/10 to-[#b89968]/10">
          <CardContent className="p-8 text-center">
            <h3 className="text-[#4b2e05] mb-2">Quer ver o cardápio completo?</h3>
            <p className="text-[#8b6f47] mb-6">
              Baixe nosso menu em PDF com todas as opções e preços
            </p>
            <button className="bg-gradient-to-r from-[#c7a17a] to-[#b89968] hover:from-[#b89968] hover:to-[#a68a5c] text-white px-6 py-3 rounded-lg shadow-lg transition-all">
              Baixar Cardápio PDF
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
