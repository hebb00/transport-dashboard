import React from 'react'
import { useTable, usePagination, Column, useGlobalFilter, useFilters } from 'react-table'
import {
    IconButton,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,

} from "@chakra-ui/react";
import GlobalFilter from "./globalFilter"
import { DeleteIcon } from '@chakra-ui/icons';
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
        preGlobalFilteredRows,
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
        usePagination,


    )
    const { globalFilter } = state


    // Render The UI for your table
    return (
        <>
            <GlobalFilter
                filter={globalFilter}
                setFilter={setGlobalFilter}
            />
            <Table {...getTableProps()}>
                <Thead>
                    {headerGroups.map(headerGroup => (
                        <Tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
                            ))}
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

                                    onClick={() => handleDeleteClick(row.cells[0].value)}>Delete</IconButton></Td>
                            </Tr>
                        )
                    })}

                </Tbody>
            </Table>
            <div className="pagination">
                <Pagination
                    nextPage={nextPage}
                    setPageSize={setPageSize}
                    page={page}
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


        </>
    )
}

export default EventTable;