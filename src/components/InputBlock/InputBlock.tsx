import { useAppDispatch } from '@/lib/hooks';
import useCustomToast from '@/hooks/useToast';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { addNote } from '@/lib/features/notes/notesSlice';
import { setSearchText } from '@/lib/features/search/searchSlice';
import { addToArchive } from '@/lib/features/archive/archiveSlice';
import {
  Button,
  ButtonGroup,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { FormValues } from '@/interface/interface';
import { colors } from '@/utils/constants/colors';

interface Props {
  onCancel: () => void;
}

const InputBlock = ({ onCancel }: Props) => {
  const dispatch = useAppDispatch();
  const { showSuccessToast } = useCustomToast();

  const validateField = (value: string) => {
    let error;
    if (!value) {
      error = 'Enter some text';
    }
    return error;
  };

  const onSubmitHandler = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    setTimeout(() => {
      actions.setSubmitting(false);

      const note = {
        id: uuidv4(),
        date: String(new Date()),
        title: values.heading ? values.heading : '',
        text: values.note,
        bgColor: values.color,
        isInArchive: values.isInArchive,
      };

      if (values.isInArchive) {
        dispatch(addToArchive(note));
      } else {
        dispatch(addNote(note));
      }
      showSuccessToast('Your action has been completed successfully.');
      dispatch(setSearchText(''));
      onCancel();
    }, 500);
  };

  return (
    <Flex flexDir='column' justifyContent='center' margin='10px 10px'>
      <Formik
        initialValues={{
          heading: '',
          note: '',
          isInArchive: false,
          color: '',
        }}
        onSubmit={onSubmitHandler}
      >
        {props => (
          <Form>
            <Field name='heading'>
              {({ field, form }: { field: any; form: any }) => (
                <FormControl>
                  <Input
                    {...field}
                    type='text'
                    placeholder='Enter heading'
                    mb='5px'
                    fontWeight='bold'
                  />

                  <FormErrorMessage mb='15px'>
                    {form.errors.heading}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='note' validate={validateField}>
              {({ field, form }: { field: any; form: any }) => (
                <FormControl isInvalid={form.errors.note && form.touched.note}>
                  <Textarea
                    {...field}
                    type='text'
                    placeholder='Enter note'
                    mb='5px'
                  />
                  <FormErrorMessage mb='15px'>
                    {form.errors.note}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Flex mb='15px' justifyContent='space-around'>
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
                    {/* <FormLabel fontSize='10px' display='flex'></FormLabel> */}
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

            <ButtonGroup w='100%'>
              <Button
                w='100%'
                colorScheme='teal'
                isLoading={props.isSubmitting}
                type='submit'
              >
                Submit
              </Button>
              <Button
                onClick={() => {
                  onCancel();
                }}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default InputBlock;
