import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoriteAuthorState {
    favoriteAuthors: string[];
}

const initialState: FavoriteAuthorState = {
    favoriteAuthors: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('favoriteAuthors') || '[]') : [],
};

const favoriteAuthorSlice = createSlice({
    name: 'favoriteAuthor',
    initialState,
    reducers: {
        addFavoriteAuthor: (state, action: PayloadAction<string>) => {
            state.favoriteAuthors.push(action.payload);
            if (typeof window !== 'undefined') {
                localStorage.setItem('favoriteAuthors', JSON.stringify(state.favoriteAuthors));
            }
        },
        removeFavoriteAuthor: (state, action: PayloadAction<string>) => {
            state.favoriteAuthors = state.favoriteAuthors.filter(author => author !== action.payload);
            if (typeof window !== 'undefined') {
                localStorage.setItem('favoriteAuthors', JSON.stringify(state.favoriteAuthors));
            }
        },
    },
});

export const { addFavoriteAuthor, removeFavoriteAuthor } = favoriteAuthorSlice.actions;

export default favoriteAuthorSlice.reducer;