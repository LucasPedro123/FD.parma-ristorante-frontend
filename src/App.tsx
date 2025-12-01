
import { Router } from "./routes/index.route.tsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "./contexts/AuthContext.tsx";

export default function App() {
  return (
    <>
      <AuthProvider>
        <Router />
        <ToastContainer />
      </AuthProvider>
    </>
  )
}
