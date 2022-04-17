import { DataTable } from "../components/DataTable";
import { useTable, usePagination } from 'react-table'
import makeData from '../makeData'
import React, { useMemo, useState } from "react";
import { Column } from "react-table";
import { ChakraProvider } from "@chakra-ui/react"


export default function jobs() {
    const columns: Column<UnitConversion>[] = [
        {
            Header: "vehicle",
            accessor: "fromUnit"
        },
        {
            Header: "driver",
            accessor: "toUnit"
        },
        {
            Header: "maintenance",
            accessor: "factor",
            isNumeric: true
        }
    ];

    type UnitConversion = {
        fromUnit: string;
        toUnit: string;
        factor: number;
    };


    const data: UnitConversion[] = [
        {
            fromUnit: "inches",
            toUnit: "millimetres (mm)",
            factor: 25.4
        },
        {
            fromUnit: "feet",
            toUnit: "centimetres (cm)",
            factor: 30.48
        },
        {
            fromUnit: "yards",
            toUnit: "metres (m)",
            factor: 0.91444
        }
    ];
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
    return (
        <ChakraProvider>
            <DataTable
                columns={columns}
                data={data}
                updateMyData={updateMyData}
                skipPageReset={skipPageReset}

            />
        </ChakraProvider>

    );
}