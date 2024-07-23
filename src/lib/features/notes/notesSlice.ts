import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INote } from '@/interface/interface';

const initialState: INote[] = [];

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<INote>) => {
      state.push(action.payload);
    },
    editNote: (state, action: PayloadAction<INote>) => {
      const index = state.findIndex(note => note.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    removeNote: (state, action: PayloadAction<INote>) => {
      return state.filter(item => item.id !== action.payload.id);
    },
    sortNotes: (state, action: PayloadAction<string>) => {
      const sortedState = [...state];

      if (action.payload === 'default') return state;
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

export const { addNote, editNote, removeNote, sortNotes } = notesSlice.actions;

export default notesSlice.reducer;
