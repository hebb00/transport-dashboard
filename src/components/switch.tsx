import React from 'react'
import { Switch as SwitchInput, FormControl, FormLabel, Box, Table, Tbody, Td, Tr } from '@chakra-ui/react'

export default function Switch() {
    return (
        <Box
            shadow={'xl'}
            p="9"
            m='9'
            h="70%"
            bg='white'>
            <FormControl >
                <Table>
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
