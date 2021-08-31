import { createContext, ReactNode, useEffect, useState } from 'react';
import { LevelUpModal } from '../components/LevelUpModal';
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';
import { database, doc, getDoc, setDoc } from '../service/index';
import { useAuth } from '../hooks/useAuth';

type ReactChildrenProps = {
  children: ReactNode;
  level?: number;
  currentXP?: number;
  challengesCompleted?: number;
}

type ChallengeProps = {
  type: string;
  description: string;
  amount: number;
}

type ChallengeContextProps = {
  level: number;
  currentXP: number;
  challengesCompleted: number;
  currentChallenge: ChallengeProps | null;
  experienceToNextLevel: number;
  isLevelUpModalOpen: boolean;
  setLevel:(value:number)=>void;
  setCurrentXP: (value:number)=>void;
  setChallengesCompleted: (value:number)=>void;
  setIsLevelUpModalOpen: (key:boolean)=>void;
  levelUp: ()=>void;
  startNewChallenge: ()=>void;
  resetChallenge: ()=>void;
  completeChallenge: ()=>void;
}

const ChallengeContext = createContext({} as ChallengeContextProps);

function ChallengeContextProvider({children, ...rest}:ReactChildrenProps){
  const [level, setLevel] = useState(rest.level?? 1);
  const [currentXP, setCurrentXP] = useState(rest.currentXP?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted?? 0);
  const [currentChallenge, setCurrentChallenge] = useState<ChallengeProps>(null);
  const [ isLevelUpModalOpen, setIsLevelUpModalOpen ] = useState(false);
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)
  const { user } = useAuth();
  
  useEffect(() => {
    Notification.requestPermission();
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level),{sameSite:'strict'});
    Cookies.set('currentXP', String(currentXP),{sameSite:'strict'});
    Cookies.set('challengesCompleted', String(challengesCompleted),{sameSite:'strict'});
    
  }, [level, currentXP, challengesCompleted])

  useEffect(() => {
    (async()=>{

      if(user){
        try {
          const userData = {
            name: user.name,
            avatar: user.avatar,
            level,
            challengesCompleted,
            experience: currentXP
          }
          const docRef = doc(database,'leaderboard',user.id);
          const docSnap = await setDoc(docRef, userData);
          
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, [user, level, currentXP, challengesCompleted])

  type FirestoreUserProps = Record<string,number>

  type FirestoreUserProp = {
    level: number;
    experience: number;
    challangesCompleted: number;
  }
  useEffect(() => {
    (async()=>{
      if(user){
        const query = doc(database,'leaderboard',user.id)
        const result = await getDoc(query);
        const userScore:FirestoreUserProps = result.data();
        setLevel(userScore.level);
        setCurrentXP(userScore.experience);
        setChallengesCompleted(userScore.challengesCompleted);
      }
    })();
  }, [user])

  function levelUp(){
    setLevel(prev=>(prev+1));
    setIsLevelUpModalOpen(true);
  }


  function startNewChallenge(){
    const randomIndex = Math.floor(Math.random() * challenges.length);
    const _currentChallenge = challenges[randomIndex];
    setCurrentChallenge(_currentChallenge);

    new Audio('/notification.mp3').play();

    if(Notification.permission === 'granted'){
      new Notification('Novo desafio',{
        body: `Valendo ${_currentChallenge?.amount} xp`
      });
    }
  }


  function resetChallenge(){
    setCurrentChallenge(null);
    
  }


  function completeChallenge(){
    if(!currentChallenge){
      return;
    }

    const { amount } = currentChallenge;
    let finalExperience = currentXP + amount;

    
    if(finalExperience >= experienceToNextLevel){
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
      
    } 

    setCurrentXP(finalExperience);
    setChallengesCompleted(prev=>(prev + 1));
    setCurrentChallenge(null);
    
  }

  return(
    <ChallengeContext.Provider value={{
      level,
      currentXP,
      challengesCompleted,
      currentChallenge,
      experienceToNextLevel,
      isLevelUpModalOpen,
      setChallengesCompleted,
      setLevel,
      setCurrentXP,
      setIsLevelUpModalOpen,
      levelUp,
      startNewChallenge,
      resetChallenge,
      completeChallenge
    }}>
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengeContext.Provider>
  )
}

export { ChallengeContext, ChallengeContextProvider }