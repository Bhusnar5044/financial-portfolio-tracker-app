import React, { Component } from "react";
import Homepage from "./Pages/Homepage/Homepage";
import {db} from './fire';
// const firebase = `https://stocks-a6c21.firebaseio.com/tickers/.json`;
const alphavantage = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=TCS&apikey=XGVQUV2Z5VMGJYAU`;


class App extends Component {
  
 render(){
  return (
    <>
      <Homepage />
    </>
    
  );
 }
}

export default App;
