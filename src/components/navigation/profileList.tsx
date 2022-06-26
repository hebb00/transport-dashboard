import {
    IconButton, Avatar, Box, Flex, HStack, VStack, Text, Menu, MenuButton, MenuDivider,
    MenuItem, MenuList,
} from "@chakra-ui/react";
import { FiChevronDown, FiBell } from "react-icons/fi";
import {

    Link as RouteLink
} from "react-router-dom";
export default function UserProfile() {
    return (
        <HStack spacing={{ base: "0", md: "6" }} h="50px">
            <IconButton
                size="lg"
                variant="ghost"
                aria-label="open menu"
                icon={<FiBell />}
            />
            <Flex alignItems="center">
                <Menu>
                    <MenuButton
                        py={2}
                        transition="all 0.3s"
                        _focus={{ boxShadow: "none" }}
                    >
                        <HStack spacing="4">
                            <Avatar
                                size="md"
                                src={
                                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                                }
                            />
                            <VStack
                                display={{ base: "none", md: "flex" }}
                                alignItems="flex-start"
                                spacing="1px"
                                ml="2"
                            >
                                <Text fontSize="sm" color="gray.600">
                                    Admin
                                  </Text>
                                {/* <Text fontSize="sm">Ademola Jones</Text> */}

                            </VStack>
                            <Box display={{ base: "none", md: "flex" }}>
                                <FiChevronDown />
                            </Box>
                        </HStack>
                    </MenuButton>
                    <MenuList fontSize="lg" bg="white" borderColor="gray.200">
                        <RouteLink to="/profile"><MenuItem> Profile</MenuItem></RouteLink>
                        <MenuItem>Settings</MenuItem>
                        <MenuItem>Billing</MenuItem>
                        <MenuDivider />
                        <MenuItem>Sign out</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </HStack>
    );
}