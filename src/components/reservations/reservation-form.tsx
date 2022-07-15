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


export function ReservationForm({ handleSubmit, register, data, setData }: any): any {

    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button colorScheme="teal"
                onClick={onOpen}>New reservation</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add new reservation</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit}>

                        <ModalBody>
                            <FormControl  >
                                <Input placeholder="full name" type="text" {...register('client-name')} />
                                <Input placeholder="phone number" type="text"  {...register('date')} />
                                <Input id='email' type='email' placeholder="email" {...register('to')} />
                                <Input id='email' type='email' placeholder="email" {...register('from')} />

                                <Input id='email' type='email' placeholder="email" {...register('vehicle')} />
                                <Input id='email' type='email' placeholder="email" {...register('price')} />


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
