import { v4 as uuidv4 } from 'uuid';
import {
  Button,
  ButtonGroup,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useAppDispatch } from '@/lib/hooks';
import { addData } from '@/lib/features/notes/notesSlice';
import { FormValues } from '@/interface/interface';
import { setSearchText } from '@/lib/features/search/searchSlice';

interface Props {
  onCancel: () => void;
}

const InputBlock = ({ onCancel }: Props) => {
  const dispatch = useAppDispatch();

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
      dispatch(
        addData({
          id: uuidv4(),
          date: String(new Date()),
          title: values.heading,
          text: values.note,
          bgColor: values.color,
          isInArchive: values.isInArchive,
        })
      );
      dispatch(setSearchText(''));
    }, 500);
  };

  return (
    <Flex flexDir='column' justifyContent='center' margin='10px 10px'>
      <Formik
        initialValues={{
          heading: '',
          note: '',
        }}
        onSubmit={onSubmitHandler}
      >
        {props => (
          <Form>
            <Field name='heading' validate={validateField}>
              {({ field, form }: { field: any; form: any }) => (
                <FormControl
                // isInvalid={form.errors.heading && form.touched.heading}
                >
                  <Input
                    {...field}
                    type='text'
                    placeholder='Enter heading'
                    mb='5px'
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
            <Flex mb='5px' justifyContent='space-around'>
              <Field name='color'>
                {({ field, form }: { field: any; form: any }) => (
                  <Flex alignItems='center'>
                    <Input {...field} type='color' w='60px' border='none' />
                    <FormLabel fontSize='14px'>BG color</FormLabel>
                  </Flex>
                )}
              </Field>
              <Field name='isInArchive'>
                {({ field, form }: { field: any; form: any }) => (
                  <Flex alignItems='center'>
                    {/* <FormLabel fontSize='10px' display='flex'></FormLabel> */}
                    <Checkbox {...field} colorScheme='green'>
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
