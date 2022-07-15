import React from 'react'
import ReactDOM from 'react-dom'
import Views from "./Views"
import { ChakraProvider, Flex, Box } from '@chakra-ui/react';

// Registering Syncfusion license key
import { registerLicense } from '@syncfusion/ej2-base';
registerLicense('ORg4AjUWIQA/Gnt2VVhiQlFadVlJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRdkJjXn5ecXFRR2JYU0Q=');

// registerLicense('@32302e322e30BVRYOcJJO9E+cuJe3VFpmU6PAfzAXbyX0fFQkIkB7Sg=');
ReactDOM.render(

  <React.StrictMode>
    <ChakraProvider>
      <Views />
    </ChakraProvider>

  </React.StrictMode>,
  document.getElementById('root')
)
