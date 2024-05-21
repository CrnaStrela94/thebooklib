import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';
import { ReactNode } from 'react';

export interface Book {
    currently_reading_count: ReactNode;
    genres: ReactNode;
    person: ReactNode;
    ratings_count: ReactNode;
    ratings_average: ReactNode;
    want_to_read_count: ReactNode;
    already_read_count: ReactNode;
    first_sentence: ReactNode;
    number_of_pages_median: ReactNode;
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