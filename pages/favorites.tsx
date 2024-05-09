import React from 'react';
import HamburgerMenu from '@/components/HamburgerMenu';
import Layout from '@/app/layout';
import { Provider, useSelector } from 'react-redux';
import { selectFavoriteBooks } from '@/store/favoriteBookSlice';
import { BookList } from '@/components/BookList';
import store from '@/store/store';
import { AppProps } from 'next/app';

const FavoritesContent = () => {
    const favoriteBooks = useSelector(selectFavoriteBooks);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <HamburgerMenu />
            <h1>My Favorites</h1>
            <BookList books={favoriteBooks} />
        </div>
    );
};

export default function Favorites({ Component, pageProps, router }: AppProps) {
    return (
        <Provider store={store}>
            <Layout>
                <FavoritesContent />
            </Layout>
        </Provider>
    );
}