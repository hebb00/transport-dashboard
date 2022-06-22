import React from 'react'
import ReactDOM from 'react-dom'
import App from './routes/App'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from "./components/navbar";
import Vehicle from "./routes/vehicle";
import Clients from "./routes/clients";
import Driver from "./routes/driver";
import Login from "./routes/login";
import { Dashboard } from "./routes/dashboard"

import { ChakraProvider, Flex, Box } from '@chakra-ui/react';
import Sidebar from './components/sidebar'
import { Text, IconButton } from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'

ReactDOM.render(
  <React.StrictMode>


    <Router>
      <ChakraProvider>
        <Flex w="100%"
          flexDirection="row"
        >
          <Box
          >
            <Sidebar />

          </Box>
          <Box
            flex={1}
          >

            <Navbar />



            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/drivers" element={<Driver />} />
              <Route path="/vehicle" element={<Vehicle />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={< Dashboard />} />

            </Routes>




          </Box>


        </Flex>


      </ChakraProvider>

    </Router>

  </React.StrictMode>,
  document.getElementById('root')
)
