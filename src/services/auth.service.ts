// src/services/auth.service.ts
import api from "./api";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role?: "Admin" | "User";
}

export interface User {
  id: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  Role: "Admin" | "User";
}

export interface LoginResponse {
  token: string;
  user: User;
  isAdmin: boolean;
}

class AuthService {
  // src/services/auth.service.ts (trecho)
  async register(payload: RegisterPayload) {
    const mapped = {
      FirstName: payload.firstName,
      LastName: payload.lastName,
      Email: payload.email,
      Phone: payload.phone,
      Password: payload.password,
      Role: payload.role || "User"
    };

    const response = await api.post("/auth/register", mapped);
    return response.data;
  }


  async login(payload: LoginPayload): Promise<LoginResponse> {
    const response = await api.post("/auth/login", payload);
    return response.data;
  }

  logout() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
  }

  saveSession(data: LoginResponse) {
    localStorage.setItem("auth_token", data.token);
    localStorage.setItem("user_data", JSON.stringify(data.user));
  }

  getUser(): User | null {
    const user = localStorage.getItem("user_data");
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("auth_token");
  }
}

export const authService = new AuthService();
