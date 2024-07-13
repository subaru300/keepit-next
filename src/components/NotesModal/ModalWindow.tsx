import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { editNote, removeNote } from '@/lib/features/notes/notesSlice';
import {
  ButtonGroup,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { MdDeleteOutline } from 'react-icons/md';
import { IoIosSave } from 'react-icons/io';
import { addToTrash } from '@/lib/features/trash/trashSlice';
import { addToArchive } from '@/lib/features/archive/archiveSlice';
import { FormValues, INote } from '@/interface/interface';
import useCustomToast from '@/hooks/useToast';
import { colors } from '@/utils/constants/colors';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  note: INote;
}

const ModalWindow = ({ isOpen, onClose, note }: Props) => {
  const [editedHeader, setEditedHeader] = useState('');
  const [editedText, setEditedText] = useState('');
  const dispatch = useAppDispatch();
  const { showSuccessToast, showDangerToast } = useCustomToast();

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
        bgColor: values.color,
        isInArchive: values.isInArchive,
      };

      if (!editedHeader && !editedText) {
        dispatch(removeNote(note));
        showDangerToast('Your note was deleted.');
        onClose();
        return;
      }

      if (values.isInArchive === false) {
        dispatch(editNote(editedNote));
        showSuccessToast('Your note was edited.');
      } else {
        dispatch(addToArchive(note));
        dispatch(removeNote(note));
        showSuccessToast('Your note has been added to the archive.');
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
    dispatch(removeNote(note));
    dispatch(addToTrash(note));
    showDangerToast('The note has been moved to the trash.');
    onClose();
  };

  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset='slideInBottom'
    >
      <ModalOverlay />
      <ModalContent minH={{ base: '50%', md: '350px' }} w='98%'>
        <ModalHeader border='none'></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              heading: editedHeader,
              note: editedText,
              isInArchive: false,
              color: note.bgColor,
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
                        minH={{ base: '260px', md: '150px' }}
                      />
                    </FormControl>
                  )}
                </Field>
                <Divider />
                <Flex justifyContent='space-around'>
                  <Field name='color'>
                    {({ field, form }: { field: any; form: any }) => (
                      <Flex alignItems='center'>
                        <RadioGroup
                          {...field}
                          onChange={value => form.setFieldValue('color', value)}
                          value={field.value}
                        >
                          <Stack direction='row'>
                            {colors.map(color => {
                              return (
                                <Radio
                                  key={color}
                                  colorScheme={color}
                                  value={color}
                                  bgColor={color}
                                />
                              );
                            })}
                          </Stack>
                        </RadioGroup>
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
  );
};

export default ModalWindow;
