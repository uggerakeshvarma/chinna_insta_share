
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './app.router';
import { useEffect, useState } from 'react';
import { UserContext } from './JS_FILES/context';

function App() {
  const [user , setUser] = useState(null);

  useEffect(() => {
  getUser1()
  },[])
  
  
  function getUser1(){
    let data = localStorage.getItem("UserData");
    if (data){
      setUser(JSON.parse(data)[0])
    }
  }


  return (
    <div>
      
     <BrowserRouter>
     <UserContext.Provider value={user}>
    <AppRouter></AppRouter>
    </UserContext.Provider>
     </BrowserRouter>
    </div>
  );
}

export default App;
