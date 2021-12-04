import { useState } from 'react';
import Axios from 'axios'
import { useHistory } from 'react-router';
import "./App.css"
import Profile from './Profile';
import { useEffect } from "react";
import {Nav, Navbar, Container} from "react-bootstrap"

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    let history = useHistory()


  const login = async () => {
      let users = []
      const respone = await fetch('http://localhost:3001/login_validation')
      const data = await respone.json()

      for await (let user of data) {
        if (user.login === username && user.password === password) {
          localStorage.setItem('user', username)
          localStorage.setItem('password', password)
          localStorage.setItem('id', user.id)
          history.push('/profile', { username: username, password: password })
          return; 
        }
      }

      alert('Invalid login/password combination!!!')
  }


  
    return (
    <div className="App">
        <div className="login">
        <Navbar bg="dark" variant="dark" className="justify-content-center">
                    <Navbar.Brand href="/"><h1 style={{fontSize:"50px"}}>Login</h1></Navbar.Brand>
        </Navbar>
        <br></br>
        <br></br>
          <input type="text" placeholder="Username..." onChange={(e) => {setUsername(e.target.value)}}/><br></br>
          <br></br>
          <input type="password" placeholder="Password..." onChange={(e) => {setPassword(e.target.value)}} /><br></br>
          <br></br>
          <button onClick={login}>Log in</button>
        </div>
    </div>
    );
  }
  
  export default Login;