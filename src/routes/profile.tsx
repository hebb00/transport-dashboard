import { Box, Flex, HStack, Text, useId } from '@chakra-ui/react'
import React, { useContext } from 'react'
import UserInfo from '../components/profile/UserInfo';


export default function Profile() {
    return (
        <Flex
            direction="column"
            h="100%" w="100%" bg='gray.50'
            textAlign='center' rounded='lg' color='gray.400' align="center" justifyContent="center">
            <UserInfo />
        </Flex>
    );
}
