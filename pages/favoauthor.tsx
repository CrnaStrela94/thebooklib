import React from 'react';
import HamburgerMenu from '@/components/HamburgerMenu';
import Layout from '@/app/layout';

export default function FavAuthor() {
    return (<>
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <HamburgerMenu />
                <h1>FavAuthor</h1>
            </div>
        </Layout>
    </>)
}