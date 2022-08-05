import React from 'react'
import { Heading, Box, Center, Text, useColorModeValue, Divider, HStack, } from '@chakra-ui/react';
import { useAuth } from '../../routes/login';
import UserForm from '../users/UserForm';


export default function UserInfo() {
    const auth = useAuth()
    const user = auth.user
    return (
        <HStack
            bg={useColorModeValue('white', 'gray.800')}
            shadow={'xl'}
            rounded={'md'}
            overflow={'hidden'}
            h="600px"
            p='8px'
            w="900px"
            display="flex"
            align="center"
            justifyContent="center" >
            <Box w="300px" >
                <Heading m="3">account info</Heading>
                <Text mb="3" >username: {user?.username} </Text>
                <Text mb="3">first name: {user?.firstname} </Text>
                <Text mb="3">last name: {user?.lastname} </Text>
                <Text mb="3">phone number: {user?.phone_num} </Text>
            </Box>
            <Box w="500px">
                <UserForm />

            </Box>
            {/* <Divider></Divider> */}


        </HStack>



    )
}
