import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const selectNotes = (state: RootState) => state.notes;
const selectSearchText = (state: RootState) => state.search.searchText;

export const selectFilteredNotes = createSelector(
  [selectNotes, selectSearchText],
  (notes, searchText) => {
    if (!searchText) return notes;
    return notes.filter(
      item =>
        item.title.toLowerCase().includes(searchText) ||
        item.text.toLowerCase().includes(searchText)
    );
  }
);
