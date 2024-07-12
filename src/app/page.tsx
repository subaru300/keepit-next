'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Center, Flex, Spinner } from '@chakra-ui/react';

const RedirectPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/notes');
  }, [router]);

  return (
    <Flex w='100%' justifyContent='center'>
      <Center>
        <Spinner />
      </Center>
    </Flex>
  );
};

export default RedirectPage;
