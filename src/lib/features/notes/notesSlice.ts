import { INote } from '@/interface/interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: INote[] = [];

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<INote>) => {
      state.push(action.payload);
    },
    editNote: (state, action: PayloadAction<INote>) => {
      const index = state.findIndex(note => note.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    removeData: (state, action: PayloadAction<INote>) => {
      return state.filter(item => item.id !== action.payload.id);
    },
    sortData: (state, action: PayloadAction<string>) => {
      const sortedState = [...state];

      if (action.payload === 'noSort') return state;
      if (action.payload === 'byDate') {
        return sortedState.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      } else if (action.payload === 'byHead') {
        return sortedState.sort((a, b) => a.title.localeCompare(b.title));
      }
      return sortedState;
    },
  },
});

export const { addData, editNote, removeData, sortData } = notesSlice.actions;

export default notesSlice.reducer;
