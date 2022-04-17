import Schedular from "../components/schedular"
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react"
//Optionally, you can wrap your application with
// the ColorModeProvider so you can toggle between light and dark mode
function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Schedular></Schedular>
      </div>

    </ChakraProvider>

  )
}

export default App
