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
import { filterProps } from 'framer-motion/types/render/dom/utils/filter-props';
import { ReactNode } from 'react';
import { FcAssistant, FcBusinesswoman, FcInTransit, FcBusinessman } from 'react-icons/fc';


interface StatsCardProps {
    title: string;
    stat: string;
    icon: ReactNode;
    per: any;
}
function StatsCard(props: any) {
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


export default function BasicStatistics({ driver, vehicle, client }: any) {
    return (
        <Box maxW="7xl" mx={'auto'} pt={12} px={{ base: 2, sm: 12, md: 17 }}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
                <StatsCard
                    title={'Drivers'}
                    stat={driver}
                    per={20}
                    icon={<FcBusinessman size={'3em'} />}
                />
                <StatsCard
                    title={'Clients'}
                    stat={client}
                    per={60}
                    icon={<FcBusinesswoman size={'3em'} />}
                />
                <StatsCard
                    title={'Vehicles'}
                    stat={vehicle}
                    per={30}
                    icon={< FcInTransit size={'3em'} />}
                />
            </SimpleGrid>
        </Box>
    );
}
