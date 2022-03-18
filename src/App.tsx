// import './App.css'
import Schedular from "./schedular"


import Navbar from "./styles/navbar";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,

} from "react-router-dom";
import Vehicle from "./routes/vehicle";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <Route path="routes/vehicle" element={<Vehicle />}>
        </Route>

      </Router>
      <Schedular />
    </div>
  )
}

export default App
