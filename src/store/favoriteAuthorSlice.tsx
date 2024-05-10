import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface Author {
    id: string;
    name: string;
}

interface FavoriteAuthorsState {
    favoriteAuthors: Author[];
}

const initialState: FavoriteAuthorsState = {
    favoriteAuthors: typeof window !== 'undefined' && localStorage.getItem('favoriteAuthors') ? JSON.parse(localStorage.getItem('favoriteAuthors') ?? '[]') : [],
};

const favoriteAuthorsSlice = createSlice({
    name: 'favoriteAuthors',
    initialState,
    reducers: {
        addFavoriteAuthor: (state, action: PayloadAction<Author>) => {
            state.favoriteAuthors.push(action.payload);
            localStorage.setItem('favoriteAuthors', JSON.stringify(state.favoriteAuthors));
        },
        removeFavoriteAuthor: (state, action: PayloadAction<string>) => {
            state.favoriteAuthors = state.favoriteAuthors.filter(author => author.id !== action.payload);
            localStorage.setItem('favoriteAuthors', JSON.stringify(state.favoriteAuthors));
        },
    },
});

export const { addFavoriteAuthor, removeFavoriteAuthor } = favoriteAuthorsSlice.actions;

export const selectFavoriteAuthors = createSelector(
    (state: RootState) => state.favoriteAuthor.favoriteAuthors,
    favoriteAuthors => favoriteAuthors
);

export default favoriteAuthorsSlice.reducer;