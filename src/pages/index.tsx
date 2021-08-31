import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import ExperienceBar from '../components/ExperienceBar';
import Profile from '../components/Profile';
import CompletedChallenges from '../components/CompletedChallenges';
import Countdown from '../components/Countdown';
import ChallengeBox from '../components/ChallengeBox';
import Head from 'next/head';
import useChallenge from '../hooks/useChallenge';
import styles from '../styles/pages/Home.module.scss';

type HomeProps = {
  level: number;
  currentXP: number;
  challengesCompleted: number;
} 

export default function Home({level,currentXP, challengesCompleted}:HomeProps) {
  const { setLevel, setCurrentXP, setChallengesCompleted} = useChallenge();
  useEffect(() => {
    setLevel(level)
    setCurrentXP(currentXP)
    setChallengesCompleted(challengesCompleted)
    
  }, [level,currentXP,challengesCompleted])

  return (
   <>
      <div className={styles.container}>
        <Head>
          <title>Home | Moveit</title>
        </Head>

        <ExperienceBar />
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
      </div>
    </>
  )
}

export const getServerSideProps:GetServerSideProps = async ({req}) => {
  const { level, currentXP, challengesCompleted } = req.cookies;

  return{
    props:{
      level: Number(level),
      currentXP: Number(currentXP),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}