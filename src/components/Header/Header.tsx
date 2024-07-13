import Search from '../Search/Search';
import { Box, Flex, Heading } from '@chakra-ui/react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import Burger from '../Burger/Burger';

const Header = () => {
  return (
    <Flex
      w='100%'
      justifyContent='space-between'
      alignItems='center'
      gap={{ base: '5px', md: '20px' }}
    >
      <Box display={{ base: 'block', md: 'none' }}>
        <Burger />
      </Box>

      <Heading
        as='h2'
        fontSize={{ base: '18px', md: '24px' }}
        ml={{ md: '45px' }}
      >
        KeepIt
      </Heading>
      <Search />
      <ThemeToggle />
    </Flex>
  );
};

export default Header;
