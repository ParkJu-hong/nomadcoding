import React, { useState, useEffect } from 'react';
import { authService } from '../fBase';
import AppRouter from './AppRouter';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
    // 로그인이 되었나 확인하기 위한 메소드
    authService.onAuthStateChanged((user)=>{
      console.log(user)
      if(user){
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  }, [])
  return (
  <>
    {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
    <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
  </>
  )
}

export default App;
