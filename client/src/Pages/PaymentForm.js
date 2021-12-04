import { useState, useRef, useEffect } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import "./PaymentFormStyles.css"
import { useLocation, useHistory } from "react-router-dom";
import React from "react";
import { withRouter } from "react-router";
import Spinner from 'react-bootstrap/Spinner'
import {Link} from 'react-router-dom'


class PaymentForm extends React.Component {

  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }
 
  state = {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
    succeed: false,
    info: false 
  };

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  }
  
  handleInputChange = (e) => {
    const { name, value } = e.target;
    
    this.setState({ [name]: value });
  }


  submit = async () => {
    this.setState({succeed: true})
    console.log('PAYMENT')
        const url = 'http://localhost:3001/payment';
        let data = this.props.location
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
  if  (!this.state.succeed && !this.state.info) {
    return (
      <div className="PaymentForm">
        <div className="Description">
          <h1>Please, enter your credit card details to make a payment</h1><br></br>
        </div>
        <div className="Card">
          <Cards
            number={this.state.number}
            name={this.state.name}
            expiry={this.state.expiry}
            cvc={this.state.cvc}
            focused={this.state.focus}
          />
          <form>
            <input
              type="tel"
              name="number"
              placeholder="Card Number"
              maxLength={16}
              value={this.state.number}
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              maxLength={20}
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              value={this.state.expiry}
              maxLength={4}
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
            <input
              type="tel"
              name="cvc"
              placeholder="CVC"
              value={this.state.cvc}
              maxLength={3}
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
            <button class="button-84" role="button" onClick={() => {this.submit(this.props.location)}}>PAY</button>
          </form>
        </div>
      </div>
    );

  } else if (this.state.succeed && !this.state.info)
  {
    setTimeout(() => this.setState({succeed:false, info: true}), 6000)
    return(
      <div className="loader">
        <Spinner animation="border" role="status" style={{justifyContent:'center', width: '200px', height:'200px', color:'white', alignItems:'center', flex: 1, 
        marginLeft: '800px', marginTop: '300px'}}>
        </Spinner>
        <p style={{marginLeft: '815px', marginTop: '10px', fontSize: '50px', color: 'white'}}>Loading...</p>
      </div>
    )
  }
  else if (!this.state.succeed && this.state.info) {
    return(
      <div className="info" style={{ display: 'flex', justifyContent: 'center',
        alignItems: 'center',
        height: 'inherit',
        backgroundColor: 'white'
      }}>
          <h1>Payment confirmed! Our employee will contact you soon...</h1>
          {setTimeout(() => this.props.history.push('/profile', {username: localStorage.user, password: localStorage.password}), 2000)}
      </div>
    )
  }




  }



}


export default withRouter(PaymentForm)