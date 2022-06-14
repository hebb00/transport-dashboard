import { useTable, usePagination } from 'react-table'
import d from '../mock-data.json'
import React, { useMemo, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react"
import EventTable from "../components/new-table"


export default function jobs() {

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

    const handleDeleteClick = (rowId: any) => {
        const newContacts = [...data];

        const index = data.findIndex((contact) => contact.id === rowId);

        newContacts.splice(index, 1);

        setData(newContacts);
    };


    // After data chagnes, we turn the flag back off
    // so that if data actually changes when we're not
    // editing it, the page is reset
    React.useEffect(() => {
        setSkipPageReset(false)
    }, [data])

    // Let's add a data resetter/randomizer to help
    // illustrate that flow...
    const resetData = () => setData(originalData)


    return (
        <ChakraProvider>
            <EventTable
                columns={columns}
                data={data}
                updateMyData={updateMyData}
                skipPageReset={skipPageReset}
                handleDeleteClick={handleDeleteClick}

            />

        </ChakraProvider>

    );
}