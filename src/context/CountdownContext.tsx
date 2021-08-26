import { ReactNode, createContext, useState, useEffect } from "react"
import useChallenge from "../hooks/useChallenge";

type CountdownContextProviderProps = {
  minutes: number;
  seconds: number;
  isActive: boolean;
  hasFinish: boolean;
  startCountdown:()=>void;
  resetCountdown:()=>void;
}

let countdownTimeout:NodeJS.Timeout;

const CountdownContext = createContext({} as CountdownContextProviderProps);


function CountdownContextProvider({children}:Record<string,ReactNode>){

  const { startNewChallenge, currentChallenge } = useChallenge();
  const [time, setTime] = useState(0.05 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinish, setHasFinish] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  function startCountdown(){
    setIsActive(true);
  }

  function resetCountdown(){ 
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(0.1 * 60);
    setHasFinish(false);
  }
  
  useEffect(() => {
    if(isActive && time > 0){
      countdownTimeout = setTimeout(()=>{
        setTime(time-1)
      },1000)
    
    }else if(isActive && time===0){
      setHasFinish(true);
      setIsActive(false);
      startNewChallenge();
     
    }
  }, [isActive, time]);

  return(
    <CountdownContext.Provider value={{
      minutes,
      seconds,
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