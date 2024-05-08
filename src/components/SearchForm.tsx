import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchParams } from '../store/bookSearchSlice';
import { RootState } from '@reduxjs/toolkit/query';

export const SearchForm = () => {
    const dispatch = useDispatch();
    const searchParams = useSelector((state: RootState<any, any, any> & { bookSearch: { searchParams: any } }) => state.bookSearch.searchParams);

    const handleSearch = (e: { preventDefault: () => void; target: { search: { value: any; }; }; }) => {
        e.preventDefault();
        dispatch(setSearchParams({ ...searchParams, value: e.target.search.value }));
    };

    return (
        <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSearch(e as unknown as { preventDefault: () => void; target: { search: { value: any; }; }; })} className="flex space-x-4 mb-6">
            <select value={searchParams.type} onChange={e => dispatch(setSearchParams({ ...searchParams, type: e.target.value }))} className="border-2 border-gray-200 rounded-md p-2" style={{ color: 'rgb(var(--foreground-rgb))' }}>
                <option value="q">Query</option>
                <option value="title">Title</option>
                <option value="author">Author</option>
            </select>
            <input name="search" type="text" placeholder="Search..." className="flex-grow border-2 border-gray-200 rounded-md p-2" style={{ color: 'rgb(var(--foreground-rgb))' }} />
            <button type="submit" className="bg-blue-500 text-white rounded-md p-2">Search</button>
        </form>
    );
};