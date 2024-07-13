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
} from '@chakra-ui/react';
import { MdDeleteOutline } from 'react-icons/md';
import { FaTrashRestore } from 'react-icons/fa';
import { INote } from '@/interface/interface';

interface Props {
  notes: INote[];
  onRestoreNote: (note: INote) => void;
  onDeleteNote: (note: INote) => void;
}

const TrashNotesGrid = ({ notes, onRestoreNote, onDeleteNote }: Props) => {
  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} gridGap='15px' mt='15px'>
      {notes.map(note => {
        return (
          <GridItem key={note.id}>
            <Card
              w='250px'
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
                  opacity='0'
                  _hover={{ opacity: 1 }}
                >
                  <IconButton
                    aria-label='Restore note'
                    icon={<FaTrashRestore />}
                    size='sm'
                    cursor='pointer'
                    onClick={() => onRestoreNote(note)}
                  />
                  <IconButton
                    aria-label='Delete note'
                    icon={<MdDeleteOutline />}
                    size='sm'
                    cursor='pointer'
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

export default TrashNotesGrid;
