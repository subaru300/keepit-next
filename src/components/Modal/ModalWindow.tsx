import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { editNote, removeData } from '@/lib/features/notes/notesSlice';
import {
  ButtonGroup,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { MdDeleteOutline } from 'react-icons/md';
import { IoIosSave } from 'react-icons/io';
import { addToTrash } from '@/lib/features/trash/trashSlice';
import { addToArchive } from '@/lib/features/archive/archiveSlice';
import { FormValues, INote } from '@/interface/interface';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  note: INote;
}

const ModalWindow = ({ isOpen, onClose, note }: Props) => {
  const [editedHeader, setEditedHeader] = useState('');
  const [editedText, setEditedText] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    setEditedHeader(note.title);
    setEditedText(note.text);
  }, [note]);

  const onSubmitHandler = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    setTimeout(() => {
      actions.setSubmitting(false);

      const editedNote = {
        id: note.id,
        date: String(new Date()),
        title: editedHeader,
        text: editedText,
        bgColor: !values.color ? note.bgColor : values.color,
        isInArchive: values.isInArchive,
      };

      if (!editedHeader && !editedText) {
        dispatch(removeData(note));
        onClose();
        return;
      }

      if (values.isInArchive === false) {
        dispatch(editNote(editedNote));
      } else {
        dispatch(addToArchive(note));
        dispatch(removeData(note));
      }
    }, 100);
    onClose();
  };

  const onHeadingChangeHandler = (text: string) => {
    setEditedHeader(text);
  };

  const onTextChangeHandler = (text: string) => {
    setEditedText(text);
  };

  const onDeleteNote = (note: INote) => {
    dispatch(removeData(note));
    dispatch(addToTrash(note));
    onClose();
  };

  return (
    <>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
      >
        <ModalOverlay />
        <ModalContent minH='350px'>
          <ModalHeader border='none'></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                heading: editedHeader,
                note: editedText,
                isInArchive: false,
              }}
              onSubmit={onSubmitHandler}
            >
              {props => (
                <Form>
                  <Field name='heading'>
                    {({ field, form }: { field: any; form: any }) => (
                      <FormControl>
                        <Text fontSize='12px' opacity='0.6' mb='5px'>
                          Edit heading:
                        </Text>
                        <Divider />
                        <Input
                          {...field}
                          fontWeight='bold'
                          focusBorderColor='transparent'
                          border='none'
                          value={editedHeader}
                          onChange={e => onHeadingChangeHandler(e.target.value)}
                          type='text'
                          mb='5px'
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field name='note'>
                    {({ field, form }: { field: any; form: any }) => (
                      <FormControl>
                        <Text fontSize='12px' opacity='0.6' mb='5px'>
                          Edit note:
                        </Text>
                        <Divider />
                        <Textarea
                          {...field}
                          value={editedText}
                          focusBorderColor='transparent'
                          border='none'
                          onChange={e => onTextChangeHandler(e.target.value)}
                          type='text'
                          mb='5px'
                          minH='150px'
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Divider />
                  <Flex justifyContent='space-around'>
                    <Field name='color'>
                      {({ field, form }: { field: any; form: any }) => (
                        <Flex alignItems='center'>
                          <Input
                            {...field}
                            value={note.bgColor}
                            type='color'
                            w='60px'
                            border='none'
                          />
                          <FormLabel fontSize='14px'>BG color</FormLabel>
                        </Flex>
                      )}
                    </Field>
                    <Field name='isInArchive'>
                      {({ field, form }: { field: any; form: any }) => (
                        <Flex alignItems='center'>
                          <Checkbox
                            {...field}
                            colorScheme='green'
                            isChecked={field.value}
                          >
                            Add to archive
                          </Checkbox>
                        </Flex>
                      )}
                    </Field>
                  </Flex>
                  <ModalFooter
                    display='flex'
                    flexDir='column'
                    alignItems='right'
                    p='5px'
                  >
                    <Text fontSize='10px' opacity='0.6' textAlign='right'>
                      Last changes {note?.date?.slice(0, 21)}
                    </Text>
                    <ButtonGroup ml='auto' mt='10px'>
                      <IconButton
                        aria-label='Delete note'
                        icon={<MdDeleteOutline />}
                        size='md'
                        colorScheme='red'
                        onClick={() => onDeleteNote(note)}
                      />
                      <IconButton
                        type='submit'
                        aria-label='Save note'
                        icon={<IoIosSave />}
                        size='md'
                        colorScheme='green'
                      />
                    </ButtonGroup>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalWindow;
