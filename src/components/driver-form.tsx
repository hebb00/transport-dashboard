import { useState } from "react";
import { useForm } from "react-hook-form";
import {
    ChakraProvider, Button, Input, Select, Textarea, FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from "@chakra-ui/react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react'
import data from "../mock-data.json"


export function DriverForm() {
    const [addFormData, setAddFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",

    });
    const [drivers, setDrivers] = useState(data)
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <ChakraProvider>
            <Button colorScheme='blue' onClick={onOpen}>New Driver</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add new driver</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <Input placeholder="First name" />
                            <Input placeholder="last name" />
                            <Input placeholder="phone number" />
                            <Input id='email' type='email' placeholder="email" />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                            </Button>
                        <Button type="submit" variant='ghost'> Add</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>



        </ChakraProvider>

    );
}
