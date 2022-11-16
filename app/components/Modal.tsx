'use client';

import styles from './Modal.module.scss';
import { useState } from 'react';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import useMeasure from 'react-use-measure';
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

  const [ref, bounds] = useMeasure();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-250, 250], [-10, 10]);
  const rotateY = useTransform(mouseX, [-165, 165], [10, -10]);
  return (
    <div className={styles.wrapper}>
      <motion.div
        className={styles.container}
        ref={ref}
        style={{ rotateX, rotateY, z: 100 }}
        onPointerMove={e => {
          mouseX.set(e.clientX - bounds.x - bounds.width / 2);
          console.log('x', e.clientX - bounds.x - bounds.width / 2);
          mouseY.set(e.clientY - bounds.y - bounds.height / 2);
          console.log('y', e.clientY - bounds.y - bounds.height / 2);
        }}
        onHoverEnd={() => {
          console.log('hover end');
          mouseX.set(0);
          mouseY.set(0);
        }}
        animate={{
          gradientTransform: ['rotate(0deg)', 'rotate(360deg)'],
        }}
      >
        <h1 className={styles.title}>
          <motion.span
            style={
              {
                // rotateX,
                // rotateY,
              }
            }
            className={styles.title}
          >
            🏁
          </motion.span>
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
      </motion.div>
    </div>
  );
};

export default Modal;
