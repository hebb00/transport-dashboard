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


export default function UserForm() {
    return (
        <Center




        >
            <Box
                bg={useColorModeValue('white', 'gray.800')}
                shadow={'xl'}
                rounded={'md'}
                overflow={'hidden'}
                p='20px'
                h="450px"
                w="350px"

            >
                <Heading m="33">User info</Heading>

                <Text>username: Heba </Text>
                <Text>password: 0000</Text>
                <Text>phone number: 09077654 </Text>
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
