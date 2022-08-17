import { Input, Text, IconButton, Button, Th } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
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
import { fetchData, getData as getDriver } from "./driver-service"




export default function ModifyDriver({ id, getData }: any) {
    const [driver, setDriver] = useState<any>({});
    const showDriver = () => {
        getDriver(`modify-driver/${id}`).then(async res => {
            if (res.status == 200) {
                const info = await res.json();
                setDriver(info)
                console.log(" drivers inside getDriver in modify : ", info);
            } else {
                console.log(" error inside getDriver: ", res.status);
            }
        });

    }


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
        fetchData(driver, `modify-driver/${id}`).then(async res => {
            if (res.status == 200) {
                const result = await res.json();
                console.log("result is ", result)
                getData()
                onClose();
            } else {
                console.log("error ", res.status)
            }
        })
    })
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <IconButton m="1" aria-label={'edit'} onClick={() => { showDriver(); onOpen(); }} color="teal" type="button" icon={<EditIcon />}>edidt</IconButton >
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader> modify driver info </ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit}>
                        <ModalBody>
                            <Text w="50%">First Name</Text>
                            <Input placeholder={driver.firstname} {...register('firstName', { required: true })} />
                            <Text> Last Name</Text>
                            <Input placeholder={driver.lastname} {...register('lastName', { required: true })} />
                            <Text>Phone Number</Text>
                            <Input placeholder={driver.phone_num}  {...register('phoneNumber', { required: true })} />
                            <Text>  license number</Text>
                            <Input type="text" placeholder={driver.license_num} {...register('licenseNum', { required: true })} />
                            <Text> license Type</Text>
                            <Input type="text" placeholder={driver.license_type}  {...register('licenseType', { required: true })} />
                            <Text>license expire date</Text>
                            <Input type="date" placeholder={driver.license_exp_date} {...register('licenseExpDate', { required: true })} />
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
