import React, { createContext, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

export const AuthContext = createContext<any>(null!);

export default function Views() {

  let [user, setUser] = useState<any>(null);
  let signin = (newUser: string, callback: VoidFunction) => {
    setUser(newUser);
    callback();
  };
  let signout = (callback: VoidFunction | (() => {})) => {
    setUser(null);
    callback();
  };
  let value = { user, signin, signout };
  console.log("in views", value);

  return (
    <AuthContext.Provider value={value}>
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
              </Route>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Box>
        </Flex>
      </Router>
    </AuthContext.Provider>


  )
}
