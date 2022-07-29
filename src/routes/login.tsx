import React, { useState } from "react";
import {
    Text,
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
    FormHelperText,
    InputRightElement,
    Checkbox
} from "@chakra-ui/react";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react"
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { FormUserLogin } from "../types/react-table-config"
import { fetchData } from "../components/users/user-service"
import { AuthContext } from "../Views";
import { useLocation } from "react-router-dom"
import { useCookies } from 'react-cookie';
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export const useAuth = () => {
    return React.useContext(AuthContext);
}
const Login = () => {
    const [cookies, setCookie] = useCookies(['user']);
    const auth = useAuth();
    console.log(auth);
    const { handleSubmit: createHandleLogin, register } = useForm(
        {
            defaultValues: {
                userName: "",
                password: "",
                check: false,
            }
        }
    )
    var userCookie: object = {}
    let nav = useNavigate();
    const handleSubmit = createHandleLogin(values => {
        var userInfo = {
            userName: values.userName,
            password: values.password,
            check: values.check,
        };
        fetchData(userInfo, "login").then(async res => {

            if (res.status == 200) {
                const user = await res.json();
                userCookie = user
                auth.signin(user, () => {
                    console.log(user);
                    nav(`/profile?id=${user.id}`);
                });
                if (userInfo.check) {
                    setCookie('user', userCookie);
                    console.log(cookies.user, "its ur cookies")
                }
            } else {
                console.log(res.status, res.json())
                nav("/login", { state: "incorrect username or password" })
            }
        })

    })
    const loc: any = useLocation()
    console.log(loc.state)
    const [showPassword, setShowPassword] = useState(false);

    const handleShowClick = () => setShowPassword(!showPassword);

    return (
        <ChakraProvider>
            <Flex
                flexDirection="column"
                width="100wh"
                height="100vh"
                bg='gray.50'
                justifyContent="center"
                alignItems="center"
            >
                <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center"  >
                    <Avatar bg="teal.500" />
                    <Heading color="teal.400">Welcome</Heading>
                    <Box minW={{ base: "90%", md: "468px" }}>
                        <form method="POST" action="/users/login">
                            <Stack
                                spacing={4}
                                p="1rem"
                                backgroundColor="whiteAlpha.900"
                                boxShadow="md" >
                                <FormControl>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            children={<CFaUserAlt color="gray.300" />}
                                        />
                                        <Input type="text" placeholder="userName"  {...register('userName')} />
                                    </InputGroup>
                                </FormControl>
                                <FormControl>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            color="gray.300"
                                            children={<CFaLock color="gray.300" />} />
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Password"
                                            {...register('password')} />
                                        <InputRightElement width="4.5rem">
                                            <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                                {showPassword ? "Hide" : "Show"}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormHelperText textAlign="right">
                                        {loc.state ?
                                            <Text color='tomato'> {loc.state}</Text>
                                            : ""}
                                    </FormHelperText>
                                    <Checkbox
                                        {...register('check', { onChange: (e) => { console.log(e) } })}>stay logged in?</Checkbox>
                                </FormControl>
                                <Button
                                    borderRadius={0}
                                    type="submit"
                                    variant="solid"
                                    colorScheme="teal"
                                    width="full"
                                    onClick={handleSubmit}  >
                                    Login
                            </Button>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
                <Box>
                    New to us?{" "}
                    <Link as={RouteLink} to="/register" color="teal.500" href="#">register </Link>
                </Box>
            </Flex>
        </ChakraProvider >
    );
};

export default Login;
