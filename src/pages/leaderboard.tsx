import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { database, getDocs, collection, query, limit, orderBy } from '../service';

import styles from '../styles/pages/leaderboard.module.scss';  

type LeaderBoard = {
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
      <Head>
        <title>Leaderboard | MoveIt</title>
      </Head>
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
  
  const docRef = collection(database,'leaderboard');
  const docQuery = query(docRef, orderBy('level','desc'), orderBy('experience','desc'), limit(50));
  //const docQuery = query(docRef, orderBy('level','desc'), limit(50));
  const result = await getDocs(docQuery);
  
  if(!result.empty){
    let leaderboard = [];
    result.forEach(doc=>{
      leaderboard = [...leaderboard, doc.data()]
    })
    return {
      props: {
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