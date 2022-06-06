import React from "react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    chakra
} from "@chakra-ui/react";
import {
    TriangleDownIcon,
    TriangleUpIcon
} from "@chakra-ui/icons";
import {
    useTable,
    Column,
    useSortBy,
    useFilters, useGlobalFilter, IdType, Row,
    usePagination
} from 'react-table'
import GlobalFilter from "./globalFilter"
// const yourfunc = ({destructuredProps}: {destructuredProps: type}) => {}
type EditableCellInfo = {
    value: any,
    row: any
    column: any,
    updateMyData: any
};

// Create an editable cell renderer
const EditableCell = (options: EditableCellInfo) => {
    const {
        value: initialValue,
        row: { index },
        column: { id },
        updateMyData, // This is a custom function that we supplied to our table instance
    } = options;

    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue)

    const onChange = (e: any) => {
        setValue(e.target.value)
    }

    // We'll only update the external data when the input is blurred
    const onBlur = () => {
        updateMyData(index, id, value)
    }

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    return <input value={value} onChange={onChange} onBlur={onBlur} />
}


// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
    Cell: EditableCell,
}


export type DataTableProps<Data extends object> = {
    data: Data[];
    columns: Column<Data>[];
    updateMyData: any;
    skipPageReset: any;
    pageCount: any;
    fetchData: any;
    loading: any;

};


export function DataTable<Data extends object>({
    pageCount: controlledPageCount,
    data,
    columns,
    updateMyData,
    skipPageReset,
    fetchData,
    loading,

}: DataTableProps<Data>): React.ReactElement {


    const {

        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter,
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

    } = useTable<Data>(
        {
            columns,
            data,
            defaultColumn,
            // use the skipPageReset option to disable page resetting temporarily
            autoResetPage: !skipPageReset,
            initialState: { pageIndex: 0 }, // Pass our hoisted table state
            manualPagination: true,
            pageCount: controlledPageCount,
            // updateMyData isn't part of the API, but
            // anything we put into these options will
            // automatically be available on the instance.
            // That way we can call this function from our
            // cell renderer!
            updateMyData,
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination


    );
    const { globalFilter } = state
    React.useEffect(() => {
        fetchData({ pageIndex, pageSize })
    }, [fetchData, pageIndex, pageSize])
    return (
        <>
            {/* <pre>
                <code>
                    {JSON.stringify(
                        {
                            pageIndex,
                            pageSize,
                            pageCount,
                            canNextPage,
                            canPreviousPage,
                        },
                        null,
                        2
                    )}
                </code>
            </pre> */}
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <Table {...getTableProps()}>
                <Thead>
                    {headerGroups.map((headerGroup) => (
                        <Tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (

                                <Th
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                    )}

                                >
                                    {column.render("Header")}
                                    <chakra.span pl="4">
                                        {column.isSorted ? (
                                            column.isSortedDesc ? (
                                                <TriangleDownIcon aria-label="sorted descending" />
                                            ) : (
                                                    <TriangleUpIcon aria-label="sorted ascending" />
                                                )
                                        ) : null}
                                    </chakra.span>

                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {console.log(rows, "its rows")}
                    {rows.map((row) => {
                        prepareRow(row);
                        console.log(row.cells, "ur row")
                        return (
                            <Tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <Td
                                        {...cell.getCellProps()}
                                        isNumeric={cell.column.isNumeric}
                                    >
                                        {cell.render("Cell")}
                                    </Td>
                                ))}
                            </Tr>
                        );
                    })}
                    <tr>
                        {loading ? (
                            // Use our custom loading state to show a loading indicator
                            <td colSpan="10000">Loading...</td>
                        ) : (
                                <td colSpan="10000">
                                    Showing {page.length} of ~{controlledPageCount * pageSize}{' '}
                results
                                </td>
                            )}
                    </tr>
                </Tbody>
            </Table>
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
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
                    {[5, 10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>

        </>
    );
}
