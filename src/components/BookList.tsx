import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';
import { addFavoriteBook, removeFavoriteBook, selectFavoriteBooks } from '../store/favoriteBookSlice';
import { Book } from '../store/favoriteBookSlice';
import { Author, addFavoriteAuthor, removeFavoriteAuthor, selectFavoriteAuthors } from '../store/favoriteAuthorSlice';
import { Rating, ThinStar } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import Buttons from './btn';


interface BookListProps {
    books?: Book[];
}

export const BookList: React.FC<BookListProps> = ({ books }) => {
    const dispatch = useDispatch();
    const allBooks = useSelector((state: RootState<any, any, any> & { bookSearch: { data: any } }) => state.bookSearch.data);
    const data = books || allBooks;
    const favoriteBooks = useSelector(selectFavoriteBooks);
    const favoriteAuthors = useSelector(selectFavoriteAuthors);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [pagesRead, setPagesRead] = useState(0);
    const [ratings, setRatings] = useState<Record<string, number>>({});

    useEffect(() => {
        const newRatings: Record<string, number> = {};
        if (data) {
            data.forEach((book: any) => {
                const bookRating = localStorage.getItem(`bookRating-${book.key}`);
                if (bookRating) {
                    newRatings[book.key] = Number(bookRating);
                }
            });
            setRatings(newRatings);
        }
    }, [data]);


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
        const bookRating = localStorage.getItem(`bookRating-${book.key}`);
        const rating = bookRating ? Number(bookRating) : 0;
        setRatings(prevRatings => {
            const newRatings = { ...prevRatings, [book.key]: rating };
            localStorage.setItem('ratings', JSON.stringify(newRatings));
            return newRatings;
        });
    };

    function handleCloseModal(): void {
        if (selectedBook) {
            localStorage.setItem(`pagesRead-${(selectedBook as Book).key}`, pagesRead.toString());
        }
        setSelectedBook(null);
    }

    const handleRemoveFavoriteAuthor = (author: Author) => {
        dispatch(removeFavoriteAuthor(author.id));
    };

    function handleFavoriteAuthorChange(author: Author, checked: boolean): void {
        if (checked && !favoriteAuthors.some(favAuthor => favAuthor.id === author.id)) {
            dispatch(addFavoriteAuthor(author));
        } else if (!checked) {
            dispatch(removeFavoriteAuthor(author.id));
        }
    }


    const handleRatingChange = (book: Book, newRating: number) => {
        localStorage.setItem(`bookRating-${book.key}`, String(newRating));
        setRatings(prevRatings => ({ ...prevRatings, [book.key]: newRating }));
    };
    const myStyles = {
        itemShapes: ThinStar,
        activeFillColor: '#ffb700',
        inactiveFillColor: '#fbf1a9',
        size: '15px'
    }



    return (
        <>
            {data ? (
                <div className="grid grid-cols-4 gap-4 pt-4">

                    {data.map((book: any) => (
                        <div key={book.key} className="flex flex-col items-center justify-between bg-white shadow-lg rounded-lg p-3" style={{ width: '25rem', height: '30rem' }}>
                            <div className="flex flex-col items-center justify-center">
                                <img className="w-32 h-48 object-cover mb-4" src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : '/book-cover-svgrepo-com.svg'} alt={book.title} />
                                <h2 className="text-xl font-bold mb-2 truncate" style={{ maxWidth: '90%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal', wordWrap: 'break-word', height: '3rem' }} >{book.title}</h2>
                                <h3 className="text-lg mb-4" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal', wordWrap: 'break-word' }}>{book.author_name[0]}</h3>
                                <p className="text-gray-500">{book.first_publish_year}</p>
                                <Rating style={{ maxWidth: 150 }} value={ratings[book.key] || 0} onChange={(newRating: number) => handleRatingChange(book, newRating)} itemStyles={myStyles} />
                                <button className="text-xs px-1 py-0.5 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={() => handleOpenModal(book)}>More Info</button>
                            </div>
                            <div className="flex flex-col items-start space-y-2">
                                <div className="flex items-center space-x-2">
                                    <input type="checkbox" checked={favoriteAuthors.some(favAuthor => favAuthor.name === book.author_name[0])} onChange={(e) => handleFavoriteAuthorChange({ id: book.author_name[0], name: book.author_name[0] }, e.target.checked)} />
                                    <span className="text-xs">Favorite Author</span>
                                    {favoriteAuthors.some(favAuthor => favAuthor.name === book.author_name[0]) && <button className="text-xs px-1 py-0.5 bg-red-500 text-white rounded hover:bg-red-700" onClick={() => handleRemoveFavoriteAuthor({ id: book.author_name[0], name: book.author_name[0] })}>Remove</button>}
                                </div>
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
                selectedBook && (
                    <div className="fixed inset-0 flex items-center justify-center z-10">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        <div className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-md sm:w-full">
                            <h3 className="ml-4 mt-4 text-lg leading-6 font-medium text-gray-900 overflow-auto">{selectedBook.title}</h3>
                            <div className="overflow-auto h-16 w-104">
                                <p className="mt-4 ml-4 text-lg text-gray-600 overflow-auto">{selectedBook.author_name.join(', ')}</p>
                            </div>

                            <p className="mt-4 ml-4 text-lg text-gray-600 overflow-auto">{selectedBook.first_publish_year}</p>
                            <div className=" overflow-auto h-64 w-104">
                                <p className="mt-4 ml-4 text-lg text-gray-600">Book Summary: {selectedBook.first_sentence}</p>
                            </div>
                            <p className="mt-4 ml-4  text-sm text-gray-600 overflow-auto">Number of Pages: {selectedBook.number_of_pages_median}</p>
                            <form onSubmit={handleCloseModal}>
                                <label className="mt-4 ml-4  text-sm text-gray-600" htmlFor="pagesRead">Pages Read:</label>
                                <input id="pagesRead" type="number" value={pagesRead} onChange={(e) => setPagesRead(parseInt(e.target.value, 10))} />
                                <div className="flex justify-end items-end mt-auto">
                                    <Buttons
                                        text={'Save'}
                                        type="submit"
                                        onClick={() => {
                                            setPagesRead(pagesRead);
                                        }}
                                    />
                                    <Buttons text={'Close'} onClick={handleCloseModal} type={'button'} />
                                </div>
                            </form>
                        </div>
                    </div>
                )
            )}

        </>
    );
};