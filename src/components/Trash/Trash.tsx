'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Button, Center, Flex, Heading, Text } from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import TrashNotesGrid from '../TrashNotesGrid/TrashNotesGrid';
import { IoTrashBin } from 'react-icons/io5';
import { INote } from '@/interface/interface';
import { clearTrash, removeFromTrash } from '@/lib/features/trash/trashSlice';
import useCustomToast from '@/hooks/useToast';
import { addNote } from '@/lib/features/notes/notesSlice';

const Trash = () => {
  const trashedNotes = useAppSelector(state => state.trash);
  const dispatch = useAppDispatch();
  const { showSuccessToast } = useCustomToast();

  const onRestoreNoteHandler = (note: INote) => {
    dispatch(addNote(note));
    dispatch(removeFromTrash(note));
    showSuccessToast('The note has been restored.');
  };

  const onDeleteNoteHandler = (note: INote) => {
    dispatch(removeFromTrash(note));
    showSuccessToast('The note has been permanently deleted.');
  };

  const onClearTrashHandler = () => {
    dispatch(clearTrash('clear'));
    showSuccessToast('Notes are permanently deleted.');
  };

  return (
    <Flex
      flexDir='column'
      w='95%'
      justifyContent='center'
      alignItems='center'
      mb='auto'
    >
      {trashedNotes.length === 0 && (
        <Center display='flex' flexDir='column'>
          <FaTrash size={48} />
          <Heading
            as='h6'
            fontSize={{ base: '12px', sm: '18px', md: '20px' }}
            mt='10px'
          >
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
            mt='15px'
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
