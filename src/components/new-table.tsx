import React from 'react'
import { useTable, usePagination, Column } from 'react-table'
import {
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
} from "@chakra-ui/react";


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


}
// Be sure to pass our updateMyData and The skipPageReset option
function EventTable({ columns, data, updateMyData, skipPageReset }: Ctype) {
    // For This example, we're using pagination to illusTrate how to stop
    // The current page from resetting when our data changes
    // OTherwise, noThing is different here.
    const {
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
        usePagination
    )

    // Render The UI for your table
    return (
        <>

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
                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>
            <div className="pagination">
                <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </Button>{' '}
                <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </Button>{' '}
                <Button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </Button>{' '}
                <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </Button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Go to page:{' '}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                        }}
                        style={{ width: '100px' }}
                    />
                </span>{' '}
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default EventTable;