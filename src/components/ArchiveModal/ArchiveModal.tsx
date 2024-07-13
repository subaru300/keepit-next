import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { INote } from '@/interface/interface';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  note: INote;
}

const ArchiveModal = ({ isOpen, onClose, note }: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset='slideInBottom'
    >
      <ModalOverlay />
      <ModalContent minH={{ base: '50%', md: '350px' }} w='98%'>
        <ModalHeader>{note.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflow='scroll' whiteSpace='pre-wrap'>
          {note.text}
        </ModalBody>
        <ModalFooter display='flex' flexDir='column' alignItems='right'>
          <Text textAlign='center' fontStyle='italic' opacity='0.6'>
            The archive is read-only. Restore the note for editing or delete it.
          </Text>
          <Text fontSize='10px' opacity='0.6' textAlign='right' mt='15px'>
            Last changes {note?.date?.slice(0, 21)}
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ArchiveModal;
