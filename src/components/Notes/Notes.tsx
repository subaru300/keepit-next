'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import useCustomToast from '@/hooks/useToast';
import InputBlock from '../InputBlock/InputBlock';
import {
  Box,
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
  useDisclosure,
} from '@chakra-ui/react';
import { removeNote, sortNotes } from '@/lib/features/notes/notesSlice';
import ModalWindow from '../NotesModal/ModalWindow';
import CustomSelect from '../UI/CustomSelect/CusromSelect';
import { selectFilteredNotes } from '@/lib/features/search/searchSelector';
import { ImFileEmpty } from 'react-icons/im';
import { addToTrash } from '@/lib/features/trash/trashSlice';
import NotesGrid from '../NotesGrid/NotesGrid';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { INote } from '@/interface/interface';
import { motion } from 'framer-motion';

const Notes = () => {
  const [isBlockVisible, setIsBlockVisible] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const notes = useAppSelector(selectFilteredNotes);
  const [selectedNote, setSelectedNote] = useState<INote>({
    id: '',
    date: '',
    title: '',
    text: '',
    bgColor: '',
    isInArchive: false,
  });
  const dispatch = useAppDispatch();
  const { showSuccessToast } = useCustomToast();

  const onDeleteNote = (note: INote) => {
    dispatch(removeNote(note));
    dispatch(addToTrash(note));
    showSuccessToast('The note has been moved to the trash.');
  };

  const onSortHandler = (value: string) => {
    dispatch(sortNotes(value));
  };

  const onOpenCardHandler = (note: INote) => {
    onOpen();
    setSelectedNote(note);
  };

  return (
    <Flex
      flexDir='column'
      justifyContent='center'
      alignItems='center'
      mb='auto'
      w='95%'
    >
      <ModalWindow isOpen={isOpen} onClose={onClose} note={selectedNote} />

      <Box w={{ base: '100%', md: '50%' }} mb='10px'>
        {isBlockVisible ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <InputBlock onCancel={() => setIsBlockVisible(false)} />
          </motion.div>
        ) : (
          <Button onClick={() => setIsBlockVisible(true)} w='100%'>
            Create note
          </Button>
        )}
      </Box>

      <CustomSelect notes={notes} onSortHandler={onSortHandler} />

      {notes.length ? (
        <NotesGrid>
          {notes.map(note => {
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
                    cursor='pointer'
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
                          aria-label='Edit note'
                          icon={<CiEdit />}
                          size='sm'
                          onClick={() => onOpenCardHandler(note)}
                        />
                        <IconButton
                          aria-label='Delete note'
                          icon={<MdDeleteOutline />}
                          size='sm'
                          onClick={() => onDeleteNote(note)}
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
      ) : (
        <Center display='flex' flexDir='column'>
          <ImFileEmpty size={48} />
          <Heading
            as='h6'
            fontSize={{ base: '12px', sm: '18px', md: '20px' }}
            mt='10px'
          >
            Notes list is empty now. Please create your first one.
          </Heading>
        </Center>
      )}
    </Flex>
  );
};

export default Notes;
