import React from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Avatar,
    AvatarGroup,
    Text,
} from '@chakra-ui/react'
import { Progress } from '@chakra-ui/react'


export default function progressTable() {
    return (
        <TableContainer>
            <Table variant='simple'>
                <TableCaption>Clients and their reservation progress</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Client Name</Th>
                        <Th>Reservations</Th>
                        <Th >progress</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>
                            <Text>Christian Nwamba</Text>
                            {/* <Avatar name='Christian Nwamba' src='https://bit.ly/code-beast' /> */}
                        </Td>
                        <Td>4</Td>
                        <Td ><Progress hasStripe value={80} /></Td>
                    </Tr>
                    <Tr>
                        <Td>
                            <Text>Ryan Florence</Text>
                            {/* <Avatar name='Ryan Florence' src='https://bit.ly/ryan-florence' /> */}
                        </Td>
                        <Td>3</Td>
                        <Td ><Progress hasStripe value={30} colorScheme='pink' /></Td>
                    </Tr>
                    <Tr>
                        <Td>
                            <Text>Prosper Otemuyiwa'</Text>
                            {/* <Avatar name='Prosper Otemuyiwa' src='https://bit.ly/prosper-baba' /> */}
                        </Td>
                        <Td>6</Td>
                        <Td ><Progress hasStripe value={60} /></Td>
                    </Tr>
                </Tbody>

            </Table>
        </TableContainer>
    )
}
