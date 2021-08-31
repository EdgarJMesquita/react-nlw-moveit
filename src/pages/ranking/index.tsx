import { GetServerSideProps } from 'next';
import { database, getDocs, collection } from '../../service';

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

  return(
    <div className={styles.container}>
      <h1>Leaderboard</h1>
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

  let leaderboard = [];
  const query = collection(database,'leaderboard');
  const docSnap = await getDocs(query);

  docSnap.forEach(doc=>{
    leaderboard = [...leaderboard, doc.data()];
  })
  
  if(leaderboard.length>0){
    return {
      props:{
        leaderboard
      }
    }
  }

  return {
    props:{
      leaderboard: null
    }
  }
}