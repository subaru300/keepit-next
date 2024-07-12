'use client';

import {
  ButtonGroup,
  Card,
  CardBody,
  Center,
  Divider,
  GridItem,
  Heading,
  IconButton,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
// import ModalWindow from '../Modal/ModalWindow';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { IoArchive } from 'react-icons/io5';
import { useAppSelector } from '@/lib/hooks';

const Archive = () => {
  const notesInArchive = useAppSelector(state => state.archive);

  return (
    <>
      {!notesInArchive.length && (
        <Center display='flex' flexDir='column'>
          <IoArchive size={48} />
          <Heading as='h6' fontSize='20px' mt='10px'>
            Archived notes will be stored here.
          </Heading>
        </Center>
      )}
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} gridGap='15px'>
        {/* <ModalWindow isOpen={isOpen} onClose={onClose} note={selectedNote} /> */}

        {notesInArchive.map(note => {
          return (
            <GridItem key={note.id}>
              <Card
                w='250px'
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
                    opacity='0'
                    _hover={{ opacity: 1 }}
                  >
                    <IconButton
                      aria-label='Edit note'
                      icon={<CiEdit />}
                      size='sm'
                      // onClick={() => onOpenCardHandler(note)}
                    />
                    <IconButton
                      aria-label='Delete note'
                      icon={<MdDeleteOutline />}
                      size='sm'
                      // onClick={() => onDeleteNote(note.id)}
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
    </>
  );
};

export default Archive;
