'use client';

import { setSearchText } from '@/lib/features/search/searchSlice';
import { useAppDispatch } from '@/lib/hooks';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { CiSearch } from 'react-icons/ci';

const Search = () => {
  const dispatch = useAppDispatch();

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
        onChange={e => onSearchHandler(e.target.value)}
      />
    </InputGroup>
  );
};

export default Search;
