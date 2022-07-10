import React from 'react'
import { Switch as SwitchInput, FormControl, FormLabel, Box, Table, Tbody, Td, Tr, Th, Thead } from '@chakra-ui/react'

export default function Switch() {
    return (
        <Box
            shadow={'xl'}
            w="55%"
            p="9"
            m='9'
            h="80%"
            bg='white'>

            <FormControl >
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Notivication Setting </Th>

                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>
                                <FormLabel htmlFor='isChecked'>isChecked:</FormLabel>
                            </Td>
                            <Td>
                                <SwitchInput id='isChecked' isChecked />

                            </Td>
                        </Tr>
                        <Tr>
                            <Td>
                                <FormLabel htmlFor='isDisabled'>isDisabled:</FormLabel>
                            </Td>
                            <Td>
                                <SwitchInput id='isDisabled' isDisabled defaultChecked />

                            </Td>
                        </Tr>
                        <Tr>
                            <Td>
                                <FormLabel htmlFor='isFocusable'>isFocusable:</FormLabel>

                            </Td>
                            <Td>
                                <SwitchInput id='isFocusable' isFocusable isDisabled />

                            </Td>
                        </Tr>
                        <Tr>
                            <Td>
                                <FormLabel htmlFor='isInvalid'>isInvalid:</FormLabel>

                            </Td>
                            <Td>
                                <SwitchInput id='isInvalid' isInvalid />

                            </Td>
                        </Tr>
                    </Tbody>
                </Table>

            </FormControl>
        </Box>
    )
}
