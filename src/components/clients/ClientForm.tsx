import React from 'react'
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

export default function ClientForm({ handleSubmit, register }: any) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button colorScheme="teal"
                onClick={onOpen}>Add New Client</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader> new client</ModalHeader>
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
    )
}
