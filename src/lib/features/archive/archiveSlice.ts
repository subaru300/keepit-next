import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INote } from '@/interface/interface';

const initialState: INote[] = [];

export const archiveSlice = createSlice({
  name: 'archive',
  initialState,
  reducers: {
    addToArchive: (state, action: PayloadAction<INote>) => {
      state.push(action.payload);
    },
    removeFromArchive: (state, action: PayloadAction<INote>) => {
      return state.filter(item => item.id !== action.payload.id);
    },
  },
});

export const { addToArchive, removeFromArchive } = archiveSlice.actions;

export default archiveSlice.reducer;
