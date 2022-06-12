import { ChakraProvider } from "@chakra-ui/react"
import EventTable from "../components/new-table"

import React, { useMemo, useState } from "react";
import { Column } from "react-table";
import d from "../mock-data.json"
const serverData = d;

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
    const [data, setData] = React.useState(
        d
    )



    const [originalData] = React.useState(d)
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

    // Let's add a data resetter/randomizer to help
    // illustrate that flow...

    // const resetData = () => setData(originalData)

    return (
        <ChakraProvider>

            {/* <Button >Reset Data</Button> */}

            <EventTable
                columns={columns}
                data={data}
                updateMyData={updateMyData}
                skipPageReset={skipPageReset}


            />
        </ChakraProvider>
    )
};