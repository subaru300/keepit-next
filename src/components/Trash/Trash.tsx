'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Center,
  Divider,
  Flex,
  GridItem,
  Heading,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { FaTrash, FaTrashRestore } from 'react-icons/fa';
import { IoTrashBin } from 'react-icons/io5';
import { INote } from '@/interface/interface';
import { clearTrash, removeFromTrash } from '@/lib/features/trash/trashSlice';
import useCustomToast from '@/hooks/useToast';
import { addNote } from '@/lib/features/notes/notesSlice';
import NotesGrid from '../NotesGrid/NotesGrid';
import { MdDeleteOutline } from 'react-icons/md';
import { motion } from 'framer-motion';

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
      <NotesGrid>
        {trashedNotes.map(note => {
          return (
            <motion.li
              layout
              key={note.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              style={{ listStyle: 'none' }}
            >
              <GridItem key={note.id} display='flex'>
                <Card
                  w={{ base: '100%', md: '250px' }}
                  maxH='200px'
                  minHeight='150px'
                  position='relative'
                  overflow='scroll'
                >
                  <CardBody bgColor={note.bgColor} borderRadius='6px'>
                    <ButtonGroup
                      position='absolute'
                      top='10px'
                      right='10px'
                      opacity={{ base: 1, md: '0' }}
                      _hover={{ opacity: 1 }}
                    >
                      <IconButton
                        aria-label='Restore note'
                        icon={<FaTrashRestore />}
                        size='sm'
                        cursor='pointer'
                        onClick={() => onRestoreNoteHandler(note)}
                      />
                      <IconButton
                        aria-label='Delete note'
                        icon={<MdDeleteOutline />}
                        size='sm'
                        cursor='pointer'
                        onClick={() => onDeleteNoteHandler(note)}
                      />
                    </ButtonGroup>

                    <Heading as='h6' fontSize='20px'>
                      {note.title}
                    </Heading>
                    {note.title && <Divider />}
                    <Text fontSize='16px' whiteSpace='pre-wrap'>
                      {note.text}
                    </Text>
                  </CardBody>
                </Card>
              </GridItem>
            </motion.li>
          );
        })}
      </NotesGrid>
    </Flex>
  );
};

export default Trash;
