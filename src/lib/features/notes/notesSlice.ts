import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INote } from '@/interface/interface';

const initialState: {
  notes: INote[];
  totalPages: number;
  currentPage: number;
  notesPerPage: number;
  paginatedNotes: INote[];
} = {
  notes: [],
  totalPages: 0,
  currentPage: 1,
  notesPerPage: 15,
  paginatedNotes: [],
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<INote>) => {
      state.notes.push(action.payload);
    },
    editNote: (state, action: PayloadAction<INote>) => {
      const index = state.notes.findIndex(
        note => note.id === action.payload.id
      );
      if (index !== -1) {
        state.notes[index] = action.payload;
      }
    },
    removeNote: (state, action: PayloadAction<INote>) => {
      state.notes = state.notes.filter(item => item.id !== action.payload.id);
    },
    sortNotes: (state, action: PayloadAction<string>) => {
      if (action.payload === 'default') return;
      if (action.payload === 'byDate') {
        state.notes.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      } else if (action.payload === 'byHead') {
        state.notes.sort((a, b) => a.title.localeCompare(b.title));
      }
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setPaginatedNotes: (state, action: PayloadAction<number>) => {
      const startIndex = (action.payload - 1) * state.notesPerPage;
      const lastIndex = startIndex + state.notesPerPage;
      state.paginatedNotes = state.notes.slice(startIndex, lastIndex);
    },
  },
});

export const {
  addNote,
  editNote,
  removeNote,
  sortNotes,
  setCurrentPage,
  setTotalPages,
  setPaginatedNotes,
} = notesSlice.actions;

export default notesSlice.reducer;
