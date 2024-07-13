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
import { LuArchiveRestore } from 'react-icons/lu';
import { MdDeleteOutline } from 'react-icons/md';
import { FaEye } from 'react-icons/fa';
import { INote } from '@/interface/interface';
import ArchiveModal from '../ArchiveModal/ArchiveModal';
import { useState } from 'react';

interface Props {
  notes: INote[];
  onDeleteNote: (note: INote) => void;
  onRestoreNote: (note: INote) => void;
}

const ArchiveNotesGrid = ({ notes, onDeleteNote, onRestoreNote }: Props) => {
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
      mt='15px'
    >
      <ArchiveModal isOpen={isOpen} onClose={onClose} note={selectedNote} />

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
        );
      })}
    </SimpleGrid>
  );
};

export default ArchiveNotesGrid;
