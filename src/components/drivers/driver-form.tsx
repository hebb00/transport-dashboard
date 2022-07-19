import { Button, Input, FormControl } from "@chakra-ui/react"
import React, { useState } from "react";
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
import { fetchData } from "./driver-service"
import { useForm } from 'react-hook-form';

export function DriverForm({ data, getDriver }: any) {

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
        fetchData(driver, `driver`).then(async res => {
            if (res.status == 200) {
                const result = await res.json();
                console.log("result is ", result)
                getDriver()
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
                onClick={onOpen}>Add New Driver</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader> new driver</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit}>
                        <ModalBody>
                            <FormControl>
                                <Input type="text" mb="3" placeholder="first Name"  {...register('firstName')} />
                                <Input type="text" mb="3" placeholder="last Name"  {...register('lastName')} />
                                <Input type="text" mb="3" placeholder="phone number"  {...register('phoneNumber')} />
                                <Input type="text" mb="3" placeholder="License Number"  {...register('licenseNum')} />
                                <Input type="text" mb="3" placeholder="License Type"  {...register('licenseType')} />
                                <Input mb="3" type="date" placeholder="License Expire Date" {...register('licenseExpDate')} />
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
