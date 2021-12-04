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


class SalaryManage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        response: []
    }


    this.submit.bind(this)
  }
 

  async componentDidMount() {
        const url = 'http://localhost:3001/salary/manage';
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



  submit = async () => {
      console.log('asdasdasdasdasdnjasdkasndjanksdjnk')
    const url = 'http://localhost:3001/salary/manage/change';
    let data = {
        'fullname': document.getElementById('name').value,
        'salary': document.getElementById('salary').value
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
                <table>
                        <tr><th>Manager</th><th>Age</th><th>Salary</th><th>Bonus</th></tr>
                        {   
                            this.state.response.map((salaryReport) => {

                            return (
                                <tr><td>{salaryReport.fullname}</td><td>{salaryReport.age}</td><td>{salaryReport.salary}</td><td>{salaryReport.bonus}</td></tr>            
                            )
                            })
                        }
                    </table>
                    <br></br>
                        <br></br>
                        <br></br>
                    <div style={{width:"400px", margin: '0px 0px 0px 0px'}}>
                        <input type="text" style={{width:"400px", margin: '0px 0px 0px 0px'}} name="name" id="name" placeholder="Type name of employee"></input>
                        <input type="text" style={{width:"400px", margin: '0px 0px 0px 0px'}} name="salary" id="salary" placeholder="Type new salary"></input>
                        <Button
                                variant="default"
                                style={{ color: "white", background: "red" , width: "400px"}}
                                onClick={this.submit}
                        >
                                SUBMIT 
                        </Button>
                    </div>
                    
            </div>
        </div>
    )


  }
}


export default withRouter(SalaryManage)