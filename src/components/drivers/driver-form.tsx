import {
    Button, Input, FormControl, InputLeftElement, InputGroup, Select
} from "@chakra-ui/react"
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
    chakra,

} from '@chakra-ui/react';
import { fetchData } from "./driver-service"
import { useForm } from 'react-hook-form';
import { FaUserAlt, FaLock, FaPhone, FaClipboard, FaTruck, FaCalendar } from "react-icons/fa";


const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaphone = chakra(FaPhone);
const CFtruck = chakra(FaTruck);
const CFcal = chakra(FaCalendar);
const CFclip = chakra(FaClipboard);




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
                onClick={onOpen}>Add Driver</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader> new driver</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit}>
                        <ModalBody>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaUserAlt color="gray.400" />} />
                                    <Input type="text" mb="3" placeholder="first Name"  {...register('firstName')} />
                                </InputGroup>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaUserAlt color="gray.400" />} />
                                    <Input type="text" mb="3" placeholder="last Name"  {...register('lastName', { required: true })} />
                                </InputGroup>
                                <InputGroup >
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaphone color="gray.400" />}
                                    />
                                    <Input type="text" mb="3" placeholder="phone number"  {...register('phoneNumber', { required: true })} />
                                </InputGroup>
                                <InputGroup >
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFclip color="gray.400" />}
                                    />
                                    <Input type="text" mb="3" placeholder="License Number"  {...register('licenseNum', { required: true })} />
                                </InputGroup>
                                <InputGroup >
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFtruck color="gray.400" />}
                                    />
                                    <Select mb="3" pl='3' placeholder="License Type"  {...register('licenseType', { required: true })}>
                                        <option value='small'>small</option>
                                        <option value='heavy'>heavy</option>

                                    </Select>
                                    {/* <Input type="text" mb="3" placeholder="License Type"  {...register('licenseType', { required: true })} /> */}
                                </InputGroup>
                                <InputGroup >
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFcal color="gray.400" />}
                                    />
                                    <Input mb="3" type="date" placeholder="License Expire Date" {...register('licenseExpDate', { required: true })} />
                                </InputGroup>
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
