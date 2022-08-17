import React from 'react'
import { Button, Input, FormControl, InputGroup, chakra, InputLeftElement } from "@chakra-ui/react"
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
import { fetchData } from "./client-service";
import { FaUserAlt, FaPhone } from "react-icons/fa";


const CFaUserAlt = chakra(FaUserAlt);
const CFaphone = chakra(FaPhone);

export default function ClientForm({ getClient }: any) {

    const { handleSubmit: createHandleSubmit, register } = useForm(
        {
            defaultValues: {
                firstName: "",
                lastName: "",
                phoneNumber: "",
            }
        }
    )
    const handleSubmit = createHandleSubmit(values => {
        var client = {
            firstName: values.firstName,
            lastName: values.lastName,
            phoneNumber: values.phoneNumber,
        };
        fetchData(client, `client`).then(async res => {
            if (res.status == 200) {
                const result = await res.json();
                console.log("result is ", result)
                getClient()
                onClose();
            } else {
                console.log("error ", res.status)
            }
        })
    })
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button colorScheme="teal" onClick={onOpen}>Add Client</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader> new client</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit}>
                        <ModalBody>
                            <FormControl >
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaUserAlt color="gray.400" />} />
                                    <Input mb="3" placeholder="first name" type="text" {...register('firstName')} />
                                </InputGroup>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaUserAlt color="gray.400" />} />
                                    <Input mb="3" placeholder="last name" type="text" {...register('lastName')} />
                                </InputGroup>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaphone color="gray.400" />} />
                                    <Input mb="3" placeholder="phone number" type="text"  {...register('phoneNumber')} />
                                </InputGroup>
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}> Close  </Button>
                            <Button type="submit" variant='ghost'> Add</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}
