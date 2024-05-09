// FavoriteAuthors.tsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { BookList } from './BookList';
import { removeFavoriteAuthor, Author } from '../store/favoriteAuthorSlice';

const FavoriteAuthors = () => {
    const dispatch = useDispatch();
    const favoriteAuthors = useSelector((state: RootState) => state.favoriteAuthor.favoriteAuthors);
    const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
    const [books, setBooks] = useState<any[]>([]);

    const handleAuthorClick = async (author: Author) => {
        setSelectedAuthor(author);

        // Fetch the books of the author
        const response = await fetch(`https://openlibrary.org/search.json?author=${encodeURIComponent(author.name)}`);
        const data = await response.json();
        setBooks(data.docs);
    };

    const handleRemoveFavoriteAuthor = (author: Author) => {
        dispatch(removeFavoriteAuthor(author.id));
    };

    return (
        <div>
            <h1>My Favorite Authors</h1>
            <ul>
                {favoriteAuthors.map(author => (
                    <li key={author.id}>
                        <button onClick={() => handleAuthorClick(author)}>{author.name}</button>
                        <button onClick={() => handleRemoveFavoriteAuthor(author)}>Remove</button>
                    </li>
                ))}
            </ul>
            {selectedAuthor && (
                <div>
                    <h2>Books by {selectedAuthor.name}</h2>
                    <BookList books={books} />
                </div>
            )}
        </div>
    );
};

export default FavoriteAuthors;