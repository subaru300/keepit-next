'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import InputBlock from '../InputBlock/InputBlock';
import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  GridItem,
  Heading,
  IconButton,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { MdDeleteOutline } from 'react-icons/md';
import { removeData, sortData } from '@/lib/features/notes/notesSlice';
import CustomSelect from '../UI/CustomSelect/CusromSelect';
import { selectFilteredNotes } from '@/lib/features/search/searchSelector';

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
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} gridGap='15px'>
        {notes.map(note => {
          return (
            <GridItem key={note.id}>
              <Card
                w='250px'
                h='auto'
                minHeight='150px'
                position='relative'
                cursor='pointer'
              >
                <CardBody bgColor={note.bgColor} borderRadius='6px'>
                  <IconButton
                    aria-label='Delete note'
                    icon={<MdDeleteOutline />}
                    size='sm'
                    position='absolute'
                    top='10px'
                    right='10px'
                    opacity='0'
                    _hover={{ opacity: 1 }}
                    onClick={() => onDeleteNote(note.id)}
                  />
                  <Heading as='h6' fontSize='20px'>
                    {note.title}
                  </Heading>
                  <Divider />
                  <Text fontSize='16px'>{note.text}</Text>
                </CardBody>
              </Card>
            </GridItem>
          );
        })}
      </SimpleGrid>
    </Flex>
  );
};

export default Main;
