import React from 'react'
import {
    Button, Input, FormControl, Checkbox, Table, Tbody, Tr, Td, Text, InputGroup, InputLeftElement
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


export default function VehicleForm({ handleSubmit, register, data, setData }: any) {
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
                                            <Td><Text >number</Text></Td>
                                            <Td>
                                                <Input placeholder="car number" type="text" {...register('id')} />
                                            </Td>

                                        </Tr>
                                        <Tr>
                                            <Td><Text>model</Text></Td>
                                            <Td>
                                                <Input placeholder="model" type="text"  {...register('model')} />
                                            </Td>

                                        </Tr>
                                        <Tr>
                                            <Td><Text>rent price</Text></Td>
                                            <Td>
                                                <InputGroup>
                                                    <InputLeftElement
                                                        pointerEvents='none'
                                                        color='gray.300'
                                                        fontSize='1.2em'
                                                        children='$'
                                                    />
                                                    <Input id='price' type='email' placeholder="price" {...register('rentPrice')} />
                                                </InputGroup>

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
