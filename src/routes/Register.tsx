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
    InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaPhone, Fa500Px } from "react-icons/fa";
import { fetchData } from "../components/users/user-service"
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react"
import { useAuth } from "./login";
//Optionally, you can wrap your application with
// the ColorModeProvider so you can toggle between light and dark mode

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaphone = chakra(FaPhone);
const CFa500 = chakra(Fa500Px);

export default function Register() {
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
            }
        }
    )
    const handleSubmit = createHandleSubmit(values => {
        var user: FormUserInputs = {
            firstName: values.firstName,
            lastName: values.lastName,
            userName: values.userName,
            password: values.password,
            phoneNumber: values.phoneNumber,
        };
        fetchData(user, "register").then(async res => {

            if (res.status == 200) {
                const user = await res.json();
                auth.signin(user, () => {
                    console.log(user);
                    nav(`/profile?id=${user.id}`);
                });
            } else {
                nav(`/login?valid=false`, { state: "incorrect username or password" })
                // show error that the user already iexist sor or other error
            }
        })
    })
    return (
        <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
            bg='gray.50'
            justifyContent="center"
            alignItems="center"
        >
            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
            >
                <Avatar bg="teal.500" />
                <Heading color="teal.400">Welcome</Heading>
                <Box minW={{ base: "90%", md: "468px" }}>
                    <form method="POST" action="/users/register">
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
                            </FormControl>
                            <Button
                                borderRadius={0}
                                type="submit"
                                variant="solid"
                                colorScheme="teal"
                                width="full"
                                onClick={handleSubmit}
                            >
                                Sign Up
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
            <Box>
                already have an acount?{" "}
                <Link color="teal.500" href="/login">
                    log in
                </Link>
            </Box>
        </Flex>


    )
}

