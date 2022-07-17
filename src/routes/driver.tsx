import React, { useEffect, useState } from "react";
import { Box, Flex, HStack } from "@chakra-ui/react"
import EventTable from "../components/table/new-table"
import { DriverForm } from "../components/drivers/driver-form"
import { getData } from "../components/drivers/driver-service";



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
        setData((old: any) =>
            old.map((row: any, index: any) => {
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
    const resetData = () => setData(originalData);

    const handleDeleteClick = (rowId: any) => {
        const newContacts = [...data];
        const index = data.findIndex((contact: any) => contact.id === rowId);
        newContacts.splice(index, 1);
        setData(newContacts);
    };
    return (
        <Flex flexDirection="column" >
            <Box >
                <EventTable
                    columns={columns}
                    data={data}
                    updateMyData={updateMyData}
                    skipPageReset={skipPageReset}
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