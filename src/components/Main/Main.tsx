'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import InputBlock from '../InputBlock/InputBlock';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { removeData, sortData } from '@/lib/features/notes/notesSlice';
import CustomSelect from '../UI/CustomSelect/CusromSelect';
import { selectFilteredNotes } from '@/lib/features/search/searchSelector';
import NotesGrid from '../NotesGrid/NotesGrid';

const Main = () => {
  const [isBlockVisible, setIsBlockVisible] = useState(false);
  const notes = useAppSelector(selectFilteredNotes);
  const dispatch = useAppDispatch();

  const onDeleteNote = (id: string) => {
    dispatch(removeData(id));
  };

  const onSortHandler = (value: string) => {
    dispatch(sortData(value));
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
        <Heading as='h6' fontSize='20px'>
          Notes list is empty now. Please create your first one.
        </Heading>
      )}
    </Flex>
  );
};

export default Main;
