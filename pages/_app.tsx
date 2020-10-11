import type { AppProps } from 'next/app';
import { GeistProvider, CssBaseline } from '@geist-ui/react';
import { Auth } from '../containers/auth-container';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GeistProvider>
      <CssBaseline />
      <Auth.Provider>
        <Component {...pageProps} />
      </Auth.Provider>
    </GeistProvider>
  );
}

export default MyApp;
