import {  createContext, ReactNode, useEffect, useState } from 'react';
import { auth, signInWithPopup, GithubAuthProvider } from '../service';

type ReactChildren = {
  children: ReactNode;
}

type UserProps = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextProps = {
  user: UserProps;
  signInWithGithub: ()=>void;
}

const AuthContext = createContext({}as AuthContextProps);

function AuthContextProvider({children}:ReactChildren){
  const [user, setUser] = useState<UserProps>()

  async function signInWithGithub(){
    try {
      const provider = new GithubAuthProvider();
      const { user } = await signInWithPopup(auth,provider);
      
      const _user = {
        id: user.uid,
        name: user.displayName,
        avatar: user.photoURL
      }
      setUser(_user);
      
    } catch (error) { 
      console.error(error);
    }
  }

  useEffect(() => {
    const subscribe = auth.onAuthStateChanged(user=>{
        if(user){
          
          const { displayName, photoURL, uid } = user;
          const _user = {
            id: uid,
            name: displayName,
            avatar: photoURL
          }
          setUser(_user);
        }
      })
    
    return () => {
      subscribe();
    }
  }, [])

  return(
    <AuthContext.Provider value={{
      user,
      signInWithGithub
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }