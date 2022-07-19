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
import { fetchData } from "./driver-service"

export default function ModifyDriver({ id, getData }: any) {


    const { handleSubmit: createHandleSubmit, register } = useForm(
        {
            defaultValues: {
                firstName: "",
                lastName: "",
                phoneNumber: "",
                licenseNum: "",
                licenseType: "",
                licenseExpDate: "",
            }
        }
    )
    const handleSubmit = createHandleSubmit(values => {
        var driver = {
            firstName: values.firstName,
            lastName: values.lastName,
            phoneNumber: values.phoneNumber,
            licenseNum: values.licenseNum,
            licenseType: values.licenseType,
            licenseExpDate: values.licenseExpDate,
        };
        fetchData(driver, `modify-driver/${id}`).then(async res => {
            if (res.status == 200) {
                const result = await res.json();
                console.log("result is ", result)
                getData()
                onClose();
            } else {
                console.log("error ", res.status)
            }
        })
    })

    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <IconButton m="1" aria-label={'edit'} onClick={onOpen} color="teal" type="button" icon={<EditIcon />}>edidt</IconButton >
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader> modify driver info </ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit}>
                        <ModalBody>
                            <Table size="sm">
                                <Tbody>
                                    <Tr><Th>First Name</Th><Td><Input placeholder="First Name"  {...register('firstName')} /></Td></Tr>
                                    <Tr><Th>Last Name</Th><Td><Input placeholder="Last Name" {...register('lastName')} /></Td></Tr>
                                    <Tr><Th>Phone Number</Th><Td><Input placeholder="Phone Number"  {...register('phoneNumber')} /></Td> </Tr>
                                    <Tr><Th>license number</Th><Td> <Input type="text" placeholder="License Number"  {...register('licenseNum')} /></Td></Tr>
                                    <Tr><Th>license Type</Th><Td><Input type="text" placeholder="License Type"  {...register('licenseType')} /> </Td></Tr>
                                    <Tr><Th w="50%">license expire date</Th><Td><Input type="date" placeholder="License Expire Date" {...register('licenseExpDate')} /> </Td></Tr>
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
