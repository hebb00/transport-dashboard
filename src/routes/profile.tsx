import { Box, Flex, HStack } from '@chakra-ui/react'
import React from 'react'
import Teams from '../components/profile/teamCard'
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
            <HStack>

                <Box
                    w="40%"

                >
                    <SocialProfileWithImage />

                </Box>
                <Box
                    shadow={'xl'}
                    h="400px"
                    w="50%"

                >
                    <Teams />
                </Box>

            </HStack>
            <Box
                ml="9"
                w="90%"

            >
                <Switch />
            </Box>

        </Flex>
    )
}
