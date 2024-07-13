'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import ArchiveNotesGrid from '../ArchiveNotesGrid/ArchiveNotesGrid';
import { Center, Flex, Heading } from '@chakra-ui/react';
import { addToTrash } from '@/lib/features/trash/trashSlice';
import { addNote } from '@/lib/features/notes/notesSlice';
import { removeFromArchive } from '@/lib/features/archive/archiveSlice';
import { IoArchive } from 'react-icons/io5';
import { INote } from '@/interface/interface';

const Archive = () => {
  const notesInArchive = useAppSelector(state => state.archive);
  const dispatch = useAppDispatch();

  const onDeleteNote = (note: INote) => {
    const noteToDelete = { ...note, isInArchive: false };
    dispatch(addToTrash(noteToDelete));
    dispatch(removeFromArchive(note));
  };

  const onRestoreNote = (note: INote) => {
    const restoredNote = { ...note, isInArchive: false };
    dispatch(addNote(restoredNote));
    dispatch(removeFromArchive(note));
  };

  return (
    <Flex flexDir='column'>
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
          <Heading as='h6' fontSize='20px' mt='10px'>
            Archive
          </Heading>
        </Center>
      )}

      <ArchiveNotesGrid
        notes={notesInArchive}
        onDeleteNote={onDeleteNote}
        onRestoreNote={onRestoreNote}
      />
    </Flex>
  );
};

export default Archive;
