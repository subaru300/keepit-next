'use client';

import { useAppSelector } from '@/lib/hooks';
import { Center, Heading, Text } from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';

const Trash = () => {
  const trashedNotes = useAppSelector(state => state.trash);

  return (
    <>
      {!trashedNotes.length && (
        <Center display='flex' flexDir='column'>
          <FaTrash size={48} />
          <Heading as='h6' fontSize='20px' mt='10px'>
            There is nothing in the trash.
          </Heading>
          <Text fontStyle='italic' mt='50px'>
            Notes are deleted from the trash after 7 days.
          </Text>
        </Center>
      )}
    </>
  );
};

export default Trash;
