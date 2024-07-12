'use client';

import { useRouter } from 'next/navigation';
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaRegNoteSticky } from 'react-icons/fa6';
import { FiArchive } from 'react-icons/fi';
import { IoTrashOutline } from 'react-icons/io5';

const Navigation = () => {
  const router = useRouter();
  const borderColor = useColorModeValue(
    'RGBA(0, 0, 0, 0.08)',
    'RGBA(255, 255, 255, 0.08)'
  );

  return (
    <Box borderRight='1px' borderColor={borderColor} h='100%' pr='20px'>
      <Tabs minW='100px'>
        <TabList display='flex' flexDir='column'>
          <Tab onClick={() => router.push('/notes')}>
            <FaRegNoteSticky size={22} />
          </Tab>
          <Tab onClick={() => router.push('/archive')}>
            <FiArchive size={22} />
          </Tab>
          <Tab onClick={() => router.push('/trash')}>
            <IoTrashOutline size={22} />
          </Tab>
        </TabList>

        <TabPanels textAlign='center'>
          <TabPanel>
            <Text>Notes</Text>
          </TabPanel>
          <TabPanel>
            <Text>Archive</Text>
          </TabPanel>
          <TabPanel>
            <Text>Trash</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Navigation;
