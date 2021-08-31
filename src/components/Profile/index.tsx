
import { useAuth } from '../../hooks/useAuth';
import useChallenge from '../../hooks/useChallenge';
import styles from './Profile.module.scss';


export default function Profile(){
  const { level } = useChallenge();
  const { user } = useAuth();

  return(
    <div className={styles.profileContainer}>
      <img src={user? user.avatar: 'icons/avatar.svg'} alt={user? user.name: 'avatar'} />
      <div>
        <strong>{user? user.name:'Player 1'}</strong>
        <p>
          <img src="icons/Up.svg" alt="Up" />  
          Level {level}
        </p>
      </div>
    </div>
  );
}