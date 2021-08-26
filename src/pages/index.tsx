import ExperienceBar from '../components/ExperienceBar';
import Profile from '../components/Profile';
import CompletedChallenges from '../components/CompletedChallenges';
import Countdown from '../components/Countdown';
import ChallengeBox from '../components/ChallengeBox';
import Head from 'next/head';

import styles from '../styles/pages/Home.module.scss';
import { CountdownContextProvider } from '../context/CountdownContext';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home | Moveit</title>
      </Head>

      <ExperienceBar />
      
      <CountdownContextProvider>
        <section>
          <div>
            <Profile />
            <CompletedChallenges />
            <Countdown />
          </div>
          <div>
            <ChallengeBox />
          </div>
        </section>
      </CountdownContextProvider>
    </div>
  )
}
