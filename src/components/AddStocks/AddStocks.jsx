import React, { Component } from "react";
import "./Addstocks.scss";
import axios from "axios";
import {database} from '../../fire';

export default class AddStocks extends Component {
  constructor() {
    super();
    this.state = {
      tickersData: [],
      totalTickers: null,
      currentPrice: null,
      data:[]
    };
  }
  getTickers = () => {
    // const data=[];
    // const data={}
    // db.collection("finance-portfolio-db").get().then(function(querySnapshot) {
    //   querySnapshot.forEach(function(doc) {
    //       // doc.data() is never undefined for query doc snapshots
    //       // console.log("Hello");
    //       // console.log(doc.id, " => ", doc.data());
    //       data[doc.id]=doc.data();
    //       // data.push(jobj);
    //   });
    // });
    // console.log("data: ",data,data.length);

    axios.get(`https://financial-portfolio-trac-fc62c.firebaseio.com/.json`)
    .then((response) => { 
      if ( response.data !== null) {
        this.setState({ tickersData: [...Object.entries(response.data)],
          totalTickers: Object.keys(response.data).length,
        })
      }
      console.log(this.state.tickersData);
    });
  };

  componentDidMount() {
    this.getTickers();
    ;
  }
  // componentDidUpdate() {
  //   this.getTickers();
  // }
  selectStock = (e) => {
    e.preventDefault();
    // console.log(e.target.value, e.target.name, e.target.id);
    const Buttonvalue = e.target.value;
    const Buttonname = e.target.name;
    const ButtonId = e.target.id;
    console.log(Buttonvalue, ButtonId, Buttonname);

    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${e.target.value}&apikey=XGVQUV2Z5VMGJYAU`
      )
      .then((response) => {
        // console.log(response.data["Time Series (Daily)"]);
        let dailyData = response.data["Time Series (Daily)"];
        let dailyData_Latest_close = Object.values(dailyData)[0]["4. close"];
        console.log("dailyData: ",dailyData_Latest_close);
        this.setState({
          currentPrice: dailyData_Latest_close,
        });
        this.props.currentPrice(
          this.state.currentPrice,
          true,
          Buttonname,
          Buttonvalue,
          ButtonId
        );
      });
  };

  render() {
    return (
      <>
        <h4 className="title ml-5">
          Add Stocks To My Stocks
        </h4>
        {this.state.totalTickers ? (
          this.state.totalTickers > 3 ? (
            <div className="AddStocks">
              {this.state.tickersData!== []  && this.state.tickersData.map(
                (ticker) =>
                    ticker[0]!=="MyStocks" &&
                    <div className="AddStocksTitle" key={ticker[0]}>
                      <button
                        className="StockButton"
                        name={ticker[1].name}
                        id={ticker[0]}
                        onClick={this.selectStock}
                        value={ticker[1].symbol}
                      >
                        {ticker[1].symbol}
                      </button>
                      <span className="sub-title">{ticker[1].name}</span>
                    </div>
              )}
            </div>
          ) : (
            <h3 className="limit text-center">
              You are not allowed to add more than 5 stocks! <br /> Remove some
              stocks if you want to add a new stock.
            </h3>
          )
        ) : null}
      </>
    );
  }
}
