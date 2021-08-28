import ExperienceBar from '../components/ExperienceBar';
import Profile from '../components/Profile';
import CompletedChallenges from '../components/CompletedChallenges';
import Countdown from '../components/Countdown';
import ChallengeBox from '../components/ChallengeBox';
import Head from 'next/head';

import styles from '../styles/pages/Home.module.scss';
import { CountdownContextProvider } from '../context/CountdownContext';
import { GetServerSideProps } from 'next';
import Cookies from 'js-cookie';
import { ChallengeContextProvider } from '../context/ChallengeContext';

type HomeProps = {
  level: number;
  currentXP: number;
  challengesCompleted: number;
}

export default function Home({level,currentXP,challengesCompleted}:HomeProps) {

  return (
    <ChallengeContextProvider level={level} currentXP={currentXP} challengesCompleted={challengesCompleted}>
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
    </ChallengeContextProvider>
  )
}

export const getServerSideProps:GetServerSideProps = async ({req}) => {
  const {level, currentXP, challengesCompleted} = req.cookies;

  return{
    props:{
      level: Number(level),
      currentXP: Number(currentXP),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}