import { DataTable } from "../components/DataTable";
import React, { useState } from "react";
import { Column } from "react-table";
import { Button, ChakraProvider, FormControl, Input } from "@chakra-ui/react"
import { DriverForm } from "../components/driver-form"
import d from "../mock-data.json"
const serverData = d;
import { nanoid } from "nanoid";
import { useForm } from 'react-hook-form';

export default function Drivers() {
    type FormInputs = {
        fullName: string;
        phoneNumber: string;
        email: string;
    };
    const { handleSubmit: createHandleSubmit, register } = useForm<FormInputs>(
        {
            defaultValues: {
                fullName: "",
                phoneNumber: "",
                email: "",
            }
        }
    )
    const handleSubmit = createHandleSubmit(values => {
        const newContact: any = {
            id: nanoid(),
            fullName: values.fullName,
            phoneNumber: values.phoneNumber,
            email: values.email,
        };
        console.log(values, "valuees")

        const newContacts = [...data, newContact];
        setData(newContacts);
        console.log(data, "ddd");


    });
    const columns: Column[] = [
        {
            Header: "id",
            accessor: "id",
        },

        {
            Header: "Name",
            accessor: "fullName",
        },

        {
            Header: "email",
            accessor: "email",
        },
        {
            Header: "phone Number",
            accessor: "phoneNumber",
            isNumeric: true,
        },
    ];
    const [data, setData] = React.useState([{
        fullName: "",
        phoneNumber: "",
        email: "",
    }

    ])
    const [editContactId, setEditContactId] = useState(null);
    const [addFormData, setAddFormData] = useState({
        fullName: "",
        phoneNumber: "",
        email: "",
    });


    const [loading, setLoading] = React.useState(false)
    const [pageCount, setPageCount] = React.useState(0)
    const fetchIdRef = React.useRef(0)

    const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
        // This will get called when the table needs new data
        // You could fetch your data from literally anywhere,
        // even a server. But for this example, we'll just fake it.

        // Give this fetch an ID
        const fetchId = ++fetchIdRef.current

        // Set the loading state
        setLoading(true)

        // We'll even set a delay to simulate a server here
        setTimeout(() => {
            // Only update the data if this is the latest fetch
            if (fetchId === fetchIdRef.current) {
                const startRow = pageSize * pageIndex
                const endRow = startRow + pageSize
                setData(serverData.slice(startRow, endRow))

                // Your server could send back total page count.
                // For now we'll just fake it, too
                setPageCount(Math.ceil(serverData.length / pageSize))

                setLoading(false)
            }
        }, 1000)
    }, [])

    const [filter, setFilter] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;
        setFilter(value);
    };
    const [originalData] = React.useState(data)
    const [skipPageReset, setSkipPageReset] = React.useState(false)
    const updateMyData = (rowIndex: number, columnId: any, value: string) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true)

        React.useEffect(() => {
            setSkipPageReset(false)
        }, [data])

        // Let's add a data resetter/randomizer to help
        // illustrate that flow...
    }
    console.log(data, "ur data")
    return (
        <ChakraProvider>
            <DataTable
                columns={columns}
                data={data}
                updateMyData={updateMyData}
                skipPageReset={skipPageReset}
                fetchData={fetchData}
                loading={loading}
                pageCount={pageCount}

            />
            {/* <DriverForm {...serverData} /> */}
            <form onSubmit={handleSubmit}>
                <FormControl>
                    <Input placeholder="name" type="text" {...register("fullName")} />
                    <Input placeholder="phone number" type="text" {...register('phoneNumber')} />
                    <Input placeholder="email" type="text"  {...register("email")} />
                    <Button colorScheme="teal" type='submit'>add</Button>

                </FormControl>
            </form>



        </ChakraProvider>


    );
}