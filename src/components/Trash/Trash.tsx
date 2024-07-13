'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Button, Center, Flex, Heading, Text } from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import TrashNotesGrid from '../TrashNotesGrid/TrashNotesGrid';
import { IoTrashBin } from 'react-icons/io5';
import { INote } from '@/interface/interface';
import { clearTrash, removeFromTrash } from '@/lib/features/trash/trashSlice';

const Trash = () => {
  const trashedNotes = useAppSelector(state => state.trash);
  const dispatch = useAppDispatch();

  const onRestoreNoteHandler = (note: INote) => {};

  const onDeleteNoteHandler = (note: INote) => {
    dispatch(removeFromTrash(note));
  };

  const onClearTrashHandler = () => {
    dispatch(clearTrash('clear'));
  };

  return (
    <Flex flexDir='column'>
      {trashedNotes.length === 0 && (
        <Center display='flex' flexDir='column'>
          <FaTrash size={48} />
          <Heading as='h6' fontSize='20px' mt='10px'>
            There is nothing in the trash.
          </Heading>
        </Center>
      )}

      {trashedNotes.length > 0 && (
        <Center display='flex' flexDir='column'>
          <Heading as='h6' fontSize='20px' mt='10px'>
            Trash
          </Heading>
          <Text fontStyle='italic'>
            Notes are deleted from the trash after 7 days.
          </Text>
          <Button
            leftIcon={<IoTrashBin />}
            colorScheme='pink'
            variant='link'
            onClick={onClearTrashHandler}
          >
            Clear trash
          </Button>
        </Center>
      )}

      <TrashNotesGrid
        notes={trashedNotes}
        onRestoreNote={onRestoreNoteHandler}
        onDeleteNote={onDeleteNoteHandler}
      />
    </Flex>
  );
};

export default Trash;
