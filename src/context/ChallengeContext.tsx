// React
import { createContext, ReactNode, useEffect, useState } from 'react';
// Components
import { LevelUpModal } from '../components/LevelUpModal';
// Hooks
import { useAuth } from '../hooks/useAuth';
// Database
import { database, doc, getDoc, setDoc } from '../service/index';
// JSON
import challenges from '../../challenges.json';

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

type LocalStorageProps = {
  name: string;
  level: number;
  currentXP: number;
  challengesCompleted: number;
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
type FirestoreUserProps = Record<string,number>;

const ChallengeContext = createContext({} as ChallengeContextProps);

function ChallengeContextProvider({children, ...rest}:ReactChildrenProps){
  const [level, setLevel] = useState(1);
  const [currentXP, setCurrentXP] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState<ChallengeProps>(null);
  const [ isLevelUpModalOpen, setIsLevelUpModalOpen ] = useState(false);
  const { user, name, setName } = useAuth();
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  
  useEffect(() => {
    Notification.requestPermission();
  }, [])


  // Usuário autenticado, informações são retiradas do banco de dados
  useEffect(() => {
    if(isFirstLoad){
      return;
    }
    (async()=>{
      if(user){
        const userData = {
          name: user.name,
          avatar: user.avatar,
          level,
          challengesCompleted,
          experience: currentXP
        }
        try {
          const docRef = doc(database,'leaderboard',user.id);
          await setDoc(docRef, userData);
          console.log('posting');
         
        } catch (error) {console.error(error)}
      } 
    })();
  }, [user, level, currentXP, challengesCompleted])

  useEffect(() => {
    (async()=>{
      if(user){
        const query = doc(database,'leaderboard',user.id);
        const result = await getDoc(query);

        if(result.exists()){
          const userScore:FirestoreUserProps = result.data();
          setLevel(userScore.level);
          setCurrentXP(userScore.experience);
          setChallengesCompleted(userScore.challengesCompleted);
          console.log('fetching');
        }
        setIsFirstLoad(false);
      }
      
    })();
  }, [user]);
  


  // Usuário não atenticado, toda informação é guardada no localStorage
  useEffect(() => {
    if(user) return;
    const storage:LocalStorageProps = JSON.parse(localStorage.getItem('userScore'));
    if(!storage) return;
    setName(storage.name);
    setLevel(storage.level);
    setCurrentXP(storage.currentXP);
    setChallengesCompleted(storage.challengesCompleted);
  }, []);

  useEffect(() => {
    if(user) return;

    localStorage.setItem('userScore',JSON.stringify({
      name,
      level,
      currentXP,
      challengesCompleted
    }));

  }, [level, currentXP, challengesCompleted])


  // Funções contendo a regra do jogo
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