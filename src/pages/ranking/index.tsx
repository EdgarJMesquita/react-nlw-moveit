import { GetServerSideProps } from 'next';
import { database, getDoc, doc } from '../../../service';
import { useAuth } from '../../hooks/useAuth';

import styles from './styles.module.scss';  

type LeaderBoard = {
  id: string;
  name: string;
  avatar: string;
  level: number;
  experience: number;
  challengesCompleted: number;
}

type LeaderBoardProps = {
    leaderboard: LeaderBoard[] | null;
}

export default function Ranking({leaderboard}:LeaderBoardProps){
  const { user, signInWithGithub } = useAuth();

  return(
    <div className={styles.container}>
      <h1>Leaderboard</h1>
      <button onClick={signInWithGithub}>Click meeee</button>
      <table>
        <thead>
          <tr>
            <th>Posição</th>
            <th>Usuário</th>
            <th>Desafios</th>
            <th>Experiência</th>
          </tr>
        </thead>

        <tbody>
          {leaderboard?.map((user,index)=>(
            <tr key={index}>
              <td>{index+1}</td>
              
              <td>
                <img src={user.avatar} alt={user.name} />
                <div>
                  <strong>{user.name}</strong>
                  <div>
                    <img src="icons/Up.svg" alt="Up" />
                    <span>Level {user.level}</span>
                  </div>
                </div>
              </td>

              <td>
                <span>{user.challengesCompleted}</span>
                completados
              </td>

              <td>
                <span>{user.experience}</span>
                xp
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}



export const getServerSideProps:GetServerSideProps = async()=>{

  const docRef = doc(database,'leaderboard/lZVnG9F2Jy3Mj89rmhhI');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    const leaderboard:LeaderBoard = data.all;
    return{
      props:{
        leaderboard
      }
    }
  } 
  return{
    props:{
      leaderboard: null
    }
  }
}