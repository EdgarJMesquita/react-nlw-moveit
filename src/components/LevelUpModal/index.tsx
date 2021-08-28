import useChallenge from '../../hooks/useChallenge';
import styles from './styles.module.scss';

export function LevelUpModal(){
  const { level, setIsLevelUpModalOpen } = useChallenge();

  return(
    <div className={styles.overlay}>
       <div className={styles.container}>
         <header>{level}</header>
         
         <strong>Parabéns</strong>
         
         <p>Você alcançou um novo level.</p>
         
         <button type="button" onClick={()=>setIsLevelUpModalOpen(false)}>
            <img src="/icons/close.svg" alt="Fechar" />
         </button>
       </div>
    </div>
  );
}