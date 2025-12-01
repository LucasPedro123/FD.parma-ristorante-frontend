import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { UserPlus, Wine } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const [regName, setRegName] = useState("");
  const [regLastName, setRegLastName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(email, senha);

      const user = JSON.parse(localStorage.getItem("user_data")!);

      if (user.role === "Admin") {
        navigate("/");
      } else {
        navigate("/");
      }

    } catch (err: any) {
      toast.error(err.response?.data || "Erro ao efetuar login.");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await register({
        firstName: regName,
        lastName: regLastName,
        email: regEmail,
        phone: regPhone,
        password: regPassword,
        role: "User"
      });
      toast.success("Cadastro realizado com sucesso! Você já pode fazer login.");
      setRegName("");
      setRegLastName("");
      setRegEmail("");
      setRegPassword("");
    } catch (err: any) {
      toast.error(err.response?.data || "Erro ao cadastrar usuário.");
    }
  };

  return (
    <div className="max-h-screen">
      <div className="min-h-screen flex flex-column items-center justify-center p-6 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-64 h-64 bg-[#c7a17a] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#8b6f47] rounded-full blur-3xl"></div>
        </div>


        {showRegister ? (
          <Card
            id="cadastro"
            className="w-full max-w-md relative z-10 shadow-xl scroll-mt-20"
          >
            <CardHeader className="text-center space-y-2 pb-4">
              <div className="flex justify-center">
                <UserPlus className="w-10 h-10" />
              </div>
              <CardTitle>Cadastrar novo usuário</CardTitle>
              <CardDescription>Crie sua conta para fazer reservas</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="nome">Nome</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="nome">Sobrenome</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Seu nome"
                    value={regLastName}
                    onChange={(e) => setRegLastName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="regEmail">E-mail</Label>
                  <Input
                    id="regEmail"
                    type="email"
                    placeholder="seu@email.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="regSenha">Telefone</Label>
                  <Input
                    id="regTel"
                    type="tel"
                    placeholder="Insira seu telefone"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="regSenha">Senha</Label>
                  <Input
                    id="regSenha"
                    type="password"
                    placeholder="••••••"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full mt-2 flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  Criar conta
                </Button>
              </form>
            </CardContent>
            <div className="flex-column gap-12 mt-4">
              <p
                onClick={() => setShowRegister(false)}
                className="cursor-pointer bottom-4 text-center w-full text-sm text-[#8b6f47] hover:underline"
              >
                Já tem uma conta? Faça login
              </p>

              <div className="bottom-4 py-8 text-center w-full text-sm text-[#8b6f47]">
                © {new Date().getFullYear()} Parma Ristorante. Todos os direitos reservados.
              </div>
            </div>
          </Card>
        ) : <Card className="w-full max-w-md relative z-10 shadow-2xl border-[#c7a17a]/20 bg-card/95 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4 pb-8">
            <Link to={'/'}>
              <div className="flex justify-center">
                <div className="bg-gradient-to-br from-[#c7a17a] to-[#8b6f47] p-4 rounded-2xl shadow-lg">
                  <Wine className="w-12 h-12 text-white" />
                </div>
              </div>
            </Link>
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
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
          <div className="flex-column gap-12 mt-4">
            <p
              onClick={() => setShowRegister(true)}
              className="cursor-pointer bottom-4 text-center w-full text-sm text-[#8b6f47] hover:underline"
            >
              Não tem uma conta? Cadastre-se
            </p>

            <div className="bottom-4 py-8 text-center w-full text-sm text-[#8b6f47]">
              © {new Date().getFullYear()} Parma Ristorante. Todos os direitos reservados.
            </div>
          </div>
        </Card>}
      </div>
    </div>
  );
}
