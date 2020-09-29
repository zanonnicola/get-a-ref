import type { AppProps } from 'next/app';
import { Auth } from '../containers/auth-container';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth.Provider>
      <Component {...pageProps} />
    </Auth.Provider>
  );
}

export default MyApp;
