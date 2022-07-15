import React from 'react'
import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    useColorModeValue,
    Input,
    FormControl,
    FormLabel,
    Divider,
} from '@chakra-ui/react';
import { useAuth } from '../../routes/login';


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
                <Text>last name: {user?.firstname} </Text>
                <Text>phone number: {user?.phone_num} </Text>
                <Divider></Divider>
                <Button
                    w={'full'}
                    mt={8}
                    bg={'teal'}
                    color={'white'}
                    rounded={'md'}
                    _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg',
                    }}>
                    Edit
            </Button>
            </Box>
        </Center>

    )
}
