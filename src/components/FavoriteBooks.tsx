import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { BookList } from './BookList';

const FavoriteBooks: React.FC = () => {
    const favoriteBooks = useSelector((state: RootState) => state.favoriteBooks.favoriteBooks);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (favoriteBooks.length > 0) {
            setLoading(false);
        }
    }, [favoriteBooks]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex mt-2 ml-8  flex-col items-center">
            <h1 className="flex mt-2 ml-8 text-2xl font-bold mb-4 neon-text ">My Favorite Books</h1>
            <BookList books={favoriteBooks} />
        </div>
    );
};

export default FavoriteBooks;