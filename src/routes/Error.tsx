import React from 'react'
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'


export default function Error() {
    return (
        <Alert status='error'>
            <AlertIcon />
            <AlertTitle>Unauthorized </AlertTitle>
            <AlertDescription>this is an admin only area and you are not allowed here</AlertDescription>
        </Alert>


    )
}




