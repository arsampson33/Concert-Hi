import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {useState} from 'react'
import { Routes, Route } from 'react-router-dom';
import { getUser } from './utilities/users-service';
import AuthPage from './pages/AuthPage';
import FindConcert from './pages/FindConcert';
import Chat from './pages/Chat';
import Concert from './pages/Concert';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar/NavBar';
import Profile from './pages/Profile';
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
  integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
  crossorigin="anonymous"
/>

function App() {
  const [user, setUser] = useState(getUser())
  return (
    <main className='App'>
      { user ?
      <>
      <NavBar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={ <HomePage user={user} setUser={setUser}/> }/>
          <Route path="/chat" element={ <Chat/> }/>
          <Route path="/findconcert" element={ <FindConcert/>} />
          <Route path="/concert/:concertId" element={ <Concert user={user} />} />
          <Route path="/profile/:username" element={ <Profile/>} />
        </Routes>
      </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}

export default App;
