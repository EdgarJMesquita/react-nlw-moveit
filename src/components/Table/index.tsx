import styles from './styles.module.scss';

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


export function Table({leaderboard}:LeaderBoardProps){
  return(
    <table className={styles.leaderboardTable}>
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
                
                <td className={styles.profile}>
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
  );
}