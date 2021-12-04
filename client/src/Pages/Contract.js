import { useState, useRef, useEffect } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import "./PaymentFormStyles.css"
import { useLocation, useHistory } from "react-router-dom";
import React from "react";
import { withRouter } from "react-router";
import Spinner from 'react-bootstrap/Spinner'
import {Link} from 'react-router-dom'


class Contract extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        response: []
    }
  }
 

  async componentDidMount() {
         console.log(localStorage)
        const url = 'http://localhost:3001/contracts';
        let data = localStorage;
        try {
          const response = await fetch(url, {
            method: 'POST', // или 'PUT'
            body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const json = await response.json();
          this.setState({response: json})
  
          
     
        } catch (error) {
          console.error('Ошибка:', error);
        }
  }


  render () {
    console.log(this.state.response)
    return (
        <div className="App">
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
                <table>
                        <tr><th>Conract ID</th><th>Price</th><th>Auto</th><th>VIN</th><th>Client</th></tr>
                        {   
                            this.state.response.map((contract) => {

                            return (
                                <tr><td>{contract.id}</td><td>{contract.price}</td><td>{contract.auto}</td><td>{contract.vin}</td><td>{contract.client}</td></tr>            
                            )
                            })
                        }
                    </table>
            </div>
        </div>
    )


  }
}


export default withRouter(Contract)