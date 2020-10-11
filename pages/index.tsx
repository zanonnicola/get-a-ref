import Head from 'next/head';
import Link from 'next/link';
import { Page } from '@geist-ui/react';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <Page>
      <Head>
        <title>Get a Ref</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex" />
      </Head>

      <h1 className={styles.title}>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>

      <Link href="/login">Login</Link>
      <Link href="/profile">Profile</Link>
    </Page>
  );
}
