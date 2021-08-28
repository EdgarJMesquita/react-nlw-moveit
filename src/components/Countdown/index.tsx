import { useEffect, useState } from 'react';
import useCountdown from '../../hooks/useCountdown';
import styles from './styles.module.scss';

export default function Countdown(){
  const { hasFinish, progress, seconds, minutes , isActive, startCountdown, resetCountdown } = useCountdown();
  const [ minuteLeft, minuteRight ] = minutes.toString().padStart(2,'0').split('');
  const [ secondLeft, secondRight ] = seconds.toString().padStart(2,'0').split('');

  return(
    <div>

      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      { hasFinish? 
      (
        <>
        <button
          disabled
          className={styles.startCountdownButton}
          >
            <span>Ciclo encerrado</span>
            <img src="/icons/done.svg" alt="done" />
          </button>
          <div className={styles.progressBarButton}>
            <div style={{width: `100%`}}/>
          </div>
        </>
        )
        :  
        isActive? 
        (
        <>
          <button 
            onClick={resetCountdown}
            type="button" 
            className={`${styles.startCountdownButton} ${styles.startCountdownButtonActive}`}
          >
            <span>Abandonar um ciclo</span>
            <img src="/icons/close.svg" className="close" alt="close" />
          </button>
          <div className={styles.progressBarButton}>
            <div style={{width: `${progress}%`}}/>
          </div>
        </>
        ):(
        <button 
          onClick={startCountdown}
          type="button" 
          className={styles.startCountdownButton}
        >
         <span>
          Iniciar um ciclo
         </span>
         <img src="/icons/play.svg" alt="play" />
        </button>)
      }

    </div>  
  );
}