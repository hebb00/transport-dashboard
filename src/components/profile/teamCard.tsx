
import React from "react";
// Chakra imports
import {
    Avatar,
    AvatarGroup,
    Badge,
    Flex,
    Button,
    Icon,
    Image,
    Text,
    DarkMode,
    useColorModeValue,
} from "@chakra-ui/react";
// Assets
import { MdPeople } from "react-icons/md";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";

function Teams() {
    let boxBg = useColorModeValue("white !important", "#111c44 !important");
    let mainText = useColorModeValue("gray.800", "white");
    let iconBox = useColorModeValue("gray.100", "whiteAlpha.200");
    let iconColor = useColorModeValue("brand.200", "white");
    return (
        <Flex
            borderRadius='20px'
            bg={boxBg}
            p='20px'
            h='345px'
            w={{ base: "315px", md: "100%" }}
            alignItems='center'
            direction='column'>
            <Flex w='100%' mb='18px'>
                <Flex
                    w='38px'
                    h='38px'
                    align='center'
                    justify='center'
                    borderRadius='50%'
                    me='12px'
                    bg={iconBox}>
                    <Icon w='24px' h='24px' as={MdPeople} color={iconColor} />
                </Flex>
                <Text
                    my='auto'
                    fontWeight='600'
                    color={mainText}
                    textAlign='center'
                    fontSize='xl'
                    me='auto'>
                    Teams
               </Text>
                <Button
                    w='38px'
                    h='38px'
                    align='center'
                    justify='center'
                    borderRadius='12px'
                    me='12px'
                    bg={iconBox}>
                    <Icon
                        w='24px'
                        h='24px'
                        as={IoEllipsisHorizontalSharp}
                        color={iconColor}
                    />
                </Button>
            </Flex>
            <Image
                src='https://i.ibb.co/KVwmVGW/Teams-Image.png'
                w='70%'
                borderRadius='20px'
                mb='10px'
            />
            <Text
                fontWeight='600'
                color={mainText}
                textAlign='start'
                fontSize='xl'
                w='100%'>
                Simmmple Web
      </Text>
            <Flex mt='auto' justify='space-between' w='100%' align='center'>
                <DarkMode>
                    <Badge
                        borderRadius='9px'
                        size='md'
                        colorScheme='green'
                        color='green.400'
                        textAlign='center'
                        display='flex'
                        justifyContent='center'
                        alignItems='center'>
                        Design
          </Badge>
                </DarkMode>
                <AvatarGroup
                    size='sm'
                    max={4}
                    color={iconColor}
                    fontSize='9px'
                    fontWeight='700'>
                    <Avatar src='https://i.ibb.co/CmxNdhQ/avatar1.png' />
                    <Avatar src='https://i.ibb.co/cFWc59B/avatar2.png' />
                    <Avatar src='https://i.ibb.co/vLQJVFy/avatar3.png' />
                    <Avatar src='https://i.ibb.co/8mcrvQk/avatar4.png' />
                    <Avatar src='https://i.ibb.co/CmxNdhQ/avatar1.png' />
                    <Avatar src='https://i.ibb.co/cFWc59B/avatar2.png' />
                    <Avatar src='https://i.ibb.co/vLQJVFy/avatar3.png' />
                    <Avatar src='https://i.ibb.co/8mcrvQk/avatar4.png' />
                </AvatarGroup>
            </Flex>
        </Flex>
    );
}

export default Teams;