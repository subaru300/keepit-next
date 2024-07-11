'use client';

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
import ModalWindow from '../Modal/ModalWindow';
import { useState } from 'react';

interface Props {
  notes: INote[];
  onDeleteNote: (id: string) => void;
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
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} gridGap='15px'>
      <ModalWindow isOpen={isOpen} onClose={onClose} note={selectedNote} />
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
                <ButtonGroup
                  position='absolute'
                  top='10px'
                  right='10px'
                  opacity='0'
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
                    onClick={() => onDeleteNote(note.id)}
                  />
                </ButtonGroup>

                <Heading as='h6' fontSize='20px' textAlign='center'>
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
  );
};

export default NotesGrid;
