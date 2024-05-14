import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { BookList } from './BookList';
import { removeFavoriteAuthor, Author } from '../store/favoriteAuthorSlice';

const FavoriteAuthors = () => {
    const dispatch = useDispatch();
    const favoriteAuthors = useSelector((state: RootState) => state.favoriteAuthor.favoriteAuthors);
    const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
    const [books, setBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        if (favoriteAuthors.length > 0) {
            setLoading(false);
        }
    }, [favoriteAuthors]);

    const handleAuthorClick = async (author: Author) => {
        setSelectedAuthor(author);

        const response = await fetch(`https://openlibrary.org/search.json?author=${encodeURIComponent(author.name)}`);
        const data = await response.json();
        setBooks(data.docs);
    };

    const handleShowAllClick = () => {
        setShowAll(true);;
    };

    const handleShowLessClick = () => {
        setShowAll(false);
    };

    const handleRemoveFavoriteAuthor = (author: Author) => {
        dispatch(removeFavoriteAuthor(author.id));
    };

    const displayedAuthors = showAll ? favoriteAuthors : favoriteAuthors.slice(0, 2);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center">
            <div className="p-8 bg-white rounded shadow mb-8 grid grid-cols-4 gap-4">
                <h1 className="text-2xl font-bold mb-4">My Favorite Authors</h1>
                <ul className="space-y-4">
                    {displayedAuthors.map(author => (
                        <li key={author.id} className="flex items-center justify-between space-x-4">
                            <button
                                onClick={() => handleAuthorClick(author)}
                                className="text-indigo-600 hover:text-indigo-900"
                            >
                                {author.name}
                            </button>
                            <button
                                onClick={() => handleRemoveFavoriteAuthor(author)}
                                className="px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-700"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-end space-x-4 mt-4">
                    {!showAll ? (
                        <button onClick={handleShowAllClick} className="text-indigo-600 hover:text-indigo-900">
                            Show All
                        </button>
                    ) : (
                        <button onClick={handleShowLessClick} className="text-indigo-600 hover:text-indigo-900">
                            Show Less
                        </button>
                    )}
                </div>
            </div>
            {selectedAuthor && (
                <div className="w-full">
                    <h2 className="text-xl font-bold mb-2">Books by {selectedAuthor.name}</h2>
                    <BookList books={books} />
                </div>
            )}
        </div>
    );
};

export default FavoriteAuthors;