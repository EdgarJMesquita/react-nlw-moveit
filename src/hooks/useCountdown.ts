import { useContext } from "react";
import { CountdownContext } from "../context/CountdownContext";

export default function useCountdown(){
  return useContext(CountdownContext);
}