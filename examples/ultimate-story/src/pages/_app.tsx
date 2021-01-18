import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

const App = ({ Component, pageProps }: AppProps) => (
    <>
        <Head>
            <title>@prezly/slate-renderer - ultimate-story example</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>

        <Component {...pageProps} />
    </>
);

export default App;
