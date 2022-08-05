import React, { useMemo, useState, useEffect } from "react";

import { ChakraProvider } from "@chakra-ui/react"
import { Box, Flex, HStack, Link, Text } from "@chakra-ui/react"
import { Column } from "react-table";
import EventTable from "../components/table/new-table"

import VehicleForm from "../components/vehicles/VehicleForm"
import { fetchData, getData } from "../components/vehicles/vehicle-service"
import ModifyVehicle from "../components/vehicles/ModifyVehicle";


export default function Vehicle() {
    const [data, setData] = useState<any>([{}])
    const columns: Column[] = [
        {
            Header: "id",
            accessor: "id",
        },

        {
            Header: "plate number",
            accessor: "plate_num",
        },

        {
            Header: "model",
            accessor: "model",
        },

    ];
    function getVehicles() {
        getData("vehicle").then(async res => {
            if (res.status == 200) {
                const vehicles = await res.json();
                setData(vehicles)
                console.log(" vehicles inside getvehicles: ", vehicles);
            } else {
                console.log(" error inside getvehicles: ", res.status);

            }
        })

    }
    useEffect(() => {
        getData("vehicle").then(async res => {
            if (res.status == 200) {
                const vehicle = await res.json();
                setData(vehicle)
                console.log(" vehicles: ", vehicle);
            } else {
                console.log(" error ", res.status);

            }
        })

    }, [])
    const handleDeleteClick = (rowId: any) => {
        getData(`vehicle/${rowId}`).then(async res => {
            if (res.status == 200) {
                getVehicles()
                console.log(" vehicle inside handelDelete: ");
            } else {
                console.log(" error inside  handelDelete: ", res.status);
            }
        })
    };
    function modifyVehicles(id: any, getData: any) {
        return (<ModifyVehicle id={id} getData={getData} />);
    }


    return (
        <ChakraProvider>
            <EventTable
                columns={columns}
                data={data}
                handleDeleteClick={handleDeleteClick}
                modify={modifyVehicles}
                getData={getVehicles} />
            <HStack spacing={'auto'} >
                <Box ml="3"><VehicleForm getVehicles={getVehicles} /> </Box>
            </HStack>
        </ChakraProvider>
    )
};