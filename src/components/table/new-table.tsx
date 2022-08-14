import React from 'react'
import { useTable, usePagination, useGlobalFilter, useFilters, useSortBy } from 'react-table'
import {
    IconButton,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Box,
    TableCaption,
    TableContainer,
    HStack,
    Text,
} from "@chakra-ui/react";
import GlobalFilter from "./globalFilter"
import { DeleteIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import Pagination from './pagination';
import { CSVLink, CSVDownload } from "react-csv";
import { ExternalLinkIcon } from '@chakra-ui/icons'


type Ctype = {
    columns: Array<any>
    data: Array<any>
    handleDeleteClick(id: any): void
    modify(id: any, getData: any): any
    getData(): any
}
function EventTable({ columns, data, handleDeleteClick, modify, getData }: Ctype) {

    const initialState = { hiddenColumns: ['id', 'Id'] };
    const {
        state,
        setGlobalFilter,
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState,
        },
        useGlobalFilter,
        useFilters,
        useSortBy,
        usePagination,

    )
    const { globalFilter } = state

    return (
        <Box m="19px" >
            <HStack
                justifyContent="space-between"  >
                <GlobalFilter
                    filter={globalFilter}
                    setFilter={setGlobalFilter} />
                <CSVLink data={data}><Text color="teal">Export to csv <ExternalLinkIcon mx='2px' /> </Text></CSVLink>
            </HStack>
            <TableContainer m="10px">
                <Table variant='striped' colorScheme={"blackAlpha"} size="sm"{...getTableProps()}>
                    <TableCaption>
                        <HStack>
                            <div className="pagination">
                                <Pagination
                                    nextPage={nextPage}
                                    setPageSize={setPageSize}
                                    pageIndex={pageIndex}
                                    gotoPage={gotoPage}
                                    canPreviousPage={canPreviousPage}
                                    previousPage={previousPage}
                                    canNextPage={canNextPage}
                                    pageCount={pageCount}
                                    pageOptions={pageOptions}
                                    pageSize={pageSize}
                                ></Pagination>
                            </div>
                        </HStack>
                    </TableCaption>
                    <Thead>
                        {headerGroups.map(headerGroup => (
                            <Tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <Th  {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        {column.isSorted ? (
                                            column.isSortedDesc ? (
                                                <ChevronDownIcon ml={1} w={4} h={4} />
                                            ) : (
                                                    <ChevronUpIcon ml={1} w={4} h={4} />
                                                )
                                        ) : (
                                                ""
                                            )}
                                    </Th>))}
                                <Th >
                                    Actions
                                </Th>
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row)
                            return (
                                <Tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                                    })}
                                    <Td><IconButton m="1" aria-label={'delete'} type="button" color="tomato"
                                        icon={<DeleteIcon />}
                                        onClick={() => {
                                            window.confirm('Are you sure you wish to delete this row?') ? handleDeleteClick(row.allCells[0].value) : window.oncancel("cancel")
                                        }}>Delete</IconButton>
                                        {modify(row.allCells[0].value, getData)}
                                    </Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box >
    )
}

export default EventTable;