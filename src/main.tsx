import React from 'react'
import ReactDOM from 'react-dom'
import App from './routes/App'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from "./components/navigation/navbar";
import Vehicle from "./routes/vehicle";
import Clients from "./routes/clients";
import Driver from "./routes/driver";
import Login from "./routes/login";
import { Dashboard } from "./routes/dashboard"

import { ChakraProvider, Flex, Box } from '@chakra-ui/react';
import Sidebar from './components/navigation/sidebar'
import { Text, IconButton } from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'
import Profile from './routes/profile';
import Reservation from './routes/reservation';
import Register from './routes/Register';
import * as b from '@syncfusion/ej2-base';
// Registering Syncfusion license key
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('ORg4AjUWIQA/Gnt2VVhiQlFadVlJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRdkJjXn5ecXFRR2JYU0Q=');

// registerLicense('@32302e322e30BVRYOcJJO9E+cuJe3VFpmU6PAfzAXbyX0fFQkIkB7Sg=');
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
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={< Dashboard />} />
              <Route path="/profile" element={< Profile />} />
              <Route path="/reservation" element={<Reservation />} />

            </Routes>




          </Box>


        </Flex>


      </ChakraProvider>

    </Router>

  </React.StrictMode>,
  document.getElementById('root')
)
