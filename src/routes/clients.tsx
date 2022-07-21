import React, { useMemo, useState, useEffect } from "react";
import { Box, Flex, HStack } from "@chakra-ui/react"
import ClientForm from "../components/clients/ClientForm"
import EventTable from "../components/table/new-table"
import { getData } from "../components/clients/client-service"
import ModifyClient from "../components/clients/ModifyClient";
export default function Clients() {
    const columns = useMemo(
        () => [
            {
                Header: 'id',
                accessor: 'id',
            },
            {
                Header: 'first Name',
                accessor: 'firstname',
            },

            {
                Header: 'last Name',
                accessor: 'lastname',
            },
            {
                Header: 'phone number',
                accessor: 'phone_num',
            },
        ],

        []
    );
    const [data, setData] = useState<any>([{}])
    console.log(data, "clients data ")
    function getClient() {
        getData("client").then(async res => {
            if (res.status == 200) {
                const client = await res.json();
                setData(client)
                console.log(" client inside getClient: ", client);
            } else {
                console.log(" error inside getClient: ", res.status);

            }
        })

    }

    useEffect(() => {
        getData("client").then(async res => {
            if (res.status == 200) {
                const clients = await res.json();
                setData(clients)
                console.log(" client: ", clients);
            } else {
                console.log(" error ", res.status);

            }
        })

    }, [])
    const handleDeleteClick = (rowId: any) => {
        getData(`client/${rowId}`).then(async res => {
            if (res.status == 200) {
                getClient()
                console.log(" client inside handelDelete: ");
            } else {
                console.log(" error inside  handelDelete: ", res.status);
            }
        })
    };

    function modifyClient(id: any, getData: any) {
        return (<ModifyClient id={id} getData={getData} />);
    }


    return (
        <Flex flexDirection="column" >
            <Box >
                <EventTable
                    columns={columns}
                    data={data}
                    handleDeleteClick={handleDeleteClick}
                    modify={modifyClient}
                    getData={getClient} />
            </Box>
            <HStack spacing={'auto'}><Box ml="3"><ClientForm getClient={getClient} /></Box></HStack>
        </Flex>
    );
}