import { useState } from "react";
import {
    Button, Input, FormControl,
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
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { nanoid } from "nanoid";

export function DriverForm(): any {
    const [data, setData] = useState(
        [{
            fullName: "",
            phoneNumber: "",
            email: "",
        }

        ]
    );

    type FormInputs = {
        fullName: string;
        phoneNumber: string;
        email: string;
    };
    const { handleSubmit: createHandleSubmit, register } = useForm<FormInputs>(
        {
            defaultValues: {
                fullName: "",
                phoneNumber: "",
                email: "",
            }
        }
    )
    const handleSubmit = createHandleSubmit(values => {
        const newDriver: any = {
            id: nanoid(),
            fullName: values.fullName,
            phoneNumber: values.phoneNumber,
            email: values.email,
        };
        console.log(values, "valuees")

        const newDrivers = [...data, newDriver];
        console.log(newDrivers, "newDriver")

        setData(newDrivers);
        console.log(data, "ddd");


    });

    const [addFormData, setAddFormData] = useState({
        fullName: "",
        phoneNumber: "",
        email: "",
    });



    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button colorScheme="teal"
                onClick={onOpen}>New Driver</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add new driver</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit}>

                        <ModalBody>
                            <FormControl  >
                                <Input placeholder="full name" type="text" {...register('fullName')} />
                                <Input placeholder="phone number" type="text"  {...register('phoneNumber')} />
                                <Input id='email' type='email' placeholder="email" {...register('email')} />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button type="submit" variant='ghost'> Add</Button>
                        </ModalFooter>

                    </form>
                </ModalContent>
            </Modal>



        </>

    );
}
