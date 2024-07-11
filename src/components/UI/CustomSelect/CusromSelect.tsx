import { INote } from '@/interface/interface';
import { Stack, Select } from '@chakra-ui/react';

interface Props {
  notes: INote[];
  onSortHandler: (value: string) => void;
}

const CustomSelect = ({ notes, onSortHandler }: Props) => {
  return (
    <Stack w='30%' mb='20px'>
      <Select
        variant='flushed'
        disabled={notes.length <= 1 ? true : false}
        onChange={e => onSortHandler(e.target.value)}
      >
        <option value='byDate'>By date</option>
        <option value='byHead'>By heading</option>
      </Select>
    </Stack>
  );
};

export default CustomSelect;
