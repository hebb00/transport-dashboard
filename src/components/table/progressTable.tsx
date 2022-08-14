import React from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import { Progress } from '@chakra-ui/react'


export default function progressTable({ books }: any) {
    return (
        <TableContainer>
            <Table>
                <TableCaption>Clients and their reservation progress</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Clients</Th>
                        <Th>Reservations</Th>
                        <Th >progress</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {Object.keys(books).map((key, index) => {
                        return (
                            <Tr key={key} >
                                <Td >{books[key].clientname}</Td>
                                <Td >{books[key].num_books}</Td>
                                <Td ><Progress hasStripe value={books[key].num_books} /></Td>
                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    )
}
