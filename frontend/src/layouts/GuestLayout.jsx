import useAuthContext from "../context/AuthContext.jsx";
import {Navigate, Outlet} from "react-router-dom";
const GuestLayout = () => {
        const {user} = new useAuthContext();

        return !user ? <Outlet/> : <Navigate to="/"/>

};

export default GuestLayout;