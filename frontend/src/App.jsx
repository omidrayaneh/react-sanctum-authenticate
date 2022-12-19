import { Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import GuestLayout from "./layouts/GuestLayout.jsx";

function App() {
    return (
        <div className="bg-slate-100 min-h-screen">
                <Routes>
                    <Route element={<AuthLayout/>}>
                        <Route path="/" element={<Home/>}/>
                    </Route>
                    <Route element={<GuestLayout/>}>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/forgot-password" element={<ForgotPassword/>}/>
                        <Route path="/password-reset/:token" element={<ResetPassword/>}/>
                    </Route>
                </Routes>
        </div>
    );
}

export default App
