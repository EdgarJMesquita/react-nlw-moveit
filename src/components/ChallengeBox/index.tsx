import useChallenge from '../../hooks/useChallenge';
import useCountdown from '../../hooks/useCountdown';
import styles from './styles.module.scss';

export default function ChallengeBox(){
  const { currentChallenge, resetChallenge, completeChallenge } = useChallenge();
  const { resetCountdown } = useCountdown();


  function handleChallengeSucceed(){
    completeChallenge();
    resetCountdown();
  }

  function handleChallengeFailed(){
    resetCountdown();
    resetChallenge();
  }

  return(
    <div className={styles.challengeBoxContainer}>
      {
        currentChallenge? 
        (
          <div className={styles.challengeActive}>
            <header>Ganhe {currentChallenge.amount} xp</header>
            
            <main>
              <img src={`icons/${currentChallenge.type}.svg`} alt="Body" />
              <strong>Novo desafio</strong>
              <p>{currentChallenge.description}</p>
            </main>

            <footer>
              <button 
                type="button"
                className={styles.challengeFailedButton}
                onClick={handleChallengeFailed}
              >
                Falhei
              </button>
              <button 
                type="button"
                className={styles.challengeSucceedButton}
                onClick={handleChallengeSucceed}
              >
                Completei
              </button>
            </footer>
          </div>
        )
        :
        (<div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img src="icons/big-arrow.svg" alt="Level Up" />
            Avance de level completando desafios.
          </p>
        </div>)
      }
    </div>
  );
}