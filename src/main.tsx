import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './routes/App'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from "./components/navbar";
import Vehicle from "./routes/vehicle";
import Jobs from "./routes/jobs";
import Driver from "./routes/driver";
import Login from "./routes/login";
import { ChakraProvider } from '@chakra-ui/react';



ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ChakraProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/drivers" element={<Driver />} />
          <Route path="/vehicle" element={<Vehicle />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </ChakraProvider>

    </Router>

  </React.StrictMode>,
  document.getElementById('root')
)
