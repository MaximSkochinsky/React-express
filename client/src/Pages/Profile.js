import "./Profile.css"
import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Axios from 'axios'
import { useState } from 'react';
import {Nav, Navbar, Container} from 'react-bootstrap'

function Profile(){ 

const [fullname, setFullName] = useState("")
const [role, setRole] = useState("")
const [id, setId] = useState("")
const location = useLocation();
const history = useHistory()


// const buy = () => {
//     Axios.
// }


useEffect(() => {
        Axios.post('http://localhost:3001/profile', {
          username: location.state.username,
          password: location.state.password, 
        }).then((response) => {
            console.log(response)
            setFullName(response.data.fullname)
            switch(response.data.role_id) {
                case 1: 
                    setRole("Admin")
                    break;
                case 2: 
                    setRole("Manager")
                    break;
                case 3:
                    setRole("Client")
                    break;
                default:
                    break;
            }
            setId(response.data.id)
        })

        

})

if (role === "Client") {
  return <div className="App">
                <nav class="navbar navbar-expand-md navbar-dark bg-dark shadow-sm">
                    <div class="container">
                        <a href="#" class="navbar-brand">
                        <p style={{fontSize:"50px"}}>Client Page</p>
                        </a>

                        <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler"><span class="navbar-toggler-icon"></span></button>

                        <div id="navbarSupportedContent" class="collapse navbar-collapse">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item active"><a href="/" class="nav-link"><p style={{fontSize:"20px"}}>Home</p> <span class="sr-only">(current)</span></a></li>
                            <li class="nav-item"><a href="/about" class="nav-link"><p style={{fontSize:"20px"}}>About</p></a></li>
                            <li class="nav-item"><a href="/login" class="nav-link"><p style={{fontSize:"20px"}}>Log out</p></a></li>
                            <li class="nav-item"><a href="/buy" class="nav-link"><p style={{fontSize:"20px"}}>Car Shop</p></a></li>
                            <li class="nav-item"><a href="/search" class="nav-link"><p style={{fontSize:"20px"}}>Dealership search</p></a></li>
                        </ul>
                        </div>
                    </div>
                </nav>
                <div className="clientPage">
                </div>
 </div>
}
else if  (role === "Manager") {

    return <div className="App">
                <nav class="navbar navbar-expand-md navbar-dark bg-dark shadow-sm">
                    <div class="container">
                        <a href="#" class="navbar-brand">
                        <p style={{fontSize:"50px"}}>Manager Page</p>
                        </a>
                        <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler"><span class="navbar-toggler-icon"></span></button>

                        <div id="navbarSupportedContent" class="collapse navbar-collapse">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item active"><a href="/" class="nav-link"><p style={{fontSize:"20px"}}>Home</p> <span class="sr-only">(current)</span></a></li>
                            <li class="nav-item"><a href="/about" class="nav-link"><p style={{fontSize:"20px"}}>About</p></a></li>
                            <li class="nav-item"><a href="/login" class="nav-link"><p style={{fontSize:"20px"}}>Log out</p></a></li>
                            <li class="nav-item"><a href="/contracts" class="nav-link"><p style={{fontSize:"20px"}}>My Contracts</p></a></li>
                            <li class="nav-item"><a href="/clients" class="nav-link"><p style={{fontSize:"20px"}}>My Clients</p></a></li>
                            <li class="nav-item"><a href="/dealership" class="nav-link"><p style={{fontSize:"20px"}}>Dealership</p></a></li>
                        </ul>
                        </div>
                    </div>
                </nav>
                <div className="clientPage">
                </div>
 </div>

}
else if (role === "Admin") {
    return <div className="App">
                <nav class="navbar navbar-expand-md navbar-dark bg-dark shadow-sm">
                    <div class="container">
                        <a href="#" class="navbar-brand">
                        <p style={{fontSize:"50px"}}>Admin Page</p>
                        </a>
                        <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler"><span class="navbar-toggler-icon"></span></button>

                        <div id="navbarSupportedContent" class="collapse navbar-collapse">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item active"><a href="/" class="nav-link"><p style={{fontSize:"20px"}}>Home</p> <span class="sr-only">(current)</span></a></li>
                            <li class="nav-item"><a href="/about" class="nav-link"><p style={{fontSize:"20px"}}>About</p></a></li>
                            <li class="nav-item"><a href="/login" class="nav-link"><p style={{fontSize:"20px"}}>Log out</p></a></li>
                            <li class="nav-item"><a href="/contracts_manage" class="nav-link"><p style={{fontSize:"20px"}}> Contracts</p></a></li>
                            <li class="nav-item"><a href="/clients_manage" class="nav-link"><p style={{fontSize:"20px"}}> Clients</p></a></li>
                            <li class="nav-item"><a href="/auto_manage" class="nav-link"><p style={{fontSize:"20px"}}>Auto</p></a></li>
                            <li class="nav-item"><a href="/salary_manage" class="nav-link"><p style={{fontSize:"20px"}}>Salaries</p></a></li>
                        </ul>
                        </div>
                    </div>
                </nav>
                <div className="clientPage">
                </div>
 </div>
}
else return null
}

export default Profile