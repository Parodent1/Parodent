import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    

    const checkAuth = async() => {
        const token = localStorage.getItem('token')
        if(!token) {
            setUser(null)
            setLoading(false)
            return
        }

        try {
            const res = await axios.get('http://localhost:3000/api/doctor/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setUser(res.data)
        } catch (error) {
            localStorage.removeItem('token') // clear invalid token
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        checkAuth();
    }, [])

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
    }
    return (
        <AuthContext.Provider value={{ user , loading , isAuthenticated: !!user, logout, setUser, checkAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);