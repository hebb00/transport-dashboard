import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import { Link as RouteLink } from "react-router-dom";
import UserProfile from './profileList';
import { useAuth } from '../../routes/login';
import { useCookies } from 'react-cookie';



export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const [cookies, setCookie] = useCookies();

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          {cookies.user ?
            <Box  >
              <UserProfile />
            </Box> :
            <Button
              as={'a'}
              fontSize={'sm'}
              fontWeight={400}
              variant={'link'}
              href={'/login'}>
              Sign In
           </Button>
          }
          {/* } */}

          {/* <Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'pink.400'}
            href={'#'}
            _hover={{
              bg: 'pink.300',
            }}>
            Sign Up
          </Button> */}
        </Stack>
      </Flex>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                as={RouteLink}
                to={navItem.href ?? '#'}
                p={2}

                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}>
                {navItem.label}
              </Link>

            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                <Stack>
                  {/* {navItem.children.map((child) => ( */}

                  {/* ))}  */}

                </Stack>
              </PopoverContent>
              //key={child.label} {...child}
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};
// { label, href, subLabel }: NavItem
// const DesktopSubNav = () => {
//   return (

// <Link
// to={href}
// role={'group'}
// display={'block'}
// p={2}
// rounded={'md'}
// _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
// <Stack direction={'row'} align={'center'}>


// <Box>
//   hello

// </Box>
/* <Flex
  transition={'all .3s ease'}
  transform={'translateX(-10px)'}
  opacity={0}
  _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
  justify={'flex-end'}
  align={'center'}
  flex={1}>
  <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />

</Flex> */
//   </Stack>
// </Link>
// );
// };

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  // {
  //   label: 'Inspiration',
  //   children: [
  //     {
  //       label: 'Explore Design Work',
  //       subLabel: 'Trending Design to inspire you',
  //       href: '/',
  //     },
  //     {
  //       label: 'New & Noteworthy',
  //       subLabel: 'Up-and-coming Designers',
  //       href: '#',
  //     },
  //   ],
  // },
  // {
  //   label: 'Find Work',
  //   children: [
  //     {
  //       label: 'Job Board',
  //       subLabel: 'Find your dream design job',
  //       href: '#',
  //     },
  //     {
  //       label: 'Freelance Projects',
  //       subLabel: 'An exclusive list for contract work',
  //       href: '#',
  //     },
  //   ],
  // }


  // {
  //   label: 'Profile',
  //   href: '/profile',
  // },
  // {
  //   label: 'Drivers',
  //   href: '/drivers',
  // },
  // {
  //   label: 'Vehicles',
  //   href: '/vehicle',
  // }, {
  //   label: 'Clients',
  //   href: '/cliesnts',
  // },
];























