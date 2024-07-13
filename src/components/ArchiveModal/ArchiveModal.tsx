import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { INote } from '@/interface/interface';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  note: INote;
}

const ArchiveModal = ({ isOpen, onClose, note }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minH='400px'>
        <ModalHeader>{note.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflow='scroll' whiteSpace='pre-wrap'>
          {note.text}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ArchiveModal;
