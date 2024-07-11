import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISearch } from '@/interface/interface';

const initialState: ISearch = {
  searchText: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
  },
});

export const { setSearchText } = searchSlice.actions;
export default searchSlice.reducer;
