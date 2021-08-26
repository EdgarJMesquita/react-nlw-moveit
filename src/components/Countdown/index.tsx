import { useEffect, useState } from 'react';
import useChallenge from '../../hooks/useChallenge';
import useCountdown from '../../hooks/useCountdown';
import styles from './styles.module.scss';

export default function Countdown(){
  const { currentChallenge } = useChallenge();
  const { hasFinish, seconds, minutes , isActive, startCountdown, resetCountdown } = useCountdown();
  const [minuteLeft, minuteRight] = minutes.toString().padStart(2,'0').split('');
  const [secondLeft, secondRight] = seconds.toString().padStart(2,'0').split('');

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
      (<button
        disabled
        className={styles.startCountdownButton}
        >
          <span>Ciclo encerrado</span>
        </button>)
        :  
        isActive? 
        (<button 
          onClick={resetCountdown}
          type="button" 
          className={`${styles.startCountdownButton} ${styles.startCountdownButtonActive}`}
        >
          <span>Abandonar um ciclo</span>
          
        </button>)
        :
        (<button 
          onClick={startCountdown}
          type="button" 
          className={styles.startCountdownButton}
        >
         Iniciar um ciclo
        </button>)
      }

    </div>  
  );
}