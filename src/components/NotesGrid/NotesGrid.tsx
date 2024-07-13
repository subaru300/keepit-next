'use client';

import { useState } from 'react';
import ModalWindow from '../NotesModal/ModalWindow';
import {
  ButtonGroup,
  Card,
  CardBody,
  Divider,
  GridItem,
  Heading,
  IconButton,
  SimpleGrid,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { MdDeleteOutline } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { INote } from '@/interface/interface';

interface Props {
  notes: INote[];
  onDeleteNote: (note: INote) => void;
}

const NotesGrid = ({ notes, onDeleteNote }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedNote, setSelectedNote] = useState<INote>({
    id: '',
    date: '',
    title: '',
    text: '',
    bgColor: '',
    isInArchive: false,
  });

  const onOpenCardHandler = (note: INote) => {
    onOpen();
    setSelectedNote(note);
  };

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      gridGap={{ base: '10px', md: '15px' }}
      w={{ base: '100%', md: 'auto' }}
    >
      <ModalWindow isOpen={isOpen} onClose={onClose} note={selectedNote} />
      {notes.map(note => {
        return (
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
                <Divider />
                <Text fontSize='16px' whiteSpace='pre-wrap'>
                  {note.text}
                </Text>
              </CardBody>
            </Card>
          </GridItem>
        );
      })}
    </SimpleGrid>
  );
};

export default NotesGrid;
