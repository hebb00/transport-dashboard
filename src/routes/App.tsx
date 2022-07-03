import Schedular from "../components/reservations/schedular"
import { Button, ChakraProvider, ColorModeProvider } from "@chakra-ui/react"
import { useState, useEffect } from "react";
//Optionally, you can wrap your application with
// the ColorModeProvider so you can toggle between light and dark mode
function App() {


  const [res, setRes] = useState("");


  useEffect(() => {

    fetch("http://localhost:9000/").then(
      Response => Response.text()
    ).then(
      Response => setRes(Response)

    )
    console.log("res", res)


  }, [])




  return (
    <ChakraProvider>
      <div className="App">
        <Schedular></Schedular>
        {
          (typeof res == "undefined") ? (
            <p>loading..</p>
          ) : (
              // res.users.map((user: any, i: any) => {
              <p >{res}</p>

              // })
            )
        }


      </div>

    </ChakraProvider>

  )
}

export default App
