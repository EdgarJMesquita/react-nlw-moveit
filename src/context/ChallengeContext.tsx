import { createContext, ReactNode, useEffect, useState } from 'react';
import { LevelUpModal } from '../components/LevelUpModal';
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';

type ReactChildrenProps = {
  children: ReactNode;
  level: number;
  currentXP: number;
  challengesCompleted: number;
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

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level),{sameSite:'strict'});
    Cookies.set('currentXP', String(currentXP),{sameSite:'strict'});
    Cookies.set('challengesCompleted', String(challengesCompleted),{sameSite:'strict'});
    
  }, [level, currentXP, challengesCompleted])

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