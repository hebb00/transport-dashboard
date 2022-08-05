import React, { createContext, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { Flex, Box } from '@chakra-ui/react';

import App from './routes/App'
import Navbar from "./components/navigation/navbar";
import Vehicle from "./routes/vehicle";
import Clients from "./routes/clients";
import Driver from "./routes/driver";
import Login from "./routes/login";
import Profile from './routes/profile';
import Reservation from './routes/reservation';
import Register from './routes/Register';
import { Dashboard } from "./routes/dashboard"
import ProtectedRoutes from "./components/ProtectedRoutes"
import Sidebar from './components/navigation/sidebar'
import { CookiesProvider } from 'react-cookie';
import { useCookies } from 'react-cookie';
import Users from './routes/users';

export const AuthContext = createContext<any>(null!);

export default function Views() {

  const [cookies, setCookie, removeCookie] = useCookies();
  let [user, setUser] = useState<any>(cookies?.user);
  let signin = (newUser: string, callback: VoidFunction) => {
    setUser(newUser);
    callback();
  };
  let signout = (callback: VoidFunction | (() => {})) => {
    removeCookie('user');
    setUser(null);
    callback();
  };

  let value = { user, signin, signout };
  return (
    <AuthContext.Provider value={value}>
      <CookiesProvider >
        <Router>
          <Flex w="100%" flexDirection="row" >
            {value.user ?
              <Box >
                <Sidebar />
              </Box> : ""
            }
            <Box flex={1}>
              <Navbar />
              <Routes>
                <Route element={<ProtectedRoutes />}>
                  <Route path="/" element={<App />} />
                  <Route path="/reservation" element={<Reservation />} />
                  <Route path="/drivers" element={<Driver />} />
                  <Route path="/vehicle" element={<Vehicle />} />
                  <Route path="/clients" element={<Clients />} />
                  <Route path="/dashboard" element={< Dashboard />} />
                  <Route path="/profile" element={< Profile />} />
                  {value.user?.role == "admin" ?
                    <>
                      <Route path="/register" element={<Register />} />
                      <Route path="/users" element={<Users />} />
                    </>
                    : ""}
                </Route>
                <Route path="/login" element={<Login />} />
              </Routes>
            </Box>
          </Flex>
        </Router>
      </CookiesProvider>
    </AuthContext.Provider>


  )
}
