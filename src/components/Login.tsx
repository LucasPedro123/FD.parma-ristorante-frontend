import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Wine } from "lucide-react";

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#c7a17a] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#8b6f47] rounded-full blur-3xl"></div>
      </div>

      <Card className="w-full max-w-md relative z-10 shadow-2xl border-[#c7a17a]/20 bg-card/95 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-[#c7a17a] to-[#8b6f47] p-4 rounded-2xl shadow-lg">
              <Wine className="w-12 h-12 text-white" />
            </div>
          </div>
          <CardTitle className="text-[#4b2e05]">
            Parma Ristorante
          </CardTitle>
          <CardDescription className="text-[#8b6f47] italic">
            Sistema de Gestão de Restaurante
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="usuario" className="text-[#4b2e05]">
                Usuário
              </Label>
              <Input
                id="usuario"
                type="text"
                placeholder="Digite seu usuário"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="border-[#c7a17a]/30 focus:border-[#c7a17a] focus:ring-[#c7a17a] bg-white"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="senha" className="text-[#4b2e05]">
                Senha
              </Label>
              <Input
                id="senha"
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="border-[#c7a17a]/30 focus:border-[#c7a17a] focus:ring-[#c7a17a] bg-white"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-[#c7a17a] to-[#b89968] hover:from-[#b89968] hover:to-[#a68a5c] text-white shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
