import React from 'react';
import HamburgerMenu from '@/components/HamburgerMenu';
import Layout from '@/app/layout';

export default function Favorites() {
    return (<>
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <HamburgerMenu />
                {/* <LibrarySearch /> */}
                <h1>Page 2</h1>
            </div>
        </Layout>
    </>)
}