'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import InputBlock from '../InputBlock/InputBlock';
import { Box, Button, Center, Flex, Heading } from '@chakra-ui/react';
import { removeNote, sortNotes } from '@/lib/features/notes/notesSlice';
import CustomSelect from '../UI/CustomSelect/CusromSelect';
import { selectFilteredNotes } from '@/lib/features/search/searchSelector';
import NotesGrid from '../NotesGrid/NotesGrid';
import { ImFileEmpty } from 'react-icons/im';
import { addToTrash } from '@/lib/features/trash/trashSlice';
import { INote } from '@/interface/interface';

const Notes = () => {
  const [isBlockVisible, setIsBlockVisible] = useState(false);
  const notes = useAppSelector(selectFilteredNotes);
  const dispatch = useAppDispatch();

  console.log(notes);

  const onDeleteNote = (note: INote) => {
    dispatch(removeNote(note));
    dispatch(addToTrash(note));
  };

  const onSortHandler = (value: string) => {
    dispatch(sortNotes(value));
  };

  return (
    <Flex
      flexDir='column'
      justifyContent='center'
      alignItems='center'
      mb='auto'
      w='100%'
    >
      <Box w='50%' mb='10px'>
        {isBlockVisible ? (
          <InputBlock onCancel={() => setIsBlockVisible(false)} />
        ) : (
          <Button onClick={() => setIsBlockVisible(true)} w='100%'>
            Create note
          </Button>
        )}
      </Box>

      <CustomSelect notes={notes} onSortHandler={onSortHandler} />
      {notes.length ? (
        <NotesGrid notes={notes} onDeleteNote={onDeleteNote} />
      ) : (
        <Center display='flex' flexDir='column'>
          <ImFileEmpty size={48} />
          <Heading as='h6' fontSize='20px' mt='10px'>
            Notes list is empty now. Please create your first one.
          </Heading>
        </Center>
      )}
    </Flex>
  );
};

export default Notes;
