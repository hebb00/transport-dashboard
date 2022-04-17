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


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/drivers" element={<Driver />} />
        <Route path="/vehicle" element={<Vehicle />} />
        <Route path="/jobs" element={<Jobs />} />

      </Routes>
    </Router>

  </React.StrictMode>,
  document.getElementById('root')
)
