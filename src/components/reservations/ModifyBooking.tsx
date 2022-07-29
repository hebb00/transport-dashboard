import { Button, Input, IconButton, FormControl } from "@chakra-ui/react"
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
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { fetchData, getData as getBooking } from "./reservation-service"
import { EditIcon } from '@chakra-ui/icons';
import { useAuth } from '../../routes/login';



export function ModifyBooking({ id, getData }: any): any {
    const auth = useAuth();
    const userId = auth.user.id;
    const [booking, setBooking] = useState<any>()
    const showClient = () => {
        getBooking(`reservation/${id}`).then(async res => {
            if (res.status == 200) {
                const info = await res.json();
                setBooking(info)
                console.log(" client inside getClient in modify : ", info);
            } else {
                console.log(" error inside getClient: ", res.status);
            }
        });

    }


    const { handleSubmit: createHandleSubmit, register } = useForm(
        {
            defaultValues: {
                clientId: 0,
                source: "",
                Location: "",
                StartTime: "",
                EndTime: "",
                vehicleId: 0,
                price: 0

            }
        }
    )
    const handleSubmit = createHandleSubmit(values => {
        var client = {
            clientId: values.clientId,
            Location: values.Location,
            source: values.source,
        };
        fetchData(client, `modify-reservation/${id}/${userId}`).then(async res => {
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
            <IconButton m="1" aria-label={'edit'} onClick={() => { showClient(); onOpen(); }} color="teal" type="button" icon={<EditIcon />}>edidt</IconButton >
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add new reservation</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit}>
                        <ModalBody>
                            <FormControl  >
                                <Input placeholder="full name" type="text" {...register('clientId')} />
                                <Input placeholder="destination" {...register('Location')} />
                                <Input placeholder="source" {...register('source')} />
                                <Input type='date' placeholder="end date" {...register('StartTime')} />
                                <Input type='date' placeholder="start Date" {...register('EndTime')} />
                                <Input id='email' type='email' placeholder="email" {...register('vehicleId')} />
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
