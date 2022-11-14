import Head from 'next/head';
import React, { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [url, setUrl] = useState('');
  const raceHandler = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const response = await fetch('/api/race', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify({ url }),
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Put ur seat bels on</h1>
        <form onSubmit={raceHandler}>
          <input
            placeholder="enter race url"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
          <button type="submit">lets race 🏎️</button>
        </form>
      </main>
    </div>
  );
}
