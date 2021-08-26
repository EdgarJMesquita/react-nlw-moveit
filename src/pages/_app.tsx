import { ChallengeContextProvider } from '../context/ChallengeContext';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return(
    <ChallengeContextProvider>
      <Component {...pageProps} />
    </ChallengeContextProvider>
  ) 
}

export default MyApp
