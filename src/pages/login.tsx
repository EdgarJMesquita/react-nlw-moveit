import { FormEvent, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/dist/client/router';
import { useAuth } from '../hooks/useAuth';
import styles from '../styles/pages/login.module.scss';


export default function Login(){
  const router = useRouter();
  const { name, setName, user, signInWithGithub } = useAuth();

  async function handleSignInWithGithub(){
    if(!user){
      signInWithGithub();
    }
  }

  function handleNoAuthUser(event:FormEvent<HTMLFormElement>){
    event.preventDefault();

    if(!user && name.length>2){
      router.push('/');
    }
  }

  useEffect(() => {
    if(user){
      router.push('/');
    }
  }, [user])

  return (
    <div className={styles.container}>
      <Head>
        <title>Login | MoveIt</title>
      </Head>
      <section>

        <aside className={styles.bigLogo}>
          <img src="icons/big-logo.svg" alt="big logo" />
        </aside>

        <main className={styles.form}>
          <img src="icons/moveit.svg" alt="moveit"/>

          <div className={styles.loginSighGithub}>
            <h1>Bem-vindo</h1>
            <div onClick={handleSignInWithGithub}>
              <img src="icons/github-icon.svg" alt="github ícone" />
              <span>Faça login com seu Github para começar</span>
            </div>
          </div>

          <p>ou</p>

          <form onSubmit={handleNoAuthUser} className={styles.inputContainer}>
            <div>
              <input onChange={(e)=>setName(e.target.value)} type="text" placeholder="Digite seu nome" />
            </div>
            <button type="submit">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H75C77.7614 0 80 2.23858 80 5V75C80 77.7614 77.7614 80 75 80H0V0Z" fill={name.length < 2? '#4953B8':'#4CD62B'}/>
                <path d="M28 41.5L46.255 41.5L37.87 49.885L40 52L52 40L40 28L37.885 30.115L46.255 38.5L28 38.5L28 41.5Z" fill="white"/>
              </svg>
            </button>

          </form>
        </main>

      </section>
    </div>  
  );
}