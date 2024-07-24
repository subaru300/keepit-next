import { getPagesArray } from '@/utils/pages/pages';
import { Button, Flex } from '@chakra-ui/react';

interface Props {
  totalPages: number;
  page: number;
  changePage: (page: number) => void;
  isHidden: boolean;
}

const Pagination = ({ totalPages, page, changePage, isHidden }: Props) => {
  const pagesArray = getPagesArray(totalPages);

  return (
    <Flex mt='10px' mb='15px' gap='10px' display={isHidden ? 'none' : 'flex'}>
      {pagesArray.map(p => {
        return (
          <Button
            key={p}
            color={page === p ? 'teal' : 'gray'}
            cursor='pointer'
            variant='chost'
            onClick={() => changePage(p)}
          >
            {p}
          </Button>
        );
      })}
    </Flex>
  );
};

export default Pagination;
