// React
import { useEffect } from 'react';
// Next
import { GetServerSideProps, GetStaticProps } from 'next';
import Head from 'next/head';
// Components
import { NavBar } from '../components/NavBar';
// Hooks
import { useAuth } from '../hooks/useAuth';
// Database
import { database, getDocs, collection, query, limit, orderBy } from '../service';
// Style
import styles from '../styles/pages/leaderboard.module.scss';  
import AppWrapper from '../components/AppWrapper';
import { Table } from '../components/Table';

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

export default function Leaderboard({leaderboard}:LeaderBoardProps){
  const { setCurrentPage } = useAuth();

  useEffect(() => {
    setCurrentPage('leaderboard')
  }, [])

  return(
    <AppWrapper>
      <div className={styles.container}>
        
        <Head>
          <title>Leaderboard | MoveIt</title>
        </Head>
        
        <h1>Leaderboard</h1>
        <Table leaderboard={leaderboard}/>

        <p>Apenas usuários autenticados aparecerão no leaderboard!</p>
        
      </div>
    </AppWrapper>
  );
}



/* export const getStaticProps:GetStaticProps = async()=>{
  
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
      },
      revalidate: 10
    }
  }

  return {
    props:{
      leaderboard: null
    },
    revalidate: 10
  }
} */

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