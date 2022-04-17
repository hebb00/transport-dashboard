
import { ChakraProvider, Input, } from "@chakra-ui/react"
import 'regenerator-runtime/runtime'
import React, { useState } from 'react'
import { useAsyncDebounce, } from 'react-table'
// A great library for fuzzy filtering/sorting items
import matchSorter from 'match-sorter'

export type GlobalFilter = {
    filter: string;
    setFilter(v: string): void
};

export default function GlobalFilter({ filter, setFilter }: GlobalFilter) {
    const [value, setValue] = useState(filter)
    const onChange = useAsyncDebounce(value => {
        setFilter(value || undefined)
    }, 1000)

    return (
        <ChakraProvider>
            <span> search:{""}
                <Input
                    value={value || ''}
                    onChange={e => {
                        setValue(e.target.value);
                        onChange(e.target.value);
                    }}
                />
            </span>

        </ChakraProvider>

    );
}