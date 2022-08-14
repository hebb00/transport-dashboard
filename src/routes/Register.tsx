import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { FormUserInputs } from "../types/react-table-config"
import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Box,
    Link,
    Avatar,
    FormControl,
    IconButton,
    InputRightElement,
    Select
} from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react';
import { FaUserAlt, FaLock, FaPhone, Fa500Px } from "react-icons/fa";
import { fetchData, getData } from "../components/users/user-service"
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react"
import { useAuth } from "./login";
//Optionally, you can wrap your application with
// the ColorModeProvider so you can toggle between light and dark mode

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaphone = chakra(FaPhone);
const CFa500 = chakra(Fa500Px);

export default function Register({ getUser }: any) {
    const [showPassword, setShowPassword] = useState(false);
    const nav = useNavigate()
    const auth = useAuth()
    const handleShowClick = () => setShowPassword(!showPassword);
    const { handleSubmit: createHandleSubmit, register } = useForm<FormUserInputs>(
        {
            defaultValues: {
                firstName: "",
                lastName: "",
                userName: "",
                password: "",
                phoneNumber: "",
                role: "",
            }
        }
    )
    const handleSubmit = createHandleSubmit(values => {
        const user: FormUserInputs = {
            firstName: values.firstName,
            lastName: values.lastName,
            userName: values.userName,
            password: values.password,
            phoneNumber: values.phoneNumber,
            role: values.role,
        };
        fetchData(user, "register").then(async res => {

            if (res.status == 200) {
                const result = await res.json();
                getUser();
                console.log("result is ", result)
                onClose();
                // auth.signin(user, () => {
                //     console.log(user);
                // nav(`/profile?id=${user.id}`);
                // });

            } else {
                nav(`/login?valid=false`, { state: "incorrect username or password" })
            }
        })
    })
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button m="1" onClick={() => { onOpen() }} color={"white"} variant="solid"
                colorScheme="teal">Add User</Button >
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>add new user</ModalHeader>
                    <ModalCloseButton />

                    <Box minW={{ base: "90%", md: "468px" }}>
                        <form method="POST" action="/users/register">
                            <ModalBody>
                                <Stack
                                    spacing={4}
                                    p="1rem"
                                    backgroundColor="whiteAlpha.900"
                                    boxShadow="md" >
                                    <FormControl>
                                        <InputGroup m="2">
                                            <InputLeftElement
                                                pointerEvents="none"
                                                children={<CFaUserAlt color="gray.300" />} />
                                            <Input type="text" placeholder="first name"  {...register('firstName')} />
                                        </InputGroup>
                                        <InputGroup m="2">
                                            <InputLeftElement
                                                pointerEvents="none"
                                                children={<CFaUserAlt color="gray.300" />} />
                                            <Input type="text" placeholder="last name"   {...register('lastName')} />
                                        </InputGroup>

                                        <InputGroup m="2">
                                            <InputLeftElement
                                                pointerEvents="none"
                                                children={<CFa500 color="gray.300" />} />
                                            <Input type="text" placeholder="user name"   {...register('userName')} />
                                        </InputGroup>
                                        <InputGroup m="2">
                                            <InputLeftElement
                                                pointerEvents="none"
                                                children={<CFaphone color="gray.300" />}
                                            />
                                            <Input type="number" placeholder="phone number"   {...register('phoneNumber')} />
                                        </InputGroup>
                                        <InputGroup m="2">
                                            <InputLeftElement
                                                pointerEvents="none"
                                                color="gray.300"
                                                children={<CFaLock color="gray.300" />} />
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Password"
                                                {...register('password')} />
                                            <InputRightElement width="4.5rem">
                                                <Button h="1.75rem" size="sm" onClick={() => { handleShowClick }}>
                                                    {showPassword ? "Hide" : "Show"}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                        <Select  {...register('role')} placeholder="select role">
                                            <option value="admin"> admin </option>
                                            <option value="user"> user </option>

                                        </Select>
                                    </FormControl>
                                </Stack>
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme='blue' mr={3} onClick={onClose}>
                                    Close
                               </Button>
                                <Button type="submit" variant='ghost'
                                    onClick={handleSubmit} > Add</Button>
                            </ModalFooter>
                        </form>
                    </Box>
                </ModalContent>
            </Modal>

        </>

    )
}

