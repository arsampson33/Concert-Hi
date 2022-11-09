import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
import { Routes, Route } from 'react-router-dom';
import { getUser } from './utilities/users-service';
import AuthPage from './pages/AuthPage';
import Feed from './pages/Feed';
import Chat from './pages/Chat';
import Concert from './pages/Concert';
import NavBar from './components/NavBar';


function App() {
  const [user, setUser] = useState(getUser())
  return (
    <main className='App'>
      { user ?
      <>
      <NavBar user={user} setUser={setUser} />
        <Routes>
          <Route path="/chat" element={ <Chat/> }/>
          <Route path="/feed" element={ <Feed/>} />
          <Route path="/concert/:id" element={ <Concert/>} />
        </Routes>
      </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}

export default App;
