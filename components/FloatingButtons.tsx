'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './FloatingButtons.module.css';

export default function FloatingButtons() {
  const [isVisible, setIsVisible] = useState(true);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const resetTimeout = useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    const newTimeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 3000);
    
    setTimeoutId(newTimeoutId);
  }, [timeoutId]);

  const showButtons = useCallback(() => {
    setIsVisible(true);
    resetTimeout();
  }, [resetTimeout]);

  useEffect(() => {
    resetTimeout();
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [resetTimeout, timeoutId]);

  return (
    <>
      <div 
        className={styles.triggerArea}
        onMouseEnter={showButtons}
        onClick={showButtons}
        onTouchStart={showButtons}
      />
      <div 
        className={`${styles.floatingContainer} ${!isVisible ? styles.hidden : ''}`}
      >
        <button className={styles.floatingButton}>
          按钮1
        </button>
        <button className={styles.floatingButton}>
          按钮2
        </button>
      </div>
    </>
  );
} 