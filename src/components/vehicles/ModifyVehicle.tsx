import { Input, Table, Tbody, Td, Tr, IconButton, Button, Th } from '@chakra-ui/react'
import React, { useState } from 'react'
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
import { fetchData, getData as getVehicle } from "./vehicle-service"
import { vehicle } from 'faker';

export default function ModifyVehicle({ id, getData }: any) {
    const [vehicle, setVehicle] = useState<any>({});
    const showVehicle = () => {
        getVehicle(`modify-vehicle/${id}`).then(async res => {
            if (res.status == 200) {
                const info = await res.json();
                setVehicle(info)
                console.log("  inside getVehicle in modify : ", info);
            } else {
                console.log(" error inside getVehicle: ", res.status);
            }
        });
    }
    const { handleSubmit: createHandleSubmit, register, setValue } = useForm(
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
        fetchData(vehicle, `modify-vehicle/${id}`).then(async res => {
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
            <IconButton m="1" aria-label={'edit'} onClick={() => {
                showVehicle();
                onOpen();
            }} color="teal" type="button" icon={<EditIcon />}>edidt</IconButton >
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader> modify vehicle info </ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit}>
                        <ModalBody>
                            <Table size="sm">
                                <Tbody>
                                    <Tr><Th>model</Th><Th>plate number</Th>
                                    </Tr>
                                    <Tr>
                                        <Td><Input  {...setValue('model', vehicle.model)} {...register('model', { required: true })} /></Td>
                                        <Td><Input {...setValue('plateNum', vehicle.plate_num)}  {...register('plateNum', { required: true })} /></Td>
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
