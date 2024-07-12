import { INote } from '@/interface/interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: INote[] = [];

export const trashSlice = createSlice({
  name: 'trash',
  initialState,
  reducers: {
    addToTrash: (state, action: PayloadAction<INote>) => {
      state.push(action.payload);
    },
  },
});

export const { addToTrash } = trashSlice.actions;

export default trashSlice.reducer;
