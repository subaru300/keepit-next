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
    removeFromTrash: (state, action: PayloadAction<INote>) => {
      return state.filter(item => item.id !== action.payload.id);
    },
    clearTrash: (state, action: PayloadAction<string>) => {
      return initialState;
    },
  },
});

export const { addToTrash, removeFromTrash, clearTrash } = trashSlice.actions;

export default trashSlice.reducer;
