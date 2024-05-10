import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';
import { ReactNode } from 'react';

export interface Book {
    author_name: any;
    first_publish_year: ReactNode;
    key: string;
    id: string;
    title: string;
}

interface FavoriteBooksState {
    favoriteBooks: Book[];
}

const initialState: FavoriteBooksState = {
    favoriteBooks: typeof window !== 'undefined' && localStorage.getItem('favoriteBooks') ? JSON.parse(localStorage.getItem('favoriteBooks') ?? '[]') : [],
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
    },
});

export const { addFavoriteBook, removeFavoriteBook } = favoriteBooksSlice.actions;

export const selectFavoriteBooks = createSelector(
    (state: RootState) => state.favoriteBooks.favoriteBooks,
    favoriteBooks => favoriteBooks
);

export default favoriteBooksSlice.reducer;