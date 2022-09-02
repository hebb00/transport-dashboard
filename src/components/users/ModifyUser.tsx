import { Input, IconButton, Button, FormControl, Select, Text } from '@chakra-ui/react'
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
import { fetchData, getData as getUser } from "./user-service"


export default function ModifyUser({ id, getData }: any) {
    const [user, setUser] = useState<any>({});

    const showUser = () => {
        getUser(`profile/${id}`).then(async res => {
            if (res.status == 200) {
                const info = await res.json();
                setUser(info)
                console.log(" user in modify : ", info);
            } else {
                console.log(" error : ", res.status);
            }
        });

    }


    const { handleSubmit: createHandleSubmit, register, setValue } = useForm(
        {
            defaultValues: {
                firstName: "",
                lastName: "",
                phoneNumber: "",
                userName: "",
                role: "",
            }
        }
    )
    const handleSubmit = createHandleSubmit(values => {
        const User: any = {
            firstName: values.firstName,
            lastName: values.lastName,
            userName: values.userName,
            phoneNumber: values.phoneNumber,
            role: values.role,
        };
        fetchData(User, `modify-user/${id}`).then(async res => {
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
            <IconButton m="1" aria-label={'edit'} onClick={() => { showUser(); onOpen(); }} color="teal" type="button" icon={<EditIcon />}>edidt</IconButton >
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader> modify user info </ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit}>
                        <ModalBody>
                            <FormControl>
                                <Text>First Name</Text>
                                <Input type="text" mb="3" {...setValue('firstName', user.firstname)}  {...register('firstName')} />
                                <Text>Last Name</Text>
                                <Input type="text" mb="3" {...setValue('lastName', user.lastname)} {...register('lastName')} />
                                <Text>UserName</Text>
                                <Input type="text" mb="3" {...setValue('userName', user.username)} {...register('userName')} />
                                <Text>Phone Number</Text>
                                <Input type="text" mb="3" {...setValue('phoneNumber', user.phone_num)}  {...register('phoneNumber')} />
                                <Text>Role</Text>
                                <Select  {...setValue('role', user.role)} {...register('role')} placeholder="select role">
                                    <option value="admin"> admin </option>
                                    <option value="user"> user </option>
                                </Select>
                            </FormControl>
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
