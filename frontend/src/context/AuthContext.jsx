import {createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "../api/axios.js";

const AuthContext = (createContext({}));

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const getUser = async () => {
        const {data} = await axios.get('/api/user');
        setUser(data);
    }


    const login = async ({...data}) => {
        await csrf();
        setErrors([]);
        await axios.post('/login', data)
            .then(async res => {
                await getUser();
                navigate('/');

            }).catch(err => {
                setErrors(err.response.data.errors)
                navigate('/login')

            })
    }

    const register = async ({...data}) => {
        await csrf();
        setErrors([]);
        await axios.post('/register', data).then(async res => {
            await getUser();
            navigate('/');

        }).catch(err => {
            setErrors(err.response.data.errors)
            navigate('/register')

        })
    }

    const logout = () =>{
        axios.post('/logout').then(() =>{
            setUser(null);
        })
    }
    useEffect(()=>{
        if (!user){
            getUser();
        }
    },[]);

    return <AuthContext.Provider value={{user, errors, getUser, login, register,logout,csrf}}>{children}</AuthContext.Provider>

}
export default function useAuthContext() {
    return useContext(AuthContext);
}
