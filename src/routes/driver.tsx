import React, { useState } from "react";
import { useForm } from 'react-hook-form';

import { Box, Flex, HStack, Link, Text } from "@chakra-ui/react"

import EventTable from "../components/table/new-table"
import { DriverForm } from "../components/drivers/driver-form"
import { driversData } from "../components/drivers/driver-service"
import { nanoid } from "nanoid";
import { FormInputs } from "../types/react-table-config"


export default function Drivers() {
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

    const columns = React.useMemo(
        () => [

            {
                Header: 'id',
                accessor: 'id',
                sortType: 'basic',
            },
            {
                Header: 'Full Name',
                accessor: 'fullName',
                sortType: 'basic',
            },

            {
                Header: 'email',
                accessor: 'email',
                sortType: 'basic',
            },
            {
                Header: 'phone number',
                accessor: 'phoneNumber',
                sortType: 'basic',
            },
            // {
            //     Header: 'Profile Progress',
            //     accessor: 'progress',
            // },
        ],

        []
    )

    const [originalData] = React.useState(data)
    const [skipPageReset, setSkipPageReset] = React.useState(false)
    // We need to keep the table from resetting the pageIndex when we
    // Update data. So we can keep track of that flag with a ref.

    // When our cell renderer calls updateMyData, we'll use
    // the rowIndex, columnId and new value to update the
    // original data
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

    // After data chagnes, we turn the flag back off
    // so that if data actually changes when we're not
    // editing it, the page is reset
    React.useEffect(() => {
        setSkipPageReset(false)
    }, [data])

    // Let's add a data resetter/randomizer to help
    // illustrate that flow...
    const resetData = () => setData(originalData);

    const handleDeleteClick = (rowId: any) => {
        const newContacts = [...data];
        const index = data.findIndex((contact) => contact.id === rowId);
        newContacts.splice(index, 1);
        setData(newContacts);
    };

    return (
        <Flex flexDirection="column" >
            <Box >
                <EventTable
                    columns={columns}
                    data={data}
                    updateMyData={updateMyData}
                    skipPageReset={skipPageReset}
                    handleDeleteClick={handleDeleteClick} />
            </Box>
            <HStack spacing={'auto'} >
                <Box ml="3" >
                    <DriverForm
                        data={data}
                        setData={setData}
                        handleSubmit={handleSubmit}
                        register={register} />
                </Box>
            </HStack>
        </Flex>
    );
}