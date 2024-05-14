import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setData, selectSearchParams } from '../store/bookSearchSlice';
import { SearchForm } from './SearchForm';
import { BookList } from './BookList';

const LibrarySearch = () => {
    const dispatch = useDispatch();
    const searchParams = useSelector(selectSearchParams);
    const [numBooksToLoad, setNumBooksToLoad] = useState(10);
    const [showFavorites, setShowFavorites] = useState(false);

    useEffect(() => {
        if (searchParams.value !== '' && !showFavorites) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`https://openlibrary.org/search.json?${searchParams.type}=${searchParams.value}&limit=${numBooksToLoad}`);
                    const jsonData = await response.json();
                    dispatch(setData(jsonData.docs)); // The data is in the 'docs' property
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();
        }
    }, [dispatch, searchParams, numBooksToLoad, showFavorites]);

    const loadMoreBooks = () => {
        setNumBooksToLoad(numBooksToLoad + 10);
    };

    return (
        <div>
            <SearchForm />
            <BookList />
            <button onClick={loadMoreBooks}>Load More</button>
        </div>
    );
};

export default LibrarySearch;