import React from 'react'
import { Heading, Box, Center, Text, useColorModeValue, Divider, } from '@chakra-ui/react';
import { useAuth } from '../../routes/login';
import UserForm from '../users/UserForm';


export default function UserInfo() {
    const auth = useAuth()
    const user = auth.user
    return (
        <Center >
            <Box
                bg={useColorModeValue('white', 'gray.800')}
                shadow={'xl'}
                rounded={'md'}
                overflow={'hidden'}
                p='20px'
                h="450px"
                w="350px">
                <Heading m="33">User info</Heading>
                <Text>username: {user?.username} </Text>
                <Text>first name: {user?.firstname} </Text>
                <Text>last name: {user?.lastname} </Text>
                <Text>phone number: {user?.phone_num} </Text>
                <Divider></Divider>
                <UserForm />
            </Box>
        </Center>

    )
}
