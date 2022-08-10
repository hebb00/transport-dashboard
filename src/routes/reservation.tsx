import EventTable from "../components/table/new-table"
import { Box, Flex, HStack, Link, Text } from "@chakra-ui/react"
import React, { useMemo, useState, useEffect } from "react";
import { Column } from "react-table";

import { ModifyBooking } from "../components/reservations/ModifyBooking"
import { getData } from "../components/reservations/reservation-service"
import BookingForm from "../components/reservations/BookingForm";


export default function Reservation() {
    const [data, setData] = useState<any>([{}])

    const columns = React.useMemo(
        () => [
            {
                Header: 'id',
                accessor: 'Id',
            },
            {
                Header: 'Clients',
                accessor: 'clientname',
                sortType: 'basic',
            },
            {
                Header: 'source',
                accessor: 'source',
                sortType: 'basic',
            },

            {
                Header: 'destination',
                accessor: 'Location',
                sortType: 'basic',
            },

            {
                Header: 'vehicles',
                accessor: 'plate_num',
                sortType: 'basic',

            },
            {
                Header: 'price',
                accessor: 'price',
                sortType: 'basic',

            },
            {
                Header: 'start Time',
                accessor: 'StartTime',
                sortType: 'basic',

            },
            {
                Header: 'end time',
                accessor: 'EndTime',
                sortType: 'basic',

            },
            {
                Header: 'Drivers',
                accessor: 'drivername',
                sortType: 'basic',

            },
        ],

        []
    )
    useEffect(() => {
        getData("reservation/table").then(async res => {
            if (res.status == 200) {
                const booking = await res.json();
                setData(booking)
                console.log(" bookings: ", booking);
            } else {
                console.log(" error ", res.status);

            }
        })

    }, [])
    function getReservation() {
        getData("reservation/table").then(async res => {
            if (res.status == 200) {
                const reservation = await res.json();
                setData(reservation)
                console.log(" drivers inside getDriver: ", reservation);
            } else {
                console.log(" error inside getDriver: ", res.status);
            }
        })
    }
    const handleDeleteClick = (rowId: any) => {
        getData(`delete-reservation/${rowId}`).then(async res => {
            if (res.status == 200) {
                getReservation()
                console.log(" client inside handelDelete: ");
            } else {
                console.log(" error inside  handelDelete: ", res.status);
            }
        })
    };
    function modifyBooking(id: any, getData: any) {
        return (<ModifyBooking id={id} getData={getData} />);
    }

    return (
        <>
            <EventTable
                columns={columns}
                data={data}
                handleDeleteClick={handleDeleteClick}
                modify={modifyBooking}
                getData={getReservation}
            />
            <HStack spacing={'auto'} >
                <Box ml="3" >
                    <BookingForm getReservation={getReservation} />
                </Box>
            </HStack>
        </>
    )
}
