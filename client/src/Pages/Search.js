
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import "./Search.css"



let options = []


class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            response: []
        }

        this.submit = this.submit.bind(this)
    }

      
    async submit (e) {
        const url = 'http://localhost:3001/search';
        const data = {
          name: document.getElementById('search').value
        }


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
          // this.forceUpdate()
     
        } catch (error) {
          console.error('Ошибка:', error);
        }

    }


    render() {
      console.log(this.response)
        return (
            <div className="App" style={{scrollBehavior: "auto"}}>
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
              <nav class="navbar navbar-expand-md navbar-dark bg-dark shadow-sm" style={{height: "80px"}}>
                    <div class="container">
                        <a href="#" class="navbar-brand">
                        <p style={{fontSize:"50px"}}>Search Page</p>
                        </a>

                        <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler"><span class="navbar-toggler-icon"></span></button>

                        <div id="navbarSupportedContent" class="collapse navbar-collapse">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item active"><a href="/" class="nav-link"><p style={{fontSize:"20px"}}>Home</p> <span class="sr-only">(current)</span></a></li>
                            <li class="nav-item"><a href="/about" class="nav-link"><p style={{fontSize:"20px"}}>About</p></a></li>
                            <li class="nav-item"><a href="/login" class="nav-link"><p style={{fontSize:"20px"}}>Log out</p></a></li>
                        </ul>
                        </div>
                    </div>
                </nav>
                <form class="example"  action="javascript:void(0);">
                  <input type="text"  style={{width:"80%", height: "50px"}} placeholder="Dealership" name="search" id="search"></input>
                  <button style={{color: "blue", width: "360px", height: "50px", backgroundColor: "#F4FF03"}} onClick={this.submit}><i class="fa fa-search"></i></button>
                </form>
                {   
                    this.state.response.map((dealership) => {

                       return (
                           <div style={{textAlign:"left"}}>
                              <div className="mainInfo">
                                    <h1 style={{fontSize: "50px"}}><strong>DEALERSHIP INFO:</strong> </h1>
                                      <p>Adress: <span className="main-info">{dealership.adress}</span></p>
                                      <p>Phone number: <span className="main-info">{dealership.phone_number}</span></p> 
                                      <p>Name: <span className="main-info">{dealership.name}</span></p>         
                                      <img style={{float:"left", height: "max-content", width:"100%"}}src={dealership.image}></img>   
                              </div>
                           </div>
                       )
                    })
                }
            </div>
        )
    }

}




export default withRouter(Search)