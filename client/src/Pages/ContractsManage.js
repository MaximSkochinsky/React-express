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


class Contract extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        response: []
    }


    this.delete.bind(this)
  }
 

  async componentDidMount() {
        const url = 'http://localhost:3001/contracts/manage';
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



  delete = async () => {
    const url = 'http://localhost:3001/contracts/manage/delete';
    let data = document.getElementById('delete_id').value;
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


    const URL = 'http://localhost:3001/contracts/manage';
        let body = localStorage;
        try {
          const response = await fetch(URL, {
            method: 'POST', // или 'PUT'
            body: JSON.stringify(body), // данные могут быть 'строкой' или {объектом}!
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
                    <li class="nav-item"><a href="/contracts_manage" class="nav-link"><p style={{fontSize:"20px"}}>Manage Contracts</p></a></li>
                    <li class="nav-item"><a href="/clients_manage" class="nav-link"><p style={{fontSize:"20px"}}>Manage Clients</p></a></li>
                    <li class="nav-item"><a href="/auto_manage" class="nav-link"><p style={{fontSize:"20px"}}>Auto</p></a></li>
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
                    <br></br>
                        <br></br>
                        <br></br>
                    <div style={{width:"400px", margin: '0px 0px 0px 0px'}}>
                        <input type="text" style={{width:"400px", margin: '0px 0px 0px 0px'}} name="delete_id" id="delete_id" placeholder="Type the ID of contract you want to delete"></input>
                        <Button
                                variant="default"
                                style={{ color: "white", background: "blue" , width: "400px"}}
                                onClick={this.delete}
                            >
                                DELETE
                        </Button>
                        <input type="text" style={{width:"400px", margin: '0px 0px 0px 0px'}} name="delete_name" id="delete_name" placeholder="Type the client of contract you want to delete"></input>
                        <Button
                                variant="default"
                                style={{ color: "white", background: "red" , width: "400px"}}
                                onClick={() => {alert('red')}}
                        >
                                DELETE 
                        </Button>
                    </div>
                    
            </div>
        </div>
    )


  }
}


export default withRouter(Contract)