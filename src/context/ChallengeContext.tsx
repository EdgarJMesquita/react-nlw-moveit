import challenges from '../../challenges.json';

import { createContext, ReactNode, useEffect, useState } from 'react';
import useCountdown from '../hooks/useCountdown';

type ReactChildrenProps = {
  children: ReactNode;
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
  levelUp: ()=>void;
  startNewChallenge: ()=>void;
  resetChallenge: ()=>void;
  completeChallenge: ()=>void;
}

const ChallengeContext = createContext({} as ChallengeContextProps);


function ChallengeContextProvider({children}:ReactChildrenProps){
  const [level, setLevel] = useState(1);
  const [currentXP, setCurrentXP] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState<ChallengeProps>(null);
  
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  function levelUp(){
    setLevel(prev=>(prev+1));
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
      levelUp,
      startNewChallenge,
      resetChallenge,
      completeChallenge
    }}>
      {children}
    </ChallengeContext.Provider>
  )
}

export { ChallengeContext, ChallengeContextProvider }