import { SimpleGrid } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';

interface Props {
  children: React.ReactNode;
}

const NotesGrid = ({ children }: Props) => {
  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      gridGap={{ base: '10px', md: '15px' }}
      w={{ base: '100%', md: 'auto' }}
      mb='15px'
      mt='15px'
    >
      <AnimatePresence mode='popLayout'>{children}</AnimatePresence>
    </SimpleGrid>
  );
};

export default NotesGrid;
