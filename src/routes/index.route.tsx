// src/routes/router.tsx
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../page/login.page";
import SystemApp from "../page/system.page";
// import { PrivateRoute } from "./PrivateRoute";
import { AdminRoute } from "./AdminRoute";

export const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLogin={ false } />} />

      <Route
        path="/"
        element={
            <SystemApp />
        }
      />

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <SystemApp />
          </AdminRoute>
        }
      />
    </Routes>
  );
};
