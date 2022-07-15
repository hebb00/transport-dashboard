import { Box, Flex, HStack, Text, useId } from '@chakra-ui/react'
import { ContextMenu } from '@syncfusion/ej2-react-grids';
import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom';
import Teams from '../components/profile/teamCard'
import UserInfo from '../components/profile/UserInfo';
import UserForm from '../components/profile/UserInfo'
import SocialProfileWithImage from '../components/profile/userProfile'
import Switch from '../components/switchBtn'

export default function Profile() {
    return (
        <Flex
            direction="column"
            h="100%" w="100%" bg='gray.50'
            textAlign='center' rounded='lg' color='gray.400'>
            <HStack align="center" >
                <Box w="40%" >  <SocialProfileWithImage /></Box>
                <Switch />
            </HStack>
            <HStack align="center" >
                <Box ml="14" w="65%" > <Teams /></Box>
                <Box ml="14" h="400px" w="400px" > <UserInfo /> </Box>
            </HStack>
        </Flex>



    )
}
