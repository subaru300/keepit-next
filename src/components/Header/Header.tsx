import { Flex, Heading } from '@chakra-ui/react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import Search from '../Search/Search';

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
