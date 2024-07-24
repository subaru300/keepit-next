import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const selectNotes = (state: RootState) => state.notes.notes;
const selectPaginatedNotes = (state: RootState) => state.notes.paginatedNotes;
const selectSearchText = (state: RootState) => state.search.searchText;

export const selectFilteredNotes = createSelector(
  [selectNotes, selectPaginatedNotes, selectSearchText],
  (notes, paginatedNotes, searchText) => {
    if (!searchText) return paginatedNotes;
    return notes.filter(
      item =>
        item.title.toLowerCase().includes(searchText) ||
        item.text.toLowerCase().includes(searchText)
    );
  }
);
