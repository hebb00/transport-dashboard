import { useForm } from 'react-hook-form';
import React, { useMemo, useState } from "react";

import { ChakraProvider } from "@chakra-ui/react"
import { Box, Flex, HStack, Link, Text } from "@chakra-ui/react"
import { Column } from "react-table";
import EventTable from "../components/table/new-table"
import { nanoid } from "nanoid";
import { FormInputs } from "../types/react-table-config"
import VehicleForm from "../components/vehicles/VehicleForm"
import { vehicleData } from "../components/vehicles/vehicle-service"

export default function Vehicle() {
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
    const { data, setData } = vehicleData()

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
        <ChakraProvider>

            {/* <Button >Reset Data</Button> */}

            <EventTable
                columns={columns}
                data={data}
                updateMyData={updateMyData}
                skipPageReset={skipPageReset}
                handleDeleteClick={handleDeleteClick}


            />
            <HStack
                spacing={'auto'}
            >
                <Box
                    ml="3"
                >
                    <VehicleForm
                        data={data}
                        setData={setData}
                        handleSubmit={handleSubmit}
                        register={register}

                    />

                </Box>
            </HStack>
        </ChakraProvider>
    )
};