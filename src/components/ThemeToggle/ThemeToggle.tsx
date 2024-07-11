'use client';

import { Button, useColorMode } from '@chakra-ui/react';
import { CiLight, CiDark } from 'react-icons/ci';

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode}>
      {colorMode === 'light' ? <CiDark /> : <CiLight />}
    </Button>
  );
};

export default ThemeToggle;
