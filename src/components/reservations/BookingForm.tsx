import { Button, Input, IconButton, FormControl, Checkbox, Text } from "@chakra-ui/react"
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
import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { fetchData } from "./reservation-service"
import { getData as getClient } from "../../components/clients/client-service"
import { getData as getDriver } from "../../components/drivers/driver-service"
import { getData as getVehicle } from "../../components/vehicles/vehicle-service"
import { EditIcon } from '@chakra-ui/icons';
import { Select } from '@chakra-ui/react';
import { useCookies } from "react-cookie";


export default function BookingForm({ getReservation }: any) {
    const [cookies, setCookie] = useCookies();
    const [booking, setBooking] = useState<any>([]);
    const [client, setClient] = useState<any>([]);
    const [driver, setDriver] = useState<any>([]);
    const [vehicle, setVehicle] = useState<any>([]);
    var userId = cookies.user.id;

    const { handleSubmit: createHandleSubmit, register } = useForm({})
    const handleSubmit = createHandleSubmit(values => {
        var book = {
            Subject: values.subject,
            Description: values.description,
            client_id: values.clientId,
            Location: values.Location,
            source: values.source,
            StartTime: values.StartTime,
            EndTime: values.EndTime,
            vehicle_id: values.platenum,
            driver_id: values.driverId,
            price: values.price,
            IsAllDay: values.IsAllDay

        };
        fetchData(book, `reservation/${userId}`).then(async res => {
            if (res.status == 200) {
                const result = await res.json();
                getReservation();
                console.log("result is ", result)
                onClose();
            } else {
                console.log("error ", res.status)
            }
        })
    })
    useEffect(() => {
        getClient("client").then(async res => {
            if (res.status == 200) {
                const clients = await res.json();
                setClient(clients)
                console.log(" client: ", clients);
            } else {
                console.log(" error ", res.status);

            }
        })

    }, [])
    useEffect(() => {
        getDriver("driver").then(async res => {
            if (res.status == 200) {
                const drivers = await res.json();
                setDriver(drivers)
                console.log(" drivers: ", drivers);
            } else {
                console.log(" error ", res.status);

            }
        })

    }, [])
    useEffect(() => {
        getVehicle("vehicle").then(async res => {
            if (res.status == 200) {
                const vehicles = await res.json();
                setVehicle(vehicles)
                console.log(" vehicles: ", vehicles);
            } else {
                console.log(" error ", res.status);

            }
        })

    }, [])
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button colorScheme="teal"
                onClick={onOpen}>Add Reservation</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>add new reservation</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit}>
                        <ModalBody>
                            <FormControl  >
                                <Text>description</Text>
                                <Input mb="2" placeholder="description" {...register('description', { required: true })} />
                                <Text>location</Text>
                                <Input mb="2" placeholder="location" {...register('Location', { required: true })} />
                                <Text>subject</Text>
                                <Input mb="2" placeholder="subject" {...register('subject', { required: true })} />
                                <Text>source</Text>
                                <Input mb="2" placeholder="source" {...register('source', { required: true })} />
                                <Text>start time</Text>
                                <Input mb="2" type='date' placeholder="Start Time" {...register('StartTime', { required: true })} />
                                <Text>end time</Text>
                                <Input mb="2" type='date' placeholder="End Time"{...register('EndTime', { required: true })} />
                                <Text>price</Text>
                                <Input mb="2" placeholder="price" {...register('price', { required: true })} />
                                <Select mb="2"  {...register('platenum')} placeholder='Select vehicle' >
                                    {vehicle.map((vehicle: any, i: any) => {
                                        return (
                                            <option key={i} value={vehicle.id}>{vehicle.plate_num}</option>
                                        )
                                    })}
                                </Select>
                                <Select mb="2"  {...register('driverId')} placeholder='Select driver'>
                                    {driver.map((driver: any, i: any) => {
                                        return (
                                            <option key={i} value={driver.id}>{driver.firstname + " " + driver.lastname}</option>
                                        )
                                    })}
                                </Select>
                                <Select mb="2"  {...register('clientId')} placeholder='Select client'>
                                    {client.map((client: any, i: any) => {
                                        return (
                                            <option key={i} value={client.id}>{client.firstname + " " + client.lastname}</option>
                                        )
                                    })}
                                </Select>
                                <Checkbox  {...register('IsAllDay')}> isAllDay</Checkbox>

                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                                Close
                    </Button>
                            <Button type="submit" variant='ghost'> save</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>



        </>
    )
}
