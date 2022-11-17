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

  const [xGradient, setXGradient] = useState(0);
  const [yGradient, setYGradient] = useState(0);
  // function that transforms one range of numbers to another
  const map = (
    value: number,
    in_min: number,
    in_max: number,
    out_min: number,
    out_max: number
  ) => {
    return (
      ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
  };
  return (
    <div className={styles.wrapper}>
      <motion.div
        className={styles.container}
        ref={ref}
        style={{ rotateX, rotateY, z: 100 }}
        onPointerMove={e => {
          mouseX.set(e.clientX - bounds.x - bounds.width / 2);
          setXGradient(
            map(e.clientX - bounds.x - bounds.width / 2, -165, 165, 0, 100)
          );
          setYGradient(
            map(e.clientY - bounds.y - bounds.height / 2, -250, 250, 0, 100)
          );
          mouseY.set(e.clientY - bounds.y - bounds.height / 2);
        }}
        onHoverEnd={() => {
          mouseX.set(0);
          mouseY.set(0);
          setXGradient(0);
          setYGradient(0);
        }}
        animate={{
          background: `radial-gradient(
            at ${xGradient}% ${yGradient}%,
            #8EC5FC 10%,
            rgba(63, 94, 251, 1) 100%
          )`,
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
      {/* <div className={styles.test} /> */}
    </div>
  );
};

export default Modal;
