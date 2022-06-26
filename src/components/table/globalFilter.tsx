
import { Box, ChakraProvider, Flex, Input, } from "@chakra-ui/react"
import 'regenerator-runtime/runtime'
import React, { useState } from 'react'
import { useAsyncDebounce, } from 'react-table'
// A great library for fuzzy filtering/sorting items

export type GlobalFilter = {
    filter: any;
    setFilter(v: string): void
};

export default function GlobalFilter({ filter, setFilter }: GlobalFilter) {
    const [value, setValue] = useState(filter)
    const onChange = useAsyncDebounce(value => {
        setFilter(value || undefined)
    }, 1000)

    return (
        <Flex>
            <Box w='70px' p="2">
                <span> search:{" "}
                </span>
            </Box>

            <Box w='300px'>
                <Input
                    value={value || ''}
                    placeholder="Search"
                    onChange={e => {
                        setValue(e.target.value);
                        onChange(e.target.value);
                    }}
                />
            </Box>
        </Flex>






    );
}