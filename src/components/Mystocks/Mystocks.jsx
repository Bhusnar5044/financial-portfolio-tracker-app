import React, { Component } from "react";
import "./Mystocks.scss";
import axios from "axios";
import swal from "sweetalert";
export default class Mystocks extends Component {
  state = {
    mystocksdata: [],
    isSelected: false,
  };
 
  getStockData = () => {
    axios.get(`https://financial-portfolio-trac-fc62c.firebaseio.com/MyStocks.json`)
      .then((response) => {
        this.setState({
          mystocksdata: response.data,
        });
        console.log(response.data);
      })
      .catch((error) => {
        alert("THERE SEEMS TO BE SOME PROBLEM WITH SERVER " + error.message);
      });
  };
  componentDidMount() {
    this.getStockData();
  }
  componentDidUpdate() {
    this.getStockData();
  }
  stopTracking = (e) => {
    e.preventDefault();
    const uniqueid = e.target.id;
    swal({
      title: "Are you sure?",
      text: `${this.state.mystocksdata[
        uniqueid
      ].stockname.toUpperCase()} stock will be removed from MYSTOCKS`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`https://financial-portfolio-trac-fc62c.firebaseio.com/MyStocks/${uniqueid}.json`)
          .then((del) => {
            console.log(del);
          })
          .catch((error) =>
            alert("THERE SEEMS TO BE SOME PROBLEM WITH SERVER")
          );
      
        swal(
          `${this.state.mystocksdata[
            uniqueid
          ].stockname.toUpperCase()}  Removed`,
          {
            icon: "success",
          }
        );
      } else {
        swal(
          `Dont worry 😃 ,${this.state.mystocksdata[
            uniqueid
          ].stockname.toUpperCase()} not removed`
        );
      }
    });
  };

  render() {
    const isSelected = this.props.isSelected;
    let showStocks;
    if (this.state.mystocksdata !== null) {
      const array_mystocksdata = Object.entries(this.state.mystocksdata);

      if (isSelected && array_mystocksdata.length > 0) {
        showStocks = array_mystocksdata.map((stock) => {
          return (
            <tr key={stock[1].stocksymbol}>
              <td>{stock[1].stocksymbol}</td>
              <td>{stock[1].stockname}</td>
              <td>{stock[1].Noofshares}</td>
              <td>{stock[1].buyprice}</td>
              <td>{stock[1].currentPrice}</td>
              <td>{stock[1].profit_Loss}</td>
              <td className="text-center">
                <button
                  type="button"
                  className="StopTrackingBtn"
                  id={stock[0]}
                  onClick={this.stopTracking}
                >
                  Stop Tracking
                </button>
              </td>
            </tr>
          );
        });
      }
    } else {
      showStocks = (
        <tr>
          <td colSpan="7">
            <marquee behavior="alternate" scrollamount="10">
              <h4 className="nope">You Haven't Selected Any Stocks Yet</h4>
            </marquee>
          </td>
        </tr>
      );
    }
    return (
      <>
        <header className="main ">
          <div className="MyStocks">
            <h4 className="mb-2 Title">
              My Stocks
            </h4>
            <div style={{ overflowX: "auto" }}>
              <table className="MyStocksTable">
                <tr>
                  <th>Stock symbol</th>
                  <th>Stock name</th>
                  <th>No.of shares</th>
                  <th>Buy price</th>
                  <th>Current price</th>
                  <th>Profit/Loss</th>
                  <th> </th>
                </tr>
                <tbody>{showStocks}</tbody>
              </table>
            </div>
          </div>
        </header>
      </>
    );
  }
}
