import React, { useState } from 'react';
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
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [pagesRead, setPagesRead] = useState(0);



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
    const handleOpenModal = (book: Book) => {
        setSelectedBook(book);
        const pages = localStorage.getItem(`pagesRead-${book.key}`);
        setPagesRead(pages ? parseInt(pages, 10) : 0);
    };

    function handleCloseModal(): void {
        if (selectedBook) {
            localStorage.setItem(`pagesRead-${(selectedBook as Book).key}`, pagesRead.toString());
        }
        setSelectedBook(null);
    }

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
                <div className="grid grid-cols-4 gap-4 pt-4">
                    {data.map((book: any) => (
                        <div key={book.key} className="flex flex-col items-center justify-between bg-white shadow-lg rounded-lg p-3" style={{ width: '22rem', height: '28rem' }}>
                            <div className="flex flex-col items-center justify-center">
                                <img className="w-32 h-48 object-cover mb-4" src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} alt={book.title} />
                                <h2 className="text-xl font-bold mb-2 truncate" style={{ maxWidth: '90%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal', wordWrap: 'break-word', height: '3rem' }} onClick={() => handleOpenModal(book)}>{book.title}</h2>

                                {book.author_name.map((author: string, index: number) => (
                                    <h3 key={index} className="text-lg mb-4" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{author}</h3>
                                ))}
                                <p className="text-gray-500">{book.first_publish_year}</p>
                            </div>
                            <div className="flex flex-col items-start space-y-2">
                                {book.author_name.map((author: string, index: number) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <input type="checkbox" checked={favoriteAuthors.some(favAuthor => favAuthor.name === author)} onChange={(e) => handleFavoriteAuthorChange({ id: author, name: author }, e.target.checked)} />
                                        <span className="text-xs">Favorite Author</span>
                                        {favoriteAuthors.some(favAuthor => favAuthor.name === author) && <button className="text-xs px-1 py-0.5 bg-red-500 text-white rounded hover:bg-red-700" onClick={() => handleRemoveFavoriteAuthor({ id: author, name: author })}>Remove</button>}
                                    </div>
                                ))}
                                <div className="flex items-center space-x-2">
                                    <input type="checkbox" onChange={(e) => handleFavoriteChange(book, e.target.checked)} />
                                    <span className="text-xs">Favorite</span>
                                    {typeof book === 'object' && book.key && favoriteBooks.some((favoriteBook: any) => favoriteBook.key === book.key) && <button className="text-xs px-1 py-0.5 bg-red-500 text-white rounded hover:bg-red-700" onClick={() => handleRemoveFavorite(book)}>Remove</button>}
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            ) : (
                <p className="text-center text-xl">Loading...</p>
            )}
            {selectedBook && (
                <div className="absolute z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <button onClick={handleCloseModal}>Close</button>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">{selectedBook.title}</h3>
                                <p className="mt-2 text-sm text-gray-500">{selectedBook.author_name.join(', ')}</p>
                                <p className="mt-2 text-sm text-gray-500">{selectedBook.first_publish_year}</p>
                                <form onSubmit={handleCloseModal}>
                                    <label htmlFor="pagesRead">Pages Read:</label>
                                    <input id="pagesRead" type="number" value={pagesRead} onChange={(e) => setPagesRead(parseInt(e.target.value, 10))} />
                                    <button type="submit">Save</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};