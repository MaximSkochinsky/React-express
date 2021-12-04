import { Component, useState } from 'react';
import Axios from 'axios'
import { useHistory } from 'react-router';
import "./App.css"
import {NavLink, Link} from "react-router-dom"



function Register() {
  const [usernameReg, setUsernameReg] = useState("")
  const [passwordReg, setPasswordReg] = useState("")
  const [roleReg, setRoleReg] = useState("")
  const [fullnameReg, setFullNameReg] = useState("")
  const [passportIdReg, setPassportIdReg] = useState("")
  const [ageReg, setAgeReg] = useState("")
  let history = useHistory()


  const register = () => {
    console.log('Worked')
    Axios.post('http://localhost:3001/register', {
      username: usernameReg,
      password: passwordReg, 
      fullname: fullnameReg,
      role: roleReg,
      passport: passportIdReg,
      age: ageReg,
    }
    ).then((response) => {
    })
    history.push('/login')
  }


  return (
    <div className="App">
      <div className="navigation">
        <nav>
          <NavLink  style={{ textDecoration: 'none'}} to="/login" className="main-nav" activeClassName="main-nav-active">Login&emsp;</NavLink>
          <NavLink  style={{ textDecoration: 'none'}} to="/about" className="main-nav" activeClassName="main-nav-active">About Author</NavLink>
        </nav>
      </div>
      <div className="registration">
        <h1 style={{fontStretch:"ultra-expanded", fontSize:"60px"}}>Registration</h1><br></br>
        <label>Full name</label><br></br>
        <input type="text" onChange={(e) => {setFullNameReg(e.target.value)}}/><br></br>
        <label>Passport ID</label><br></br>
        <input type="text" onChange={(e) => {setPassportIdReg(e.target.value)}}/><br></br>
        <label>Age</label><br></br>
        <input type="text" onChange={(e) => {setAgeReg(e.target.value)}}/><br></br>
        <label>Username</label><br></br>
        <input type="text" onChange={(e) => {setUsernameReg(e.target.value)}}/><br></br>
        <label>Password</label><br></br>
        <input type="text" onChange={(e) => {setPasswordReg(e.target.value)}}/><br></br>
        <br></br>
        <label style={{color: "white", fontSize:"30px"}}>Role: </label><br></br>
        <input id="radio1"  type="radio"  onChange={(e) => {console.log(e.target.value); setRoleReg(e.target.value)}} name="Role" value="Client" />
        <label style={{color: "white", fontSize:"30px"}} for="radio1">Client&emsp;</label> 
        <input id="radio2"  type="radio" onChange={(e) => {console.log(e.target.value); setRoleReg(e.target.value)}} name="Role" value="Manager" />
        <label style={{color: "white", fontSize:"30px"}} for="radio2">Manager</label> 
        <br></br>
        <br></br> 
        <button onClick={register}>Register</button><br></br>
      </div>
    </div>
  );
}

export default Register;


