import { INote } from '@/interface/interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: INote[] = [];

export const archiveSlice = createSlice({
  name: 'archive',
  initialState,
  reducers: {
    addToArchive: (state, action: PayloadAction<INote>) => {
      state.push(action.payload);
    },
  },
});

export const { addToArchive } = archiveSlice.actions;

export default archiveSlice.reducer;
