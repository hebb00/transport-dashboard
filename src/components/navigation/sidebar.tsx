import React, { useState } from 'react';
import { Flex, IconButton, Divider } from '@chakra-ui/react';
import {
    FiMenu,
    FiHome,
    FiCalendar,
    FiUser,
    FiDollarSign,
    FiBriefcase,
    FiTablet,
    FiSettings,
    FiUsers,
    FiPieChart,
    FiMapPin,
    FiHardDrive
} from 'react-icons/fi';
import NavItem from './nav-item';
import { useAuth } from '../../routes/login';

export default function Sidebar() {
    const [navSize, changeNavSize] = useState("large");
    const auth = useAuth();

    return (
        <>
            <Flex
                pos="sticky"
                left="5"
                h="120vh"
                boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
                borderRadius={navSize == "small" ? "15px" : "30px"}
                w={navSize == "small" ? "75px" : "200px"}
                flexDir="column"
                justifyContent="space-between" >
                <Flex
                    p="5%"
                    flexDir="column"
                    w="100%"
                    alignItems={navSize == "small" ? "center" : "flex-start"}
                    as="nav" >
                    <IconButton
                        background="none"
                        mt={2}
                        _hover={{ background: 'none' }}
                        icon={<FiMenu />}
                        onClick={() => {
                            if (navSize == "small")
                                changeNavSize("large")
                            else
                                changeNavSize("small")
                        }}
                        aria-label={'Toggle Navigation'} />
                    <NavItem navSize={navSize} icon={FiHome} title="Dashboard" description="This is the description for the dashboard." href="/dashboard" />
                    <NavItem navSize={navSize} icon={FiUsers} title="Clients" href="/clients" />
                    <NavItem navSize={navSize} icon={FiMapPin} title='Drivers' href="/drivers" />
                    <NavItem navSize={navSize} icon={FiHardDrive} title="Vehicles" href="/vehicle" />
                    <NavItem navSize={navSize} icon={FiCalendar} title="Reservations" href="/" />
                    {auth.user?.role == 'admin' ?
                        <NavItem navSize={navSize} icon={FiUser} title="Users" href="/users" />
                        : ""}
                </Flex>
            </Flex>
        </>
    )
}