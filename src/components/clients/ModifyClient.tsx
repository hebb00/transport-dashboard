import { Input, Table, Tbody, Td, Tr, IconButton, Button, Th } from '@chakra-ui/react'
import React from 'react'
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
import { EditIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { fetchData, getData } from "./client-service"

export default function ModifyClient({ id, getData }: any) {

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
        fetchData(client, `modify-client/${id}`).then(async res => {
            if (res.status == 200) {
                const result = await res.json();
                getData();
                console.log("result is ", result)
                onClose();
            } else {
                console.log("error ", res.status)
            }
        })
    })

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <IconButton m="1" aria-label={'edit'} onClick={onOpen} type="button" icon={<EditIcon />}>edidt</IconButton >
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader> modify client info </ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit}>
                        <ModalBody>
                            <Table size="sm">
                                <Tbody>
                                    <Tr><Th>First Name</Th><Th>Last Name</Th><Th>Phone Number</Th>
                                    </Tr>
                                    <Tr>
                                        <Td><Input placeholder="First Name"  {...register('firstName')} /></Td>
                                        <Td><Input placeholder="Last Name" {...register('lastName')} /></Td>
                                        <Td><Input placeholder="Phone Number"  {...register('phoneNumber')} /></Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}> Close  </Button>
                            <Button type="submit" variant='ghost'> save</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}
