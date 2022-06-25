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
import ProgressTable from "../components/progressTable"
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
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
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
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};


export const dd = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
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
            >
                <Box


                    width="50%"
                    m='2'
                    h="70%"
                    bg='white'>

                    <Bar options={options} data={data} />

                </Box>
                <Box

                    width="50%"
                    m='3'
                    h="70%"
                    bg='white'>
                    <Line options={opt} data={dd} />
                </Box>


            </HStack>
            <Box mt={5}>

                <BasicStatistics />

            </Box>
            <HStack>

                <Box
                    width='30%' h="85%"
                    p={5}
                    mt='16'
                    bg='white'
                    mx={5}
                >


                    <Pie data={d} />

                </Box>
                <Box
                    width='60%' h="70%"
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
