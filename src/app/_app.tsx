import { Provider } from 'react-redux'
import store from '../store/store'
import React from 'react'
import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => (
    <React.StrictMode>
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    </React.StrictMode>
);

export default App