import useChallenge from '../../hooks/useChallenge';
import styles from './ExperienceBar.module.scss';

export default function ExperienceBar(){
  const { currentXP, experienceToNextLevel } = useChallenge();
  const progress = Math.round(currentXP * 100) / experienceToNextLevel;

  return(
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width:`${progress}%` }}/>
        <span className={styles.currentExperience} style={{ left: `${progress}%` }}>
          {currentXP} xp
        </span>
      </div>
      <span>{experienceToNextLevel} px</span>
    </header>
  );
}