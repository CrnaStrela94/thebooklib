import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setData, selectSearchParams } from '../store/bookSearchSlice';
import { selectFavoriteBooks } from '../store/favoriteBookSlice';
import { SearchForm } from './SearchForm';
import { BookList } from './BookList';

const LibrarySearch = () => {
    const dispatch = useDispatch();
    const searchParams = useSelector(selectSearchParams);
    const favoriteBooks = useSelector(selectFavoriteBooks);
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

    const toggleShowFavorites = () => {
        setShowFavorites(!showFavorites);
    };

    return (
        <div>
            <SearchForm />
            {showFavorites ? <BookList books={favoriteBooks} /> : <BookList />}
            <button onClick={loadMoreBooks}>Load More</button>
            <button onClick={toggleShowFavorites}>{showFavorites ? 'Show All' : 'My Favorites'}</button>
        </div>
    );
};

export default LibrarySearch;