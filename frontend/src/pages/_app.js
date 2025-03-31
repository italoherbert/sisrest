import { AuthProvider } from '../context/AuthProvider';
import '../styles/globals.css';

import Head from 'next/head';

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Component {...pageProps} />
        </AuthProvider>
    );
}

export default MyApp;