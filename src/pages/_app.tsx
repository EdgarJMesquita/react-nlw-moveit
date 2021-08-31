import { NavBar } from '../components/NavBar';
import { CountdownContextProvider } from '../context/CountdownContext';
import { ChallengeContextProvider } from '../context/ChallengeContext';
import '../styles/globals.scss';
import { AuthContextProvider } from '../context/AuthContext';

function MyApp({ Component, pageProps }) {
  return(
    <AuthContextProvider>
      <ChallengeContextProvider>
        <CountdownContextProvider>
          <NavBar />
          <Component {...pageProps} />
        </CountdownContextProvider>
      </ChallengeContextProvider>
    </AuthContextProvider>
    ) 
}

export default MyApp
