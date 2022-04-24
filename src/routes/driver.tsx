import { DataTable } from "../components/DataTable";
import { useTable, usePagination } from 'react-table'
import makeData from '../makeData'
import React, { useMemo, useState } from "react";
import { Column } from "react-table";
import { ChakraProvider, Button } from "@chakra-ui/react"
import { DriverForm } from "../components/driver-form"
import d from "../mock-data.json"
const serverData = d;

export default function Drivers() {
    const columns: Column[] = [
        {
            Header: "id",
            accessor: "id",
        },

        {
            Header: "Name",
            accessor: "fullName",
        },

        {
            Header: "email",
            accessor: "email",
        },
        {
            Header: "phone Number",
            accessor: "phoneNumber",
            isNumeric: true,
        }
    ];
    const [data, setData] = React.useState([])

    const [loading, setLoading] = React.useState(false)
    const [pageCount, setPageCount] = React.useState(0)
    const fetchIdRef = React.useRef(0)

    const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
        // This will get called when the table needs new data
        // You could fetch your data from literally anywhere,
        // even a server. But for this example, we'll just fake it.

        // Give this fetch an ID
        const fetchId = ++fetchIdRef.current

        // Set the loading state
        setLoading(true)

        // We'll even set a delay to simulate a server here
        setTimeout(() => {
            // Only update the data if this is the latest fetch
            if (fetchId === fetchIdRef.current) {
                const startRow = pageSize * pageIndex
                const endRow = startRow + pageSize
                setData(serverData.slice(startRow, endRow))

                // Your server could send back total page count.
                // For now we'll just fake it, too
                setPageCount(Math.ceil(serverData.length / pageSize))

                setLoading(false)
            }
        }, 1000)
    }, [])

    const [filter, setFilter] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;
        setFilter(value);
    };
    const [originalData] = React.useState(data)
    const [skipPageReset, setSkipPageReset] = React.useState(false)
    const updateMyData = (rowIndex: number, columnId: any, value: string) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true)

        React.useEffect(() => {
            setSkipPageReset(false)
        }, [data])

        // Let's add a data resetter/randomizer to help
        // illustrate that flow...
    }
    console.log(data, "ur data")
    return (
        <ChakraProvider>
            <DataTable
                columns={columns}
                data={data}
                updateMyData={updateMyData}
                skipPageReset={skipPageReset}
                fetchData={fetchData}
                loading={loading}
                pageCount={pageCount}

            />
            <DriverForm />

        </ChakraProvider>

    );
}