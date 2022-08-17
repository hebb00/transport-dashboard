import React, { useState } from "react";
import {
    Heading,
    Input,
    Button,
    InputGroup,
    Text,
    Stack,
    InputLeftElement,
    chakra,
    FormControl,
    InputRightElement
} from "@chakra-ui/react";
import { useForm } from 'react-hook-form';
import { FaUserAlt, FaLock, FaPhone } from "react-icons/fa";
import { fetchData } from "./user-service"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../routes/login";
import { useCookies } from 'react-cookie';


const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaphone = chakra(FaPhone);

export default function UserForm() {
    const nav = useNavigate();
    const auth = useAuth();
    const [cookies, setCookie] = useCookies(['user']);

    const { handleSubmit: createHandleSubmit, register } = useForm(
        {
            defaultValues: {
                firstName: "",
                lastName: "",
                userName: "",
                newPass: "",
                oldPass: "0989786756",
                phoneNumber: "",
            }
        }
    )
    const handleSubmit = createHandleSubmit(values => {
        var User: any = {
            firstName: values.firstName,
            lastName: values.lastName,
            userName: values.userName,
            password: values.newPass,
            phoneNumber: values.phoneNumber,
        };
        fetchData(User, `modify/${auth.user.id}`).then(async res => {

            if (res.status == 200) {
                const user = await res.json();
                console.log("updated user ", user);
                setCookie('user', user);
                auth.signin(user, () => {
                    nav(`/profile?id=${user.id}`);
                });
            } else {
                nav(`/login?valid=false`, { state: "incorrect username or password" })
            }
        })
    })

    const [showPassword, setShowPassword] = useState(false);
    const handleShowClick = () => setShowPassword(!showPassword);

    return (
        <>
            <form method="POST" action={`/users/modify/${auth.user.id}`} onSubmit={handleSubmit} >
                <Stack
                    spacing={4}
                    p="1rem"
                    backgroundColor="whiteAlpha.900">
                    <Heading m="3" > change info</Heading>
                    <FormControl>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<CFaUserAlt color="gray.400" />}
                            />
                            <Input type="text" mb="3" placeholder="first Name"  {...register('firstName')} />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<CFaUserAlt color="gray.400" />}
                            />
                            <Input type="text" mb="3" placeholder="last Name"  {...register('lastName')} />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<CFaUserAlt color="gray.400" />}
                            />
                            <Input type="text" mb="3" placeholder="userName"  {...register('userName')} />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<CFaphone color="gray.400" />}
                            />
                            <Input type="text" mb="3" placeholder="phone number"  {...register('phoneNumber')} />
                        </InputGroup>
                        <Text color={'gray'} align="start" mb="3"> change password</Text>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                color="gray.300"
                                children={<CFaLock color="gray.400" />} />
                            <Input type={"password"} mb="3"  {...register('oldPass')} />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                color="gray.300"
                                children={<CFaLock color="gray.400" />} />
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="New Password"
                                {...register('newPass')} />
                            <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                    {showPassword ? "Hide" : "Show"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                </Stack>
                <Button type="submit" w="90px" colorScheme="teal" > save</Button>
            </form>
        </>
    )
}
