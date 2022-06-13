import EventTable from "../components/new-table"
import React, { useState } from "react";
import { Column } from "react-table";
import { Box, Button, ChakraProvider, Flex, FormControl, Input } from "@chakra-ui/react"
import { DriverForm } from "../components/driver-form"
import d from "../mock-data.json"
const serverData = d;
import { nanoid } from "nanoid";
import { useForm } from 'react-hook-form';

export default function Drivers() {
    type FormInputs = {
        fullName: string;
        phoneNumber: string;
        email: string;
    };
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
            },
            {
                Header: 'Full Name',
                accessor: 'fullName',
            },

            {
                Header: 'email',
                accessor: 'email',
            },
            {
                Header: 'phone number',
                accessor: 'phoneNumber',
            },
            // {
            //     Header: 'Profile Progress',
            //     accessor: 'progress',
            // },
        ],

        []
    )

    const [data, setData] = React.useState(
        d
    )
    console.log(data, 'its data')


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
    const resetData = () => setData(originalData)
    console.log(data, "ur data")

    const handleDeleteClick = (rowId: any) => {
        const newContacts = [...data];

        const index = data.findIndex((contact) => contact.id === rowId);

        newContacts.splice(index, 1);

        setData(newContacts);
    };

    return (
        <ChakraProvider>
            <EventTable
                columns={columns}
                data={data}
                updateMyData={updateMyData}
                skipPageReset={skipPageReset}
                handleDeleteClick={handleDeleteClick}

            />
            <form onSubmit={handleSubmit}>
                <FormControl>
                    <Flex>

                        <Box flex='1' >
                            <Input placeholder="name" type="text" {...register("fullName")} />

                        </Box>
                        <Box flex='1'>
                            <Input placeholder="phone number" type="text" {...register('phoneNumber')} />

                        </Box>
                        <Box flex='1'>
                            <Input placeholder="email" type="text"  {...register("email")} />

                        </Box>
                        <Box flex='1'>
                            <Button colorScheme="teal" type='submit'>add</Button>

                        </Box>
                    </Flex>

                </FormControl>
            </form>

            <DriverForm />



        </ChakraProvider>


    );
}