import React from 'react';
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
import { Box, Flex, SimpleGrid, HStack, VStack } from '@chakra-ui/react';
import BasicStatistics from "../components/card"
import { ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ProgressTable from "../components/table/progressTable"
import {

    PointElement,
    LineElement,

} from 'chart.js';
import { Line } from 'react-chartjs-2';


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

export const d = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
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
    return (
        // <SimpleGrid
        //     h="100%"
        //     w="100%"
        //     bg='gray.50'
        //     spacing='30'
        //     p='5'
        //     textAlign='center'
        //     rounded='lg'
        //     color='gray.400'
        //     column='3'

        // >
        <Flex

            direction="column"
            h="100%"
            w="100%"
            bg='gray.50'

            textAlign='center'
            rounded='lg'
            color='gray.400'
        >

            <HStack

                align="center"
                mt={7}

            >
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
            <Box mt={5} w="100%">

                <BasicStatistics />

            </Box>
            <HStack
                mt='6'
                h="90%"

            >

                <Box
                    width='30%' h="90%"
                    p={5}
                    bg='white'
                    mx={5}
                    shadow={'xl'}

                >


                    <Pie data={d} />

                </Box>
                <Box
                    shadow={'xl'}
                    width='65%' h="83%"
                    mx='5'
                    p={5}
                    bg='white'>
                    <ProgressTable></ProgressTable>
                </Box>
            </HStack>


        </Flex>



        // {/* <Box width="50%"
        //         m='2'
        //         h="30%" bg='white'>
        //     </Box> */}





    )

}
