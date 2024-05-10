import React from 'react';
import HamburgerMenu from '@/components/HamburgerMenu';
import Layout from '@/app/layout';
import { Provider } from 'react-redux';
import store from '@/store/store';
import { AppProps } from 'next/app';
import FavoriteBooks from '@/components/FavoriteBooks';


export default function Favorites({ Component, pageProps, router }: AppProps) {
    return (
        <Provider store={store}>
            <Layout>
                <HamburgerMenu />
                <FavoriteBooks />
            </Layout>
        </Provider>
    );
}