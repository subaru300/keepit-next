import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { editNote, removeData } from '@/lib/features/notes/notesSlice';
import {
  Button,
  ButtonGroup,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
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

      if (!editedHeader && !editedText) {
        dispatch(removeData(note.id));
        close();
        return;
      }

      dispatch(
        editNote({
          id: note.id,
          date: String(new Date()),
          title: editedHeader,
          text: editedText,
          bgColor: values.color,
          isInArchive: values.isInArchive,
        })
      );
    }, 100);
    onClose();
  };

  const onHeadingChangeHandler = (text: string) => {
    setEditedHeader(text);
  };

  const onTextChangeHandler = (text: string) => {
    setEditedText(text);
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
                        <Input
                          {...field}
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
                        <Textarea
                          {...field}
                          value={editedText}
                          onChange={e => onTextChangeHandler(e.target.value)}
                          type='text'
                          mb='5px'
                          minH='250px'
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Flex justifyContent='space-around'>
                    <Field name='color'>
                      {({ field, form }: { field: any; form: any }) => (
                        <Flex alignItems='center'>
                          <Input
                            {...field}
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
                          <Checkbox {...field} colorScheme='green'>
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
                  >
                    <Text fontSize='10px' opacity='0.6' textAlign='right'>
                      Last changes {note?.date?.slice(0, 21)}
                    </Text>
                    <ButtonGroup ml='auto' mt='20px'>
                      <Button variant='ghost' mr={3} onClick={onClose}>
                        Close
                      </Button>
                      <Button colorScheme='green' type='submit'>
                        Save note
                      </Button>
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
