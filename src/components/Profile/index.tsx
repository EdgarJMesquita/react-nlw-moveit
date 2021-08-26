import useChallenge from '../../hooks/useChallenge';
import styles from './Profile.module.scss';

export default function Profile(){
  const { level } = useChallenge();
  return(
    <div className={styles.profileContainer}>
      <img src="https://github.com/edgarxongas.png" alt="Edgar Jonas" />
      <div>
        <strong>Edgar Jonas</strong>
        <p>
          <img src="icons/Up.svg" alt="Up" />  
          Level {level}
        </p>
      </div>
    </div>
  );
}