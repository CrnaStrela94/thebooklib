import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';
import { addFavoriteBook, removeFavoriteBook, selectFavoriteBooks } from '../store/favoriteBookSlice';
import { Book } from '../store/favoriteBookSlice';
import { Author, addFavoriteAuthor, removeFavoriteAuthor, selectFavoriteAuthors } from '../store/favoriteAuthorSlice';
import { Rating, ThinStar } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import Buttons from './btn';
import { AuthorInfoModal } from './AuthorInfoModal';


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
    const [showAuthorInfoModal, setShowAuthorInfoModal] = useState(false);
    const [authorInfo, setAuthorInfo] = useState<any>(null);
    const [review, setReview] = useState<string>('');


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
        const bookReview = localStorage.getItem(`bookReview-${book.key}`);
        setReview(bookReview || '');
        setRatings(prevRatings => {
            const newRatings = { ...prevRatings, [book.key]: rating };
            localStorage.setItem('ratings', JSON.stringify(newRatings));
            return newRatings;
        });


    };


    function handleCloseModal(): void {
        if (selectedBook) {
            localStorage.setItem(`pagesRead-${(selectedBook as Book).key}`, pagesRead.toString());
            localStorage.setItem(`bookReview-${(selectedBook as Book).key}`, review);

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
    const handleAuthorClick = async (author: Author) => {
        const response = await fetch(`https://openlibrary.org/search/authors.json?q=${encodeURIComponent(author.name)}`);
        const data = await response.json();
        setAuthorInfo(data.docs[0]);
        setShowAuthorInfoModal(true);
    };




    return (
        <>
            {data ? (
                <div className="grid grid-cols-4 gap-4 pt-4">

                    {data.map((book: any) => (
                        <div key={book.key} className="flex flex-col items-center justify-between bg-white shadow-lg rounded-lg p-3 md:p-5 lg:p-8" style={{ width: '100%', maxWidth: '25rem', height: 'auto' }}>
                            <div className="flex flex-col items-center justify-center">
                                <img className="w-32 h-48 object-cover mb-4" src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : '/book-cover-svgrepo-com.svg'} alt={book.title} />
                                <h2 className="text-xl font-bold mb-2 truncate" style={{ maxWidth: '90%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal', wordWrap: 'break-word', height: '3rem' }} >{book.title}</h2>
                                <h3 className="text-lg mb-4" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal', wordWrap: 'break-word' }} onClick={() => handleAuthorClick({ id: book.author_name[0], name: book.author_name[0] })}>{book.author_name[0]}</h3>
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
                        <div className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all xs:w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
                            <h2 className="ml-4 mt-4 text-2xl leading-6 font-medium text-black overflow-auto">{selectedBook.title}</h2>
                            <div className="overflow-auto h-16 w-104">
                                <p className="mt-4 ml-4 text-xl text-black overflow-auto"><strong>Author:</strong> {selectedBook.author_name.join(', ')}</p>
                            </div>
                            <div className="overflow-auto ">
                                <p className="mt-4 ml-4 mb-2 text-lg text-gray-900 overflow-auto"><strong>People currently reading the Book:</strong> {selectedBook.currently_reading_count}</p>
                                <p className=" ml-4 text-lg text-gray-900 overflow-auto"><strong>People have read the Book:</strong> {selectedBook.already_read_count}</p>
                                <p className=" ml-4 text-lg text-gray-900 overflow-auto"><strong>People want to read the Book:</strong> {selectedBook.want_to_read_count} </p>
                            </div>
                            <div className="overflow-auto ">
                                <p className="mt-4 ml-4 text-lg text-yellow-400 overflow-auto"><strong>Rating Average:</strong> {selectedBook.ratings_average}</p>
                                <p className="ml-4 text-lg text-yellow-400 overflow-auto"><strong>Rating Count:</strong> {selectedBook.ratings_count}</p>
                            </div>
                            <p className="mt-4 ml-4 text-lg text-gray-900 overflow-auto"><strong>Publishing year:</strong> {selectedBook.first_publish_year}</p>
                            <div className={`overflow-auto w-104 ${selectedBook.first_sentence ? 'h-64' : 'h-10'}`}>
                                <p className="mt-4 ml-4 text-lg text-gray-900">
                                    <strong>Book Summary:</strong> {selectedBook.first_sentence}
                                </p>
                            </div>
                            <div className={`overflow-auto w-104 mt-4 ${Array.isArray(selectedBook.person) && selectedBook.person.length > 0 ? 'h-28' : 'h-32'}`}>
                                <p className="mt-4 ml-4 text-lg text-gray-900 overflow-auto">
                                    <strong>Persons:</strong> {Array.isArray(selectedBook.person) ? selectedBook.person.join(', ') : selectedBook.person}
                                </p>
                            </div>
                            <p className="mt-4 ml-4  text-sm text-gray-900 overflow-auto"><strong>Number of Pages:</strong> {selectedBook.number_of_pages_median}</p>
                            <form onSubmit={handleCloseModal}>
                                <label className="mt-4 ml-4  text-sm text-gray-600" htmlFor="pagesRead">Pages Read:</label>
                                <input id="pagesRead" type="number" value={pagesRead} onChange={(e) => setPagesRead(parseInt(e.target.value, 10))} />
                                <label
                                    className="mt-4 ml-4 text-sm text-gray-600 border "
                                    htmlFor="review"
                                >
                                    Review:
                                </label>
                                <textarea
                                    id="review"
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                    className="border overflow-auto h-28 "
                                />

                                <div className="flex justify-end items-end mt-auto">
                                    <Buttons text={'Save'} type="submit" onClick={() => { setPagesRead(pagesRead); }}
                                    />
                                    <Buttons text={'Close'} onClick={handleCloseModal} type={'button'} />
                                </div>
                            </form>
                        </div>
                    </div>
                )
            )}
            {showAuthorInfoModal && authorInfo && (
                <AuthorInfoModal authorInfo={authorInfo} onClose={() => setShowAuthorInfoModal(false)} author={{
                    url: undefined,
                    name: undefined
                }} />
            )}


        </>
    );
};