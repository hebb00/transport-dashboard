import { ChakraProvider } from "@chakra-ui/react"

import React, { useMemo, useState } from "react";
import { DataTable } from "../components/DataTable";
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
    // const [data, setData] = React.useState(() => makeData(20))
    const [originalData] = React.useState(data)
    const [skipPageReset, setSkipPageReset] = React.useState(false)
    const updateMyData = (rowIndex: number, columnId: any, value: string) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true)
        // setData(data =>
        //     data.map((row, index) => {
        //         if (index === rowIndex) {
        //             return {
        //                 ...data[rowIndex],
        //                 [columnId]: value,
        //             }
        //         }
        //         return row
        //     })
        // )
        React.useEffect(() => {
            setSkipPageReset(false)
        }, [data])

        // Let's add a data resetter/randomizer to help
        // illustrate that flow...
    }
    // const resetData = () => setData(originalData)

    return (
        <ChakraProvider>

            {/* <Button >Reset Data</Button> */}

            <DataTable
                columns={columns}
                data={data}
                updateMyData={updateMyData}
                skipPageReset={skipPageReset}
                fetchData={fetchData}
                loading={loading}
                pageCount={pageCount}

            />
        </ChakraProvider>
    )
};