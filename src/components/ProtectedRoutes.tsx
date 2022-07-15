import React, { useContext } from "react"
import Login, { useAuth } from "../routes/login"
import { Outlet } from "react-router"



export default function ProtectedRoutes() {
    const auth = useAuth()
    return auth.user ? <Outlet /> : <Login />
}
