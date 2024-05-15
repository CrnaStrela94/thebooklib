import React from 'react';
import HamburgerMenu from '@/components/HamburgerMenu';
import Layout from '@/app/layout';
import { Provider } from 'react-redux';
import store from '../src/store/store';
import { ReadBooks } from '@/components/ReadBooks';

export default function FavAuthor() {
    return (
        <Provider store={store}>
            <Layout>
                <div className="flex flex-col items-center min-h-screen py-2">
                    <HamburgerMenu />
                    <ReadBooks />
                </div>
            </Layout>
        </Provider>
    );
}