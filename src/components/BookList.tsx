import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';
import { addFavoriteBook, removeFavoriteBook, selectFavoriteBooks } from '../store/favoriteBookSlice';
import { Book } from '../store/favoriteBookSlice';
import { Author, addFavoriteAuthor, removeFavoriteAuthor, selectFavoriteAuthors } from '../store/favoriteAuthorSlice';


interface BookListProps {
    books?: any[];
}

export const BookList: React.FC<BookListProps> = ({ books }) => {
    const dispatch = useDispatch();
    const allBooks = useSelector((state: RootState<any, any, any> & { bookSearch: { data: any } }) => state.bookSearch.data);
    const data = books || allBooks;
    const favoriteBooks = useSelector(selectFavoriteBooks);
    const favoriteAuthors = useSelector(selectFavoriteAuthors);


    const handleAddFavorite = (book: Book) => {
        dispatch(addFavoriteBook(book));
    };

    const handleRemoveFavorite = (book: Book) => {
        dispatch(removeFavoriteBook(book.key));
    };
    function handleFavoriteChange(book: Book, checked: boolean): void {
        if (checked) {
            handleAddFavorite(book);
        } else {
            handleRemoveFavorite(book);
        }
    }
    const handleAddFavoriteAuthor = (author: Author) => { // Treat author as an object of type Author
        dispatch(addFavoriteAuthor(author));
    };

    const handleRemoveFavoriteAuthor = (author: Author) => { // Treat author as an object of type Author
        dispatch(removeFavoriteAuthor(author.id));
    };

    function handleFavoriteAuthorChange(author: Author, checked: boolean): void { // Treat author as an object of type Author
        if (checked && !favoriteAuthors.some(favAuthor => favAuthor.id === author.id)) {
            dispatch(addFavoriteAuthor(author));
        } else if (!checked) {
            dispatch(removeFavoriteAuthor(author.id));
        }
    }

    return (
        <>
            {data ? (
                <div className="grid grid-cols-4 gap-4">
                    {data.map((book: any) => (
                        <div key={book.key} className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-3" style={{ width: '20rem', height: '25rem' }}>
                            <img className="w-32 h-48 object-cover mb-4" src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} alt={book.title} />
                            <h2 className="text-xl font-bold mb-2 truncate" style={{ maxWidth: '90%' }}>{book.title}</h2>
                            {book.author_name.map((author: string, index: number) => (
                                <div key={index}>
                                    <h3 className="text-lg mb-4">{author}</h3>
                                    <input type="checkbox" checked={favoriteAuthors.some(favAuthor => favAuthor.name === author)} onChange={(e) => handleFavoriteAuthorChange({ id: author, name: author }, e.target.checked)} /> Favorite Author
                                    {favoriteAuthors.some(favAuthor => favAuthor.name === author) && <button onClick={() => handleRemoveFavoriteAuthor({ id: author, name: author })}>Remove Favorite Author</button>}
                                </div>
                            ))}
                            <input type="checkbox" onChange={(e) => handleFavoriteChange(book, e.target.checked)} /> Favorite
                            {typeof book === 'object' && book.key && favoriteBooks.some((favoriteBook: any) => favoriteBook.key === book.key) && <button onClick={() => handleRemoveFavorite(book)}>Remove from favorites</button>}
                            <p className="text-gray-500">{book.first_publish_year}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-xl">Loading...</p>
            )}
        </>
    );
};