'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
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
import { addToTrash } from '@/lib/features/trash/trashSlice';
import { addNote } from '@/lib/features/notes/notesSlice';
import { removeFromArchive } from '@/lib/features/archive/archiveSlice';
import { IoArchive } from 'react-icons/io5';
import { INote } from '@/interface/interface';
import useCustomToast from '@/hooks/useToast';
import NotesGrid from '../NotesGrid/NotesGrid';
import { FaEye } from 'react-icons/fa6';
import { MdDeleteOutline } from 'react-icons/md';
import { LuArchiveRestore } from 'react-icons/lu';
import ArchiveModal from '../ArchiveModal/ArchiveModal';
import { motion } from 'framer-motion';

const Archive = () => {
  const notesInArchive = useAppSelector(state => state.archive);
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    const noteToDelete = { ...note, isInArchive: false };
    dispatch(addToTrash(noteToDelete));
    dispatch(removeFromArchive(note));
    showSuccessToast('The note has been moved to the trash.');
  };

  const onRestoreNote = (note: INote) => {
    const restoredNote = { ...note, isInArchive: false };
    dispatch(addNote(restoredNote));
    dispatch(removeFromArchive(note));
    showSuccessToast('The note has been restored.');
  };

  const onOpenCardHandler = (note: INote) => {
    onOpen();
    setSelectedNote(note);
  };

  return (
    <Flex
      flexDir='column'
      w='95%'
      justifyContent='center'
      alignItems='center'
      mb='auto'
    >
      <ArchiveModal isOpen={isOpen} onClose={onClose} note={selectedNote} />

      {notesInArchive.length === 0 && (
        <Center display='flex' flexDir='column'>
          <IoArchive size={48} />
          <Heading as='h6' fontSize='20px' mt='10px'>
            Archived notes will be stored here.
          </Heading>
        </Center>
      )}

      {notesInArchive.length > 0 && (
        <Center>
          <Heading
            as='h6'
            fontSize={{ base: '12px', sm: '18px', md: '20px' }}
            mt='10px'
          >
            Archive
          </Heading>
        </Center>
      )}
      <NotesGrid>
        {notesInArchive.map(note => {
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
                        aria-label='View note'
                        icon={<FaEye />}
                        size='sm'
                        onClick={() => onOpenCardHandler(note)}
                      />
                      <IconButton
                        aria-label='Restore note'
                        icon={<LuArchiveRestore />}
                        size='sm'
                        onClick={() => onRestoreNote(note)}
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
    </Flex>
  );
};

export default Archive;
