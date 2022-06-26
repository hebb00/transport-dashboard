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
} from '@chakra-ui/react'
import { Progress } from '@chakra-ui/react'


export default function progressTable() {
    return (
        <TableContainer>
            <Table variant='simple'>
                <TableCaption>Imperial to metric conversion factors</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Clients</Th>
                        <Th>Reservations</Th>
                        <Th >progress</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>
                            <Avatar name='Christian Nwamba' src='https://bit.ly/code-beast' />
                        </Td>
                        <Td>4</Td>
                        <Td ><Progress hasStripe value={80} /></Td>
                    </Tr>
                    <Tr>
                        <Td>
                            <Avatar name='Ryan Florence' src='https://bit.ly/ryan-florence' />
                        </Td>
                        <Td>3</Td>
                        <Td ><Progress hasStripe value={30} colorScheme='pink' /></Td>
                    </Tr>
                    <Tr>
                        <Td>
                            <Avatar name='Prosper Otemuyiwa' src='https://bit.ly/prosper-baba' />
                        </Td>
                        <Td>6</Td>
                        <Td ><Progress hasStripe value={60} /></Td>
                    </Tr>
                </Tbody>

            </Table>
        </TableContainer>
    )
}
