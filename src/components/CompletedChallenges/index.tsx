import useChallenge from '../../hooks/useChallenge';
import styles from './styles.module.scss';

export default function CompletedChallenges(){
  const { challengesCompleted } = useChallenge();
  return(
    <div className={styles.completedChallenges}>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </div>
  )
}