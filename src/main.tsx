import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {
  BrowserRouter as Router,
  Route,
  Link

} from "react-router-dom";
import Expenses from "./routes/vehicle";
import Navbar from "./styles/navbar";

ReactDOM.render(
  <React.StrictMode>
    <App />

  </React.StrictMode>,
  document.getElementById('root')
)
