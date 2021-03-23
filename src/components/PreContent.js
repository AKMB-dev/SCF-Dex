import React, { Component } from 'react';
import { Tabs, Tab  }
from 'react-bootstrap';
import {Spinner} from './Spinner';

class PreContent extends Component {

  render() {
    return (<div>
{/*
  ----navbar----
<nav className="navbar navbar-expand-lg navbar-dark bg-primary" role="navigation">
          <a className="navbar-brand" href="https://akmb-dev.github.io/SCF-Dex/"> SCF Dex </a>

        <button className="navbar-toggler" 
        type="button" data-toggle="collapse" 
        data-target="#navbarNavDropdown" 
        aria-controls="navbarNavDropdown" 
        aria-expanded="false" 
        aria-label="Toggle navigation">
          <span className="navbar-toggler-icon">
          </span>
        </button>

      <div className="container">
        <ul className="nav navbar-nav ml-auto">
          <li className="nav-item">
            <a
              className="nav-link small"
              href={`https://etherscan.io/address/${this.props.account}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {this.props.account}
            </a>
          </li>
        </ul>
      </div>

      </nav>
*/}

  <nav className="navbar navbar-expand-lg navbar-dark bg-primary z-index-1" role="navigation">
  <a className="navbar-brand" href="https://akmb-dev.github.io/SCF-Dex/"> SCF Dex </a>
         <div className="z-index-2">        
         <Spinner />        
         </div>
         </nav>

{/* Content */}
<div className="content">

        <div className="vertical-split">


          {/* Balance */}

        <div className="card bg-dark text-white">
        <div className="card-header">
          Balance        
        </div>
        <div className="card-body">


<Tabs defaultActiveKey="deposit" 
    className="bg-dark text-white">

      <Tab eventKey="deposit" title="Deposit" 
      className="bg-dark">
        <table className="table table-dark table-sm small">
          <thead>
            <tr>
              <th>Token</th>
              <th>Wallet</th>
              <th>Exchange</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ETH</td>
              <td>0.00</td>
              <td>0.00</td>
            </tr>
          </tbody>
        </table>

        <form className="row">
          <div className="col-12 col-sm pr-sm-2">
            <input
            type="text"
            placeholder="ETH Amount"
            className="form-control form-control-sm bg-dark text-white"
            required />
          </div>
          <div className="col-12 col-sm-auto pl-sm-0">
            <button type="submit" 
            className="btn btn-primary btn-block btn-sm">Deposit</button>
          </div>
        </form>

        <table className="table table-dark table-sm small">
          <tbody>
            <tr>
              <td>SCF</td>
              <td>0.00</td>
              <td>0.00</td>
            </tr>
          </tbody>
        </table>

        <form className="row">
          <div className="col-12 col-sm pr-sm-2">
            <input
            type="text"
            placeholder="SCF Amount"
            className="form-control form-control-sm bg-dark text-white"
            required />
          </div>
          <div className="col-12 col-sm-auto pl-sm-0">
            <button type="submit" 
            className="btn btn-primary btn-block btn-sm">Deposit</button>
          </div>
        </form>

      </Tab>

      <Tab eventKey="withdraw" title="Withdraw" 
      className="bg-dark">

        <table className="table table-dark table-sm small">
          <thead>
            <tr>
              <th>Token</th>
              <th>Wallet</th>
              <th>Exchange</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ETH</td>
              <td>0.00</td>
              <td>0.00</td>
            </tr>
          </tbody>
        </table>

        <form className="row">
          <div className="col-12 col-sm pr-sm-2">
            <input
            type="text"
            placeholder="ETH Amount"
            className="form-control form-control-sm bg-dark text-white"
            required />
          </div>
          <div className="col-12 col-sm-auto pl-sm-0">
            <button type="submit" 
            className="btn btn-primary btn-block btn-sm">Withdraw</button>
          </div>
        </form>

        <table className="table table-dark table-sm small">
          <tbody>
            <tr>
              <td>SCF</td>
              <td>0.00</td>
              <td>0.00</td>
            </tr>
          </tbody>
        </table>

        <form className="row">
          <div className="col-12 col-sm pr-sm-2">
            <input
            type="text"
            placeholder="DAPP Amount"
            className="form-control form-control-sm bg-dark text-white"
            required />
          </div>
          <div className="col-12 col-sm-auto pl-sm-0">
            <button type="submit" 
            className="btn btn-primary btn-block btn-sm">Withdraw</button>
          </div>
        </form>

      </Tab>
    </Tabs>

        </div>
        </div>


          {/* NewOrder */}
       <div className="card bg-dark text-white">
        <div className="card-header">
          New Order
        </div>
        <div className="card-body">
          
          <Tabs defaultActiveKey="buy" 
          className="bg-dark text-white">

            <Tab eventKey="buy" title="Buy" 
            className="bg-dark">

                <form>
                <div className="form-group small">
                  <label>Buy Amount (SCF)</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control form-control-sm bg-dark text-white"
                      placeholder="Buy Amount"
                      required
                    />
                  </div>
                </div>
                <div className="form-group small">
                  <label>Buy Price</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control form-control-sm bg-dark text-white"
                      placeholder="Buy Price"
                      required
                    />
                  </div>
                </div>
                <button type="submit" 
                className="btn btn-primary btn-sm btn-block">Buy Order</button>
              </form>

            </Tab>

            <Tab eventKey="sell" title="Sell" 
            className="bg-dark">

              <form>
              <div className="form-group small">
                <label>Sell Amount (SCF)</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control form-control-sm bg-dark text-white"
                    placeholder="Sell amount"
                    required
                  />
                </div>
              </div>
              <div className="form-group small">
                <label>Sell Price</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control form-control-sm bg-dark text-white"
                    placeholder="Sell Price"
                    required
                  />
                </div>
              </div>
              <button type="submit" 
              className="btn btn-primary btn-sm btn-block">Sell Order</button>
            </form>
            </Tab>
          </Tabs>
 
        </div>
      </div>


        </div>


        {/* OrderBook */}
      <div className="vertical">
        <div className="card bg-dark text-white">
          <div className="card-header">
            Order Book
          </div>
          <div className="card-body order-book">
            <table className="table table-dark table-sm small">
              <tbody>
                <tr className="order-book-order">
                  <td>0.00</td>
                  <td className="text-danger">0.00</td>
                  <td>0.00</td>
                </tr>
                <tr>
                  <th>SCF</th>
                  <th>SCF/ETH</th>
                  <th>ETH</th>
                </tr>
                <tr className="order-book-order">
                  <td>0.00</td>
                  <td className="text-success">0.00</td>
                  <td>0.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>


        <div className="vertical-split">


          {/* PriceChart */}
      <div className="card bg-dark text-white">
        <div className="card-header">
          Price Chart
        </div>
        <div className="card-body">
          <div className="price-chart">
            <div className="price">
              <h4>"SCF/ETH" &nbsp; 
              &#9651;
              &nbsp; 0.00
              </h4>
            </div>
          </div>
        </div>
      </div>


          {/* MyTransactions */}
      <div className="card bg-dark text-white">
        <div className="card-header">
          My Transactions
        </div>
        <div className="card-body">
          <Tabs defaultActiveKey="trades" 
          className="bg-dark text-white">
            <Tab eventKey="trades" title="Trades" 
            className="bg-dark">
              <table className="table table-dark table-sm small">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>SCF</th>
                    <th>SCF/ETH</th>
                  </tr>
                </thead>
                <tbody>
                      <tr>
                        <td className="text-muted">
                          00:00:00 am 00/00
                        </td>
                        <td className="text-success">
                        +000
                        </td>
                        <td className="text-success">
                        0.000000
                        </td>
                      </tr>
                      <tr>
                        <td className="text-muted">
                          00:00:00 am 00/00
                        </td>
                        <td className="text-danger">
                        -000
                        </td>
                        <td className="text-danger">
                        0.000000
                        </td>
                      </tr>
                </tbody>
              </table>
            </Tab>
            <Tab eventKey="orders" title="Orders">
              <table className="table table-dark table-sm small">
                <thead>
                  <tr>
                    <th>Amount</th>
                    <th>SCF/ETH</th>
                    <th>Cancel</th>
                  </tr>
                </thead>
                <tbody>
                      <tr >
                        <td className="text-danger">
                        000
                        </td>
                        <td className="text-danger">
                        0.00001
                        </td>
                        <td
                          className="text-muted cancel-order"
                        >X</td>
                      </tr>
                       <tr >
                        <td className="text-success">
                        000
                        </td>
                        <td className="text-success">
                        0.00001
                        </td>
                        <td
                          className="text-muted cancel-order"
                        >X</td>
                      </tr>
                </tbody>
              </table>
            </Tab>
          </Tabs>
        </div>
      </div>


        </div>



        {/*} Trades */}
      <div className="vertical">
        <div className="card bg-dark text-white">
          <div className="card-header">
            Trades
          </div>
          <div className="card-body">
            <table className="table table-dark table-sm small">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>SCF</th>
                  <th>SCF/ETH</th>
                </tr>
              </thead>
                <tbody>
                      <tr>
                        <td className="text-muted">
                        00:00:00 am 00/00
                        </td>
                        <td>000</td>
                        <td className="text-success">
                        0.000000</td>
                      </tr>
                                <tr>
                        <td className="text-muted">
                        00:00:00 am 00/00
                        </td>
                        <td>000</td>
                        <td className="text-danger">
                        0.000000</td>
                      </tr>
                                <tr>
                        <td className="text-muted">
                        00:00:00 am 00/00
                        </td>
                        <td>000</td>
                        <td className="text-success">
                        0.000000</td>
                      </tr>
                </tbody>
            </table>
          </div>
        </div>
      </div>

        
</div>

    </div>);
  }
}

export default PreContent;
