import React, { useState, useEffect } from 'react';
import { authService } from '../fBase';
import AppRouter from './AppRouter';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(()=>{
    // 로그인이 되었나 확인하기 위한 메소드
    // onAuthStateChanged는 로그인, 로그아웃될시 호출되는 메소드임,.
    // 또한 어플리케이션이 초기화됐을때
    authService.onAuthStateChanged((user)=>{
      if(user){
        setUserObj(user);
      }
      // init은 항상 true
      setInit(true);
    })
  }, [])
  return (
  <>
    {/* userObj가 있다면 로그인되고 userObj가 없다면 로그인 되지 않음 */}
    {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj}/> : "Initializing..."}
    {/* <footer>&copy; {new Date().getFullYear()} Nwitter</footer> */}
  </>
  )
}

export default App;
