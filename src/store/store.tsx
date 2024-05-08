import { configureStore } from '@reduxjs/toolkit';
import bookSearchReducer from './bookSearchSlice';
import favoriteBooksReducer from './favoriteBookSlice';

const store = configureStore({
    reducer: {
        bookSearch: bookSearchReducer,
        favoriteBooks: favoriteBooksReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;