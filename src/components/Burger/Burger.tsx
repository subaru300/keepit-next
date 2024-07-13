'use client';

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaRegNoteSticky } from 'react-icons/fa6';
import { FiArchive } from 'react-icons/fi';
import { IoTrashOutline } from 'react-icons/io5';
import { RxHamburgerMenu } from 'react-icons/rx';

const Burger = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const router = useRouter();

  const onChangeMenuHandler = (page: string) => {
    setSelectedItem(page);
    router.push(page);
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label='Menu'
        icon={<RxHamburgerMenu />}
        variant='outline'
      />
      <MenuList w='100%' display='flex' flexDir='column'>
        <MenuItem
          as='a'
          icon={<FaRegNoteSticky />}
          onClick={() => onChangeMenuHandler('/notes')}
          bg={selectedItem === '/notes' ? '#A0AEC0' : 'ihnerhit'}
        >
          Notes
        </MenuItem>

        <MenuItem
          as='a'
          icon={<FiArchive />}
          onClick={() => onChangeMenuHandler('/archive')}
          bg={selectedItem === '/archive' ? '#A0AEC0' : 'ihnerhit'}
        >
          Archive
        </MenuItem>

        <MenuItem
          as='a'
          icon={<IoTrashOutline />}
          onClick={() => onChangeMenuHandler('/trash')}
          bg={selectedItem === '/trash' ? '#A0AEC0' : 'ihnerhit'}
        >
          Trash
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Burger;
