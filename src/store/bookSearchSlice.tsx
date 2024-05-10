import { createSlice, createSelector } from '@reduxjs/toolkit';

export const bookSearchSlice = createSlice({
    name: 'bookSearch',
    initialState: {
        data: null,
        searchParams: { type: 'q', value: '' },
    },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
        setSearchParams: (state, action) => {
            state.searchParams = action.payload;
        },
    },
});
export const selectSearchParams = createSelector(
    state => state.bookSearch.searchParams,
    searchParams => searchParams
);
export const selectBooks = createSelector(
    state => state.bookSearch.data,
    data => data
);

export const { setData, setSearchParams } = bookSearchSlice.actions;

export default bookSearchSlice.reducer;