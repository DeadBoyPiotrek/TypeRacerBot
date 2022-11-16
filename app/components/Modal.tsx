'use client';

import styles from './Modal.module.scss';
import { useState } from 'react';

const Modal = () => {
  const [url, setUrl] = useState('');
  const raceHandler = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    await fetch('/api/race', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify({ url }),
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          <span className={styles.title}>🏁</span>
          Put ur seat bels on
        </h1>
        <form onSubmit={raceHandler}>
          <input
            placeholder="enter lobby url"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
          <span>AND</span>
          <button type="submit"> race </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
