// FavoriteAuthors.tsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { BookList } from './BookList';

const FavoriteAuthors = () => {
    const favoriteAuthors = useSelector((state: RootState) => state.favoriteAuthor.favoriteAuthors);
    const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
    const [books, setBooks] = useState<any[]>([]);

    const handleAuthorClick = async (author: string) => {
        setSelectedAuthor(author);

        // Fetch the books of the author
        const response = await fetch(`https://openlibrary.org/search.json?author=${encodeURIComponent(author)}`);
        const data = await response.json();
        setBooks(data.docs);
    };

    return (
        <div>
            <h1>My Favorite Authors</h1>
            <ul>
                {favoriteAuthors.map(author => (
                    <li key={author}>
                        <button onClick={() => handleAuthorClick(author)}>{author}</button>
                    </li>
                ))}
            </ul>
            {selectedAuthor && (
                <div>
                    <h2>Books by {selectedAuthor}</h2>
                    <BookList books={books} />
                </div>
            )}
        </div>
    );
};

export default FavoriteAuthors;