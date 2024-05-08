import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from './store'; // Import the RootState from your store file

export interface Book {
    key: string;
    id: string;
    title: string;
}

interface FavoriteBooksState {
    favoriteBooks: Book[];
    favoriteAuthors: string[];
}

const initialState: FavoriteBooksState = {
    favoriteBooks: typeof window !== 'undefined' && localStorage.getItem('favoriteBooks') ? JSON.parse(localStorage.getItem('favoriteBooks') ?? '[]') : [],
    favoriteAuthors: typeof window !== 'undefined' && localStorage.getItem('favoriteAuthors') ? JSON.parse(localStorage.getItem('favoriteAuthors') ?? '[]') : [],
};



const favoriteBooksSlice = createSlice({
    name: 'favoriteBooks',
    initialState,
    reducers: {
        addFavoriteBook: (state, action: PayloadAction<Book>) => {
            state.favoriteBooks.push(action.payload);
            localStorage.setItem('favoriteBooks', JSON.stringify(state.favoriteBooks));
        },
        removeFavoriteBook: (state, action: PayloadAction<string>) => {
            state.favoriteBooks = state.favoriteBooks.filter(book => book.key !== action.payload);
            localStorage.setItem('favoriteBooks', JSON.stringify(state.favoriteBooks));
        },
        addFavoriteAuthor: (state, action: PayloadAction<string>) => {
            state.favoriteAuthors.push(action.payload);
            localStorage.setItem('favoriteAuthors', JSON.stringify(state.favoriteAuthors));
        },
        removeFavoriteAuthor: (state, action: PayloadAction<string>) => {
            state.favoriteAuthors = state.favoriteAuthors.filter(author => author !== action.payload);
            localStorage.setItem('favoriteAuthors', JSON.stringify(state.favoriteAuthors));
        },
    },
});

export const { addFavoriteBook, removeFavoriteBook, addFavoriteAuthor, removeFavoriteAuthor } = favoriteBooksSlice.actions;

export const selectFavoriteBooks = createSelector(
    (state: RootState) => state.favoriteBooks.favoriteBooks,
    favoriteBooks => favoriteBooks
);

export const selectFavoriteAuthors = createSelector(
    (state: RootState) => state.favoriteBooks.favoriteAuthors,
    favoriteAuthors => favoriteAuthors
);

export default favoriteBooksSlice.reducer;