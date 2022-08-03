import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';
import { Box, Flex, SimpleGrid, HStack, Text, VStack } from '@chakra-ui/react';
import BasicStatistics from "../components/card"
import { ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ProgressTable from "../components/table/progressTable"
import { PointElement, LineElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getData } from '../components/drivers/driver-service'
import { getData as getClients } from '../components/clients/client-service'
import { getData as getVehicles } from "../components/vehicles/vehicle-service"
import { getData as getBooks } from "../components/reservations/reservation-service"
import { getData as getReservations } from "../components/reservations/reservation-service"
import { InfoOutlineIcon } from '@chakra-ui/icons';
import dayjs from "dayjs"
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const opt = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};
const label = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
ChartJS.register(ArcElement, Tooltip, Legend);

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(79, 227, 193, 1)',
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(0, 88, 156, 1)',
        },
    ],
};

export const dd = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgba(79, 227, 193, 1)',
            backgroundColor: 'rgba(79, 227, 193, 1)',
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgba(0, 88, 156, 1)',
            backgroundColor: 'rgba(0, 88, 156, 1)',
        },
    ],
};


export function Dashboard() {
    const [drivers, setDrivers] = useState<any>({});
    const [clients, setClients] = useState<any>({});
    const [vehicles, setVehicles] = useState<any>({});
    const [reservations, setReservation] = useState<any>({});
    const [book, setBooks] = useState<any>({});

    useEffect(() => {
        getData("statistic").then(async res => {
            if (res.status == 200) {
                const driver = await res.json();
                setDrivers(driver)
                console.log(" drivers inside getDriver: ", driver);
            } else {
                console.log(" error inside getDriver: ", res.status);
            }
        })
    }, []);
    useEffect(() => {
        getClients("statistic").then(async res => {
            if (res.status == 200) {
                const client = await res.json();
                setClients(client)
                console.log(" clients inside getClients: ", client);
            } else {
                console.log(" error inside : ", res.status);
            }
        })
    }, []);
    useEffect(() => {
        getVehicles("statistic").then(async res => {
            if (res.status == 200) {
                const vehicle = await res.json();
                setVehicles(vehicle)
                console.log(" infooo: ", vehicle);
            } else {
                console.log(" error inside : ", res.status);
            }
        })
    }, []);
    useEffect(() => {
        getReservations("statistic").then(async res => {
            if (res.status == 200) {
                const reservation = await res.json();
                setReservation(reservation)
                console.log(" reservations number: ", reservation);
            } else {
                console.log(" error inside : ", res.status);
            }
        })
    }, []);
    useEffect(() => {
        getBooks("clients-reservation").then(async res => {
            if (res.status == 200) {
                const books = await res.json();
                setBooks(books)
                console.log(" books: ", books);
            } else {
                console.log(" error inside : ", res.status);
            }
        })
    }, []);
    var labels = [];
    var i = 0;
    for (var val of graph) {
        labels[i] = dayjs(val.day).format('DD/MM/YYYY');
        i++;
    }


    const d = {
        labels: ['clients', 'vehicles', 'drivers', 'reservations'],
        datasets: [
            {
                label: 'number of ',
                data: [`${clients.num}`, `${vehicles.num}`, `${drivers.num}`, `${reservations.num}`],
                backgroundColor: [
                    'rgba(79, 227, 193, 1)',
                    'rgba(0, 88, 156, 1)',
                    'rgba(60, 180, 178, 1)',
                    'rgba(48, 192, 218, 1)',
                    'rgba(24, 146, 195, 1)',
                    'rgba(0, 111, 200, 1)',
                ],
                borderColor: [
                    'rgba(79, 227, 193, 1)',
                    'rgba(0, 88, 156, 1)',
                    'rgba(60, 180, 178, 1)',
                    'rgba(48, 192, 218, 1)',
                    'rgba(24, 146, 195, 1)',
                    'rgba(0, 111, 200, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <Flex
            direction="column"
            h="100%"
            w="100%"
            bg='gray.50'
            textAlign='center'
            rounded='lg'
            color='gray.400'>
            <HStack align="center" mt={7} >
                <Box
                    shadow={'xl'}
                    width="50%"
                    m='5'
                    h="96%"
                    bg='white'>
                    <Bar options={options} data={data} />
                </Box>
                <Box
                    shadow={'xl'}
                    width="45%"
                    m='7'
                    h="96%"
                    bg='white'>
                    <Line options={opt} data={dd} />
                </Box>
            </HStack>
            <Box mt={5} w="100%"><BasicStatistics driver={drivers.num} vehicle={vehicles.num} client={clients.num} /> </Box>
            <HStack mt='6' h="90%"  >
                <Box
                    width='30%' h="90%"
                    p={5}
                    bg='white'
                    mx={5}
                    shadow={'xl'}  >
                    <Pie data={d} />
                </Box>
                <Box
                    shadow={'xl'}
                    width='65%' h="83%"
                    mx='5'
                    p={5}
                    bg='white'>
                    <ProgressTable books={book} ></ProgressTable>
                </Box>
            </HStack>
        </Flex>
    )
}
