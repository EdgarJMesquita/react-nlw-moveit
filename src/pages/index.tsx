import ExperienceBar from '../components/ExperienceBar';
import Profile from '../components/Profile';
import CompletedChallenges from '../components/CompletedChallenges';
import Countdown from '../components/Countdown';
import ChallengeBox from '../components/ChallengeBox';
import Head from 'next/head';
import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { GetStaticProps } from 'next';
import styles from '../styles/pages/Home.module.scss';
import AppWrapper from '../components/AppWrapper';


export default function Home() {
  const { setCurrentPage } = useAuth();

  useEffect(() => {
    setCurrentPage('home');
  }, []);
  
  return (
    <AppWrapper>
      <div className={styles.container}>
        <Head>
          <title>Home | MoveIt</title>
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
    </AppWrapper>
  )
}