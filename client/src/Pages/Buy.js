import { useHistory } from "react-router";
import "./Buy.css"
import { useState, useEffect } from "react"
import Axios from "axios"
import {useLayoutEffect} from  "react"
import TextField from "@material-ui/core/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListSubheader from '@mui/material/ListSubheader';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Register from "./Register";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";



let options = []


class Buy extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cars: [],
            colors: [],
            selectedCar: 'BMW',
            selectedColor: 'black',
            selectedMinDate: 0,
            selectedMaxDate: 3000,
            selectedMinPrice: 0,
            selectedMaxPrice: 20000, 
            response: []
        }

        this.handleColorChange = this.handleColorChange.bind(this)
        this.handleCarChange = this.handleCarChange.bind(this)
        this.handleMaxDateChange = this.handleMaxDateChange.bind(this)
        this.handleMinDateChange = this.handleMinDateChange.bind(this)
        this.handleMaxPriceChange = this.handleMaxPriceChange.bind(this)
        this.handleMinPriceChange = this.handleMinPriceChange.bind(this)
        this.submit = this.submit.bind(this)
        this.buyCarHandler = this.buyCarHandler.bind(this)
    }

    componentDidMount() {
        fetch('http://localhost:3001/auto')
        .then((response) => response.json())
        .then(data => {
            this.setState({cars: data.cars, colors: data.colors})
        })

    }




    handleCarChange(e) {
       
        this.setState({ selectedCar: e.target.value });
    }

    handleColorChange(e) {
       
        this.setState({ selectedColor: e.target.value });
    }


    handleMinDateChange(e) {
        this.setState({ selectedMinDate: e.target.value });
    }

    handleMaxDateChange(e) {
        this.setState({ selectedMaxDate: e.target.value });
    }

    handleMinPriceChange(e) {
        this.setState({ selectedMinPrice: e.target.value });
    }

    handleMaxPriceChange(e) {
        this.setState({ selectedMaxPrice: e.target.value });
    }

    async submit (e) {
        const url = 'http://localhost:3001/auto/buy';
        const data = this.state


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
          this.forceUpdate()
     
        } catch (error) {
          console.error('Ошибка:', error);
        }
    }

    buyCarHandler (car) {
        this.props.history.push("/auto/buy", {car: car, client: { 'id': localStorage.id} })
    }
    


    render() {

        console.log(this.state.response)

        return (

            <div className="App" style={{scrollBehavior: "auto"}}>
                <div className="Buy">
                    <div className="contents" style={{height:"80px"}}>
                        <h1><strong>BUY CAR</strong></h1>
                        <br></br>
                        <br></br>
                    </div>
                    <div className="auto">
                        <label for="auto" id='auto-label'><b>BRAND:&emsp;</b></label>
                        <select name="auto" value={this.state.selectedCar} onChange={this.handleCarChange}>
                            {this.state.cars.map((car) => { return <option value={car.name} key={car.name}>{car.name}</option>})}
                        </select>
                    </div>
                    <div className="color">
                        <label for="color" id='color-label'><b>COLOR:&emsp;</b></label>
                        <select name="color" value={this.state.selectedColor} onChange={this.handleColorChange}>
                            {this.state.colors.map((color) => { return <option value={color.color} key={color.color}>{color.color}</option>})}
                        </select>
                    </div>
                    <p style={{color: 'white', backgroundColor: 'blue', margin: '0px'}}><strong>RELEASE DATE:</strong>  </p>
                    <div className="date">
                        <label for="date_from" id='date-label1'><b>FROM:&emsp;</b></label>
                        <input type="text" name="date_from"  onChange={this.handleMinDateChange}></input>
                        <label for="date_to" id='date-label2'><b>TO:&emsp;</b></label>
                        <input type="text" name="date_to"  onChange={this.handleMaxDateChange}></input>
                    </div>
                    <p style={{color: 'white', backgroundColor: 'blue', margin: '0px'}}><strong>PREFERRED PRICE (IN AMERICAN DOLLARS):</strong>   </p>
                    <div className="price">
                        <label for="price_from" id='price-label1'><b>FROM:&emsp;</b></label>
                        <input type="text" name="price_from" onChange={this.handleMinPriceChange}></input>
                        <label for="price_to" id='price-label2'><b>TO:&emsp;</b></label>
                        <input type="text" name="price_to"  onChange={this.handleMaxPriceChange}></input>
                    </div>
                    <div className="submit"> 
                       <button style={{height: "50px", marginTop:"20px"}} onClick={() => {this.submit()}}>Submit</button>
                    </div>
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
                                    <p>Вody material: <span className="main-info">{car.material}</span></p> 
                                    <p>VIN (Identification number):  <span className="main-info">{car.vin}</span></p>
                                    <p>Vehicle Power: <span className="main-info">{car.power} Hourespower</span></p>
                                    <br></br>
                                    <div className="dealership-info">
                                        <h1><strong>DEALERSHIP INFO:</strong> </h1>
                                        <p>Dealership: <span className="main-info">{car.dealership}</span></p>
                                        <p>Dealership adress: <span className="main-info">{car.adress}</span></p> 
                                        <p>Dealership contact number: <span className="main-info">{car.number}</span></p> 
                                    </div>
                                    <button onClick={() => {this.buyCarHandler(car)}} style={{marginLeft:"400px", marginTop:"20px", height:"50px", width:"400px"}} value={car.vin}>Buy car</button>
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


const BuyCar = withRouter(Buy);

export default BuyCar