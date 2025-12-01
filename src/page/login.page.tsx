import { Login } from "../components//Login";
import SystemApp from "./system.page";

export const LoginPage: React.FC<{ onLogin: boolean }> = ({ onLogin }) => {
    return (
        <>
            {onLogin ? <SystemApp isLoggedInProp={onLogin} /> : <Login onLogin={()=> onLogin}/>}
        </>
    );
}