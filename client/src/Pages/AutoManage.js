import { useState, useRef, useEffect } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import "./PaymentFormStyles.css"
import { useLocation, useHistory } from "react-router-dom";
import React from "react";
import { withRouter } from "react-router";
import Spinner from 'react-bootstrap/Spinner'
import {Link} from 'react-router-dom'
import { Button } from "react-bootstrap";


class AutoManage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        response: []
    }


    this.submit.bind(this)
    this.delete.bind(this)
  }
 

  async componentDidMount() {
        const url = 'http://localhost:3001/auto/manage';
        const data = localStorage
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



  submit = async (e) => {
      console.log(document.getElementById(e.target.name).value) 
         const url = 'http://localhost:3001/auto/manage/change';
    let data = {
        'vin': e.target.name,
        'price': document.getElementById(e.target.name).value
    }


    try {
      const response = await fetch(url, {
        method: 'POST', // или 'PUT'
        body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      
 
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }


  delete = async (e) => {
    console.log('here')
       const url = 'http://localhost:3001/auto/manage/delete';
  let data = {
      'vin': e.target.value,
  }


  try {
    const response = await fetch(url, {
      method: 'POST', // или 'PUT'
      body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    

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
                    <li class="nav-item"><a href="/contracts_manage" class="nav-link"><p style={{fontSize:"20px"}}> Contracts</p></a></li>
                    <li class="nav-item"><a href="/clients_manage" class="nav-link"><p style={{fontSize:"20px"}}> Clients</p></a></li>
                    <li class="nav-item"><a href="/auto_manage" class="nav-link"><p style={{fontSize:"20px"}}>Auto</p></a></li>
                    <li class="nav-item"><a href="/salary_manage" class="nav-link"><p style={{fontSize:"20px"}}>Salaries</p></a></li>
                </ul>
                </div>
            </div>
        </nav>
            <div className="clientPage">
            {   
                    this.state.response.map((car) => {

                       return (
                           <div>
                                <div className="auto-info">
                                    <img style={{float:"left", height: "492px", width:"640px"}}src={car.image}></img>
                                    <h1><strong>AUTO INFO:</strong> </h1>
                                    <p>Brand: <span className="main-info">{car.name}</span></p>
                                    <p>Model: <span className="main-info">{car.model}</span></p> 
                                    <p>Color: <span className="main-info">{car.color}</span></p> 
                                    <p>Price: <span className="main-info">{car.price}$</span></p> 
                                    <p>Вody material: <span className="main-info">{car.material}</span></p> 
                                    <p>VIN (Identification number):  <span className="main-info">{car.vin}</span></p>
                                    <p>Vehicle Power: <span className="main-info">{car.power} Hourespower</span></p>
                                    <br></br>
                                    <input type="text" style={{width:"400px", margin: '0px 0px 0px 0px'}} name="price" id="price" placeholder="New price:" id={car.vin}></input>
                                    <br></br>
                                    <button onClick={this.submit} style={{marginLeft:"0px", marginTop:"20px", height:"50px", width:"400px"}} name={car.vin}>Change price</button>
                                    {/* <button onClick={this.delete} style={{marginLeft:"0px", marginTop:"20px", height:"50px", width:"400px"}} value={car.vin}>Change price</button> */}
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <hr></hr>
                                </div>            
                           </div>
                       )
                    })
                }
                
                    
            </div>
        </div>
    )


  }
}


export default withRouter(AutoManage)