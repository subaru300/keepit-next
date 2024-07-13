'use client';

import { Flex, useColorModeValue } from '@chakra-ui/react';

const Footer = () => {
  const borderColor = useColorModeValue(
    'RGBA(0, 0, 0, 0.08)',
    'RGBA(255, 255, 255, 0.08)'
  );

  return (
    <Flex borderTop='1px' borderColor={borderColor}>
      Footer
    </Flex>
  );
};

export default Footer;
