import { useToast, UseToastOptions } from '@chakra-ui/react';

const useCustomToast = () => {
  const toast = useToast();

  const showToast = (type: 'success' | 'error', message: string) => {
    const options: UseToastOptions = {
      title: type === 'success' ? 'Success' : 'Success',
      description: message,
      status: type,
      duration: 2000,
      isClosable: true,
    };
    toast(options);
  };

  const showSuccessToast = (message: string) => showToast('success', message);
  const showDangerToast = (message: string) => showToast('error', message);

  return { showSuccessToast, showDangerToast };
};

export default useCustomToast;
