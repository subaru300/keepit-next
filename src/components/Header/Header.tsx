import Search from '../Search/Search';
import { Flex, Heading } from '@chakra-ui/react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const Header = () => {
  return (
    <Flex
      w='100%'
      justifyContent='space-between'
      alignItems='center'
      gap='20px'
    >
      <Heading as='h2'>KeepIt</Heading>
      <Search />
      <ThemeToggle />
    </Flex>
  );
};

export default Header;
