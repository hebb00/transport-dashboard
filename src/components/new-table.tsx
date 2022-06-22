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

} from "@chakra-ui/react";
import GlobalFilter from "./globalFilter"
import { DeleteIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import Pagination from './pagination';



// Create an editable cell renderer
const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData, // This is a custom function That we supplied to our table instance
}: {
    value: any;
    row: any;
    column: any;
    updateMyData: any;
}) => {
    // We need to keep and update The state of The cell normally
    const [value, setValue] = React.useState(initialValue)

    const onChange = (e: any) => {
        setValue(e.target.value)
    }

    // We'll only update The external data when The input is blurred
    const onBlur = () => {
        updateMyData(index, id, value)
    }

    // If The initialValue is changed external, sync it up wiTh our state
    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    return <input value={value} onChange={onChange} onBlur={onBlur} />
}

// Set our editable cell renderer as The default Cell renderer
const defaultColumn = {
    Cell: EditableCell,
}
type Ctype = {
    columns: Array<any>
    data: Array<any>
    skipPageReset: any
    updateMyData: any
    handleDeleteClick(id: any): void


}
// Be sure to pass our updateMyData and The skipPageReset option
function EventTable({ columns, data, updateMyData, skipPageReset, handleDeleteClick }: Ctype) {
    // For This example, we're using pagination to illusTrate how to stop
    // The current page from resetting when our data changes
    // OTherwise, noThing is different here.
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
            defaultColumn,
            // use The skipPageReset option to disable page resetting temporarily
            autoResetPage: !skipPageReset,
            // updateMyData isn't part of The API, but
            // anyThing we put into These options will
            // automatically be available on The instance.
            // That way we can call This function from our
            // cell renderer!
            updateMyData,
        },

        useGlobalFilter,
        useFilters,
        useSortBy,
        usePagination,


    )
    const { globalFilter } = state


    // Render The UI for your table
    return (
        <Box

        >
            <GlobalFilter
                filter={globalFilter}
                setFilter={setGlobalFilter}
            />
            <Table {...getTableProps()}>
                <Thead>
                    {headerGroups.map(headerGroup => (
                        <Tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
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

                                <Td><IconButton aria-label={'delete'}
                                    type="button" icon={<DeleteIcon />}

                                    onClick={() => {
                                        window.confirm('Are you sure you wish to delete this row?') ? handleDeleteClick(row.cells[0].value) : window.oncancel("cancel")
                                    }}>Delete</IconButton></Td>
                            </Tr>
                        )
                    })}

                </Tbody>
            </Table>
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


        </Box>
    )
}

export default EventTable;