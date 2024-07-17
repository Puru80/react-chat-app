import {BrowserRouter, Navigate} from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home'
import ChatPage from './components/ChatPage'

import socketIO from "socket.io-client";
import SignUp from "./components/SignUp.jsx";
import Login from "./components/Login.jsx";
const socket = socketIO.connect("http://localhost:8080");

function App() {

  return (
    <BrowserRouter>
      <div>
        <Routes>
          {/*<Route path="/" element={<Home socket={socket} />}></Route>*/}
          <Route path="/" element={<Navigate to="/login" replace />}></Route>
          <Route path="/register" element={<SignUp/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/home" element={<Home socket={socket} />}></Route>
          <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
