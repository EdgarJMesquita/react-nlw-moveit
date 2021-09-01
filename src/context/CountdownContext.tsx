import { ReactNode, createContext, useState, useEffect } from "react"
import useChallenge from "../hooks/useChallenge";

type CountdownContextProviderProps = {
  time: number;
  minutes: number;
  seconds: number;
  progress: number;
  isActive: boolean;
  hasFinish: boolean;
  startCountdown:()=>void;
  resetCountdown:()=>void;
}

let countdownTimeout:NodeJS.Timeout;

const CountdownContext = createContext({} as CountdownContextProviderProps);


function CountdownContextProvider({children}:Record<string,ReactNode>){

  const { startNewChallenge } = useChallenge();
  const [ time, setTime ] = useState(0.25 * 60);
  const [ isActive, setIsActive ] = useState(false);
  const [ hasFinish, setHasFinish ] = useState(false);
  const [ initialTime, setInitialTime ] = useState(time);
  const progress = (( initialTime - time) * 100) / initialTime;

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  function startCountdown(){
    setIsActive(true);
  }

  function resetCountdown(){ 
    clearTimeout(countdownTimeout);
    setHasFinish(false);
    setIsActive(false);
    setTime(25 * 60);
    setInitialTime(25 * 60);
  }
  
  useEffect(() => {
    if(isActive && time > 0){
      countdownTimeout = setTimeout(()=>{
        setTime(time-1);
      },1000)
    
    }else if(isActive && time===0){
      clearTimeout(countdownTimeout);
      setHasFinish(true);
      setIsActive(false);
      startNewChallenge();
    }
    
  }, [isActive, time]);

  return(
    <CountdownContext.Provider value={{
      time,
      minutes,
      seconds,
      progress,
      isActive,
      hasFinish,
      resetCountdown,
      startCountdown
    }}>
      {children}
    </CountdownContext.Provider>
  );
}

export { CountdownContext, CountdownContextProvider}