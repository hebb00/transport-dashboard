import {
    Box,
    chakra,
    Flex,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
    StatHelpText,
    StatArrow,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

import { FcAssistant, FcDonate, FcInTransit } from 'react-icons/fc';
interface StatsCardProps {
    title: string;
    stat: string;
    icon: ReactNode;
    per: any;
}
function StatsCard(props: StatsCardProps) {
    const { title, stat, icon, per } = props;
    return (
        <Stat

            px={{ base: 2, md: 4 }}
            py={'4'}
            shadow={'xl'}

            borderColor={useColorModeValue('gray.800', 'gray.500')}
            rounded={'lg'}>
            <Flex justifyContent={'space-between'}>
                <Box pl={{ base: 2, md: 4 }}>
                    <StatLabel fontWeight={'medium'} isTruncated>
                        {title}
                    </StatLabel>
                    <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                        {stat}
                    </StatNumber>
                    <StatHelpText>
                        <StatArrow type='increase' />
                        {per}%
                    </StatHelpText>
                </Box>
                <Box
                    my={'auto'}
                    color={useColorModeValue('gray.800', 'gray.200')}
                    alignContent={'center'}>
                    {icon}
                </Box>
            </Flex>
        </Stat>
    );
}

export default function BasicStatistics() {
    return (
        <Box maxW="7xl" mx={'auto'} pt={12} px={{ base: 2, sm: 12, md: 17 }}>
            {/* <chakra.h1
          textAlign={'center'}
          fontSize={'4xl'}
          py={10}
          fontWeight={'bold'}>
          Our company is expanding, you could be too.
        </chakra.h1> */}
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
                <StatsCard
                    title={'Users'}
                    stat={'5,000'}
                    per={30}
                    icon={<FcAssistant size={'3em'} />}
                />
                <StatsCard
                    title={'Servers'}
                    stat={'1,000'}
                    per={60}

                    icon={<FcDonate size={'3em'} />}
                />
                <StatsCard
                    title={'Datacenters'}
                    stat={'7'}
                    per={90}

                    icon={< FcInTransit size={'3em'} />}
                />
            </SimpleGrid>
        </Box>
    );
}
