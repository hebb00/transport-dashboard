import React, { useState } from "react";
import {
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    FormControl,
    InputRightElement
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
import { useForm } from 'react-hook-form';
import { FaUserAlt, FaLock } from "react-icons/fa";
import { fetchData } from "./user-service"
import { FormUserInputs } from "../../types/react-table-config"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../routes/login";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export default function UserForm() {
    const nav = useNavigate();
    const auth = useAuth()
    const { handleSubmit: createHandleSubmit, register } = useForm(
        {
            defaultValues: {
                firstName: "",
                lastName: "",
                userName: "",
                newPass: "",
                phoneNumber: "",
            }
        }
    )
    const handleSubmit = createHandleSubmit(values => {
        var user: FormUserInputs = {
            firstName: values.firstName,
            lastName: values.lastName,
            userName: values.userName,
            password: values.newPass,
            phoneNumber: values.phoneNumber,
        };
        fetchData(user, `modify/${auth.user.id}`).then(async res => {

            if (res.status == 200) {
                const user = await res.json();
                console.log("updated user ", user)
                auth.setUser(user);
                onClose();
                nav(`/profile?${auth.user.id}`)
            } else {
                nav(`/login?valid=false`, { state: "incorrect username or password" })
                // show error that the user already iexist sor or other error
            }
        })
    })

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [showPassword, setShowPassword] = useState(false);
    const handleShowClick = () => setShowPassword(!showPassword);

    return (
        <>
            <Button w={'full'}
                mt={8}
                bg={'teal'}
                color={'white'}
                rounded={'md'}
                _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                }}
                onClick={onOpen}>Edit</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader> modify info</ModalHeader>
                    <ModalCloseButton />
                    <form method="POST" action={`/users/modify/${auth.user.id}`} onSubmit={handleSubmit} >
                        <ModalBody>
                            <Stack
                                spacing={4}
                                p="1rem"
                                backgroundColor="whiteAlpha.900"
                                boxShadow="md" >
                                <FormControl>
                                    <Input type="text" mb="3" placeholder="first Name"  {...register('firstName')} />
                                    <Input type="text" mb="3" placeholder="last Name"  {...register('lastName')} />
                                    <Input type="text" mb="3" placeholder="userName"  {...register('userName')} />
                                    <Input type="text" mb="3" placeholder="phone number"  {...register('phoneNumber')} />
                                </FormControl>
                                <FormControl>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            color="gray.300"
                                            children={<CFaLock color="gray.300" />} />
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
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button type="submit" variant='ghost'> save</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}
