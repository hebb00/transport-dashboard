import React, { useMemo, useState, useEffect } from "react";
import { Box, Flex, HStack } from "@chakra-ui/react"
import EventTable from "../components/table/new-table"
import { getData } from "../components/users/user-service"
import Register from "./Register";
import ModifyUser from "../components/users/ModifyUser";


export default function Users() {
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
                Header: 'username',
                accessor: 'username',
            },
            {
                Header: 'phone number',
                accessor: 'phone_num',
            },
            {
                Header: 'role',
                accessor: 'role',
            },
        ],

        []
    );
    const [data, setData] = useState<any>([{}])
    console.log(data, "users data ")
    function getUser() {
        getData("user").then(async res => {
            if (res.status == 200) {
                const user = await res.json();
                setData(user)
                console.log(" user : ", user);
            } else {
                console.log(" error inside users: ", res.status);

            }
        })

    }

    useEffect(() => {
        getData("user").then(async res => {
            if (res.status == 200) {
                const user = await res.json();
                setData(user)
                console.log(" user : ", user);
            } else {
                console.log(" error inside users: ", res.status);

            }
        })

    }, [])
    const handleDeleteClick = (rowId: any) => {
        getData(`user/${rowId}`).then(async res => {
            if (res.status == 200) {
                getUser()
                console.log(" user inside handelDelete: ");
            } else {
                console.log(" error inside  handelDelete: ", res.status);
            }
        })
    };

    function modifyUser(id: any, getData: any) {
        return (<ModifyUser id={id} getData={getData} />);
    }

    return (
        <Flex flexDirection="column" >
            <Box >
                <EventTable
                    columns={columns}
                    data={data}
                    handleDeleteClick={handleDeleteClick}
                    modify={modifyUser}
                    getData={getUser} />
            </Box>
            <HStack spacing={'auto'}><Box ml="3"><Register getUser={getUser} /></Box></HStack>
        </Flex>
    );
}