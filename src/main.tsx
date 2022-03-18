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

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/vehicle" element={<Vehicle />} />
      </Routes>
    </Router>

  </React.StrictMode>,
  document.getElementById('root')
)
