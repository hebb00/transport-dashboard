import React from 'react'
import { useForm } from 'react-hook-form';
import { Button, Input, FormControl, Table, Tbody, Tr, Td, Text } from "@chakra-ui/react"
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
import { fetchData } from "./vehicle-service"


export default function VehicleForm({ getVehicles }: any) {

    const { handleSubmit: createHandleSubmit, register } = useForm(
        {
            defaultValues: {
                model: "",
                plateNum: "",

            }
        }
    )
    const handleSubmit = createHandleSubmit(values => {
        var vehicle = {
            model: values.model,
            plateNum: values.plateNum

        };
        fetchData(vehicle, `vehicle`).then(async res => {
            if (res.status == 200) {
                const result = await res.json();
                console.log("result is ", result)
                getVehicles()
                onClose();
            } else {
                console.log("error ", res.status)
            }
        })
    })
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button colorScheme="teal"
                onClick={onOpen}>New Vehicle</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add new Vehicle</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit}>
                        <ModalBody>
                            <FormControl  >
                                <Table>
                                    <Tbody>
                                        <Tr>
                                            <Td><Text >Model</Text></Td>
                                            <Td>
                                                <Input placeholder="model" type="text" {...register('model')} />
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td><Text>plate number</Text></Td>
                                            <Td>
                                                <Input placeholder="plateNum" type="text"  {...register('plateNum')} />
                                            </Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
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
    )
}
