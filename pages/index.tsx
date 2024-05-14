import { Provider } from 'react-redux';
import store from '../src/store/store';
import { AppProps } from 'next/app';
import Layout from '../src/app/layout'
import HamburgerMenu from '../src/components/HamburgerMenu'
import LibrarySearch from '../src/components/LibrarySearch'

const Home = ({ Component, pageProps, router }: AppProps) => (
    <Provider store={store}>
        <Layout>
            <div className="flex flex-col items-center  min-h-screen py-2">
                <HamburgerMenu />
                <div>
                    <h1 className="neon-text ">The BookLib </h1>
                </div>
                <LibrarySearch />

            </div>
        </Layout>
    </Provider>
)

export default Home