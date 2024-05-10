import { configureStore } from '@reduxjs/toolkit';
import bookSearchReducer from './bookSearchSlice';
import favoriteBooksReducer from './favoriteBookSlice';
import favoriteAuthorReducer from './favoriteAuthorSlice';

const store = configureStore({
    reducer: {
        bookSearch: bookSearchReducer,
        favoriteBooks: favoriteBooksReducer,
        favoriteAuthor: favoriteAuthorReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;