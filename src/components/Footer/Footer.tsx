'use client';

import { Center, Flex, Text, useColorModeValue } from '@chakra-ui/react';

const Footer = () => {
  const borderColor = useColorModeValue(
    'RGBA(0, 0, 0, 0.08)',
    'RGBA(255, 255, 255, 0.08)'
  );

  return (
    <Flex borderTop='1px' borderColor={borderColor} justifyContent='center'>
      <Center>
        <Text mt='20px' fontSize={{ base: '12px', md: '14px' }} m='10px'>
          This pet project was created using technologies such as Next.js,
          TypeScript, React Redux Toolkit, Chakra UI Kit, React Formik and
          others.
        </Text>
      </Center>
    </Flex>
  );
};

export default Footer;
