import React from 'react';
import HamburgerMenu from '@/components/HamburgerMenu';
import Layout from '@/app/layout';
import FavoriteAuthors from '../src/components/FavoriteAuthors';
import { Provider } from 'react-redux';
import store from '../src/store/store'; // import the store

export default function FavAuthor() {
    return (
        <Provider store={store}>
            <Layout>
                <div className="flex flex-col items-center justify-center min-h-screen py-2">
                    <HamburgerMenu />
                    <FavoriteAuthors />
                </div>
            </Layout>
        </Provider>
    );
}