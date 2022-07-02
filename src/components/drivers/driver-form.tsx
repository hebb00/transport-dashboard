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


export function DriverForm({ handleSubmit, register, data, setData }: any): any {

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