import React, { useEffect, useState } from "react";
import { Box, Flex, HStack } from "@chakra-ui/react"
import EventTable from "../components/table/new-table"
import { DriverForm } from "../components/drivers/driver-form"
import { getData } from "../components/drivers/driver-service";
import ModifyDriver from "../components/drivers/ModifyDriver";



export default function Drivers() {

    const [data, setData] = useState<any>([{}])
    function getDriver() {
        getData("driver").then(async res => {
            if (res.status == 200) {
                const drivers = await res.json();
                setData(drivers)
                console.log(" drivers inside getDriver: ", drivers);
            } else {
                console.log(" error inside getDriver: ", res.status);
            }
        })
    }
    const columns = React.useMemo(
        () => [
            {
                Header: 'id',
                accessor: 'id',
                sortType: 'basic',
            },
            {
                Header: 'First Name',
                accessor: 'firstname',
                sortType: 'basic',
            },
            {
                Header: 'Last Name',
                accessor: 'lastname',
                sortType: 'basic',
            },
            {
                Header: 'Phone Number',
                accessor: 'phone_num',
                sortType: 'basic',
            },
            {
                Header: 'License Number',
                accessor: 'license_num',
                sortType: 'basic',
            },
            {
                Header: 'License Type',
                accessor: 'license_type',
                sortType: 'basic',
            },
            {
                Header: 'License Expire Date',
                accessor: 'license_exp_date',
                sortType: 'basic',
            },
        ],
        []
    )
    useEffect(() => {
        getData("driver").then(async res => {
            if (res.status == 200) {
                const drivers = await res.json();
                setData(drivers)
                console.log(" drivers: ", drivers);
            } else {
                console.log(" error ", res.status);

            }
        })

    }, [])
    const handleDeleteClick = (rowId: any) => {
        getData(`driver/${rowId}`).then(async res => {
            if (res.status == 200) {
                getDriver()
                console.log(" client inside handelDelete: ");
            } else {
                console.log(" error inside  handelDelete: ", res.status);
            }
        })
    };

    function modifyDriver(id: any, getData: any) {
        return (<ModifyDriver id={id} getData={getData} />);
    }

    return (
        <Flex flexDirection="column" >
            <Box >
                <EventTable
                    columns={columns}
                    data={data}
                    modify={modifyDriver}
                    getData={getDriver}
                    handleDeleteClick={handleDeleteClick} />
            </Box>
            <HStack spacing={'auto'} >
                <Box ml="3" >
                    <DriverForm data={data} getDriver={getDriver} />
                </Box>
            </HStack>
        </Flex>

    );
}