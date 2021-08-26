import { useContext } from 'react';
import { ChallengeContext } from '../context/ChallengeContext';

export default function useChallenge(){
  return useContext(ChallengeContext)
}