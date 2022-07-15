import Schedular from "../components/reservations/schedular"
import { useState } from "react";


function App() {
  const [res, setRes] = useState("");

  return (
    <>
      <div className="App">
        <Schedular></Schedular>
      </div>
    </>

  )
}

export default App
