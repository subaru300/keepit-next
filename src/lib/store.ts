import { configureStore } from '@reduxjs/toolkit';
import noteReducer from './features/notes/notesSlice';
import searchReducer from './features/search/searchSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      notes: noteReducer,
      search: searchReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
