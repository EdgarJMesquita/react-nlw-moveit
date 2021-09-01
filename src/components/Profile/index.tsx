
import { useRouter } from 'next/dist/client/router';
import { useAuth } from '../../hooks/useAuth';
import useChallenge from '../../hooks/useChallenge';
import styles from './Profile.module.scss';


export default function Profile(){
  const { level } = useChallenge();
  const { user, name } = useAuth();
  const router = useRouter();

  return(
    <div className={styles.profileContainer}>
      <img src={user? user.avatar: name? `https://avatars.dicebear.com/api/human/${name}.svg`:'icons/avatar.svg'} alt={user? user.name: name? name:'Player 404'} />
      <div>
        <strong>{user? user.name: name? name:'Player 404'}</strong>
        <p>
          <img src="icons/Up.svg" alt="Up" />  
          Level {level}
        </p>
      </div>

      {!user && 
        <div onClick={()=>router.push('/login')} className={styles.githubButton} title="Login ou Mudar nome do usuário"> 
          <img src="icons/github-icon.svg" alt="github" />
          <p>Login</p>
        </div>
      }
    </div>
  );
}