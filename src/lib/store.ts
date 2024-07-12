import { configureStore } from '@reduxjs/toolkit';
import noteReducer from './features/notes/notesSlice';
import searchReducer from './features/search/searchSlice';
import archiveReducer from './features/archive/archiveSlice';
import trashReducer from './features/trash/trashSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      notes: noteReducer,
      archive: archiveReducer,
      trash: trashReducer,
      search: searchReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
