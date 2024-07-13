'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setSearchText } from '@/lib/features/search/searchSlice';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { CiSearch } from 'react-icons/ci';
import { usePathname } from 'next/navigation';

const Search = () => {
  const searchInputText = useAppSelector(state => state.search.searchText);
  const dispatch = useAppDispatch();

  const pathname = usePathname();
  const isNotesPage = pathname === '/notes';

  const onSearchHandler = (value: string) => {
    dispatch(setSearchText(value.toLowerCase()));
  };

  return (
    <InputGroup display='flex' justifyContent='center' alignItems='center'>
      <InputLeftElement pointerEvents='none'>
        <CiSearch />
      </InputLeftElement>
      <Input
        placeholder='Search'
        paddingLeft='30px'
        value={searchInputText}
        onChange={e => onSearchHandler(e.target.value)}
        isDisabled={!isNotesPage}
      />
    </InputGroup>
  );
};

export default Search;
