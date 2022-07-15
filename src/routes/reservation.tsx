import EventTable from "../components/table/new-table"
import { Box, Flex, HStack, Link, Text } from "@chakra-ui/react"
import React, { useMemo, useState } from "react";
import { Column } from "react-table";
import { driversData } from "../components/drivers/driver-service"
import { nanoid } from "nanoid";
import { FormInputs } from "../types/react-table-config"
import { useForm } from 'react-hook-form';
import { ReservationForm } from "../components/reservations/reservation-form"
export default function Reservation() {
    // const columns = React.useMemo(
    //     () => [

    //         {
    //             Header: 'id',
    //             accessor: 'id',
    //             sortType: 'basic',
    //         },
    //         {
    //             Header: 'Client Name',
    //             accessor: 'client-name',
    //             sortType: 'basic',
    //         },
    //         {
    //             Header: 'From',
    //             accessor: 'from',
    //             sortType: 'basic',
    //         },

    //         {
    //             Header: 'To',
    //             accessor: 'to',
    //             sortType: 'basic',
    //         },

    //         {
    //             Header: 'vehicle',
    //             accessor: 'vehicle',
    //             sortType: 'basic',

    //         },
    //         {
    //             Header: 'price',
    //             accessor: 'price',
    //             sortType: 'basic',

    //         },
    //         {
    //             Header: 'Date',
    //             accessor: 'date',
    //             sortType: 'basic',

    //         },
    //         {
    //             Header: 'Driver',
    //             accessor: 'driver',
    //             sortType: 'basic',

    //         },
    //         {
    //             Header: 'booked',
    //             accessor: 'booked',
    //             sortType: 'basic',

    //         },
    //     ],

    //     []
    // )
    const columns: Column[] = [
        {
            Header: "id",
            accessor: "id",
        },

        {
            Header: "Type",
            accessor: "fullName",
        },

        {
            Header: "driver",
            accessor: "email",
        },
        {
            Header: "number",
            accessor: "phoneNumber",
            isNumeric: true,
        }
    ];
    const { data, setData } = driversData()
    const { handleSubmit: createHandleSubmit, register } = useForm<FormInputs>(
        {
            defaultValues: {
                fullName: "",
                phoneNumber: "",
                email: "",
            }
        }
    )
    const handleSubmit = createHandleSubmit(values => {
        const newContact: any = {
            id: nanoid(),
            fullName: values.fullName,
            phoneNumber: values.phoneNumber,
            email: values.email,
        };
        console.log(values, "valuees")
        const newContacts = [...data, newContact];
        setData(newContacts);
        console.log(data, "ddd");


    });

    const [originalData] = React.useState(data)
    const [skipPageReset, setSkipPageReset] = React.useState(false)
    const updateMyData = (rowIndex: any, columnId: any, value: any) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true)
        setData((old) =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...old[rowIndex],
                        [columnId]: value,
                    }
                }
                return row
            })
        )
    }

    React.useEffect(() => {
        setSkipPageReset(false)
    }, [data])
    const resetData = () => setData(originalData);

    const handleDeleteClick = (rowId: any) => {
        const newContacts = [...data];
        const index = data.findIndex((contact) => contact.id === rowId);
        newContacts.splice(index, 1);
        setData(newContacts);
    };

    return (
        <>
            <EventTable
                columns={columns}
                data={data}
                updateMyData={updateMyData}
                skipPageReset={skipPageReset}
                handleDeleteClick={handleDeleteClick}
            />
            <HStack
                spacing={'auto'} >
                <Box ml="3" >
                    < ReservationForm />
                </Box>
            </HStack>
        </>
    )
}
