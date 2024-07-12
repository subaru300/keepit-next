'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Center, Divider, Heading, Text } from '@chakra-ui/react';

const Page404 = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <Center>
      <Box>
        <Heading as='h6' fontSize='24px'>
          Page not found
          <Divider m='10px 0' />
          Error 404
        </Heading>
        <Text>You will be redirected to the main page in 3 sec.</Text>
      </Box>
    </Center>
  );
};

export default Page404;
