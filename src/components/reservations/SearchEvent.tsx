import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { GridComponent } from '@syncfusion/ej2-react-grids';
import {
    Input,
    Button,
    Text,
    Table,
    Tbody,
    Tr,
    Box,
    Td,
} from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react'

function SearchEvent({ globalSearch, searchOnclick, clearOnClick }: any) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Box flex="1">
            <Button w="100%" onClick={onOpen}>Search</Button>


            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Search Reservations</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className='col-lg-3 property-section property-customization'>
                            <div className="property-panel-section">
                                <Text className="property-panel-header header-customization" style={{ width: '100%' }}>Search by all reservation fields</Text>
                                <div className="property-panel-content">
                                    <Input className="e-input" type="text" placeholder="Enter the Search text" onKeyUp={globalSearch} />
                                </div>
                                <form className="event-search" id="form-search">
                                    <Text className="property-panel-header header-customization" style={{ width: '100%' }}>Search by specific reservation fields</Text>
                                    <Table id="property-specific" style={{ width: '100%' }}>
                                        <Tbody>
                                            <Tr className="row">
                                                <Td className="property-panel-content" colSpan={2}>
                                                    <Input type="text" className="e-input search-field" id="searchEventName" data-name="Subject" placeholder="Subject" />
                                                </Td>
                                            </Tr>
                                            <Tr className="row" style={{ height: '45px' }}>
                                                <Td className="property-panel-content" colSpan={2}>
                                                    <Input type="text" className="e-input search-field" id="searchEventLocation" data-name="Location"
                                                        placeholder="Location" />
                                                </Td>
                                            </Tr>
                                            <Tr className="row" style={{ height: '45px' }}>
                                                <Td className="property-panel-content" colSpan={2}>
                                                    <DatePickerComponent className="search-field e-start-time" value={null} data-name="StartTime" showClearButton={false}
                                                        placeholder="Start Time"></DatePickerComponent>
                                                </Td>
                                            </Tr>
                                            <Tr className="row" style={{ height: '45px' }}>
                                                <Td className="property-panel-content" colSpan={2}>
                                                    <DatePickerComponent className="search-field e-end-time" value={null} data-name="EndTime" showClearButton={false}
                                                        placeholder="End Time"></DatePickerComponent>
                                                </Td>
                                            </Tr>
                                            <Tr className="row" style={{ height: '45px' }}>
                                                <Td className="e-field button-customization" style={{ width: '50%', padding: '15px' }}>
                                                    <Button title='Search' type='button' onClick={searchOnclick}>Search</Button>
                                                </Td>
                                                <Td className="e-field button-customization" style={{ width: '50%', padding: '15px' }}>
                                                    <Button title='Clear' type='button' onClick={clearOnClick}>Clear</Button>

                                                </Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                </form>
                            </div>
                        </div>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                       </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>

    )

}
export default SearchEvent