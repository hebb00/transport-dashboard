import { Box, Flex, HStack } from '@chakra-ui/react'
import React from 'react'
import Teams from '../components/profile/teamCard'
import UserForm from '../components/profile/UserInfo'
import SocialProfileWithImage from '../components/profile/userProfile'
import Switch from '../components/switch'
export default function Profile() {
    return (
        <Flex

            direction="column"
            h="100%"
            w="100%"
            bg='gray.50'
            textAlign='center'
            rounded='lg'
            color='gray.400'
        >
            <HStack
                align="center"

            >

                <Box
                    w="40%"

                >
                    <SocialProfileWithImage />

                </Box>



                <Switch />
            </HStack>
            <HStack
                align="center"

            >

                <Box
                    ml="14"
                    w="65%"
                >
                    <Teams />
                </Box>
                <Box
                    ml="14"
                    h="400px"
                    w="400px"



                >
                    <UserForm />
                </Box>

            </HStack>




        </Flex>
    )
}
