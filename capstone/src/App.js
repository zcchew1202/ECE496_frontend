import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './keen-dashboards.css';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="container-fluid">
          <div className="row">
            <Columns />
            <Columns />
            <Columns />
          </div>
          <Row />
        </div>
      </div>

    );
  }
}

class Columns extends Component {
  render() {
    return (
      <Jumbotron>
        <div className="col-sm-4">
          <div className="chart-wrapper">
            <div className="chart-title">
              Pageviews by browser (past 24 hours)
              </div>
            <div className="chart-stage">
              <img data-src="holder.js/100%x350/white" />
            </div>
            <div className="chart-notes">
              This is a sample text region to describe this chart.
              </div>
          </div>
        </div>
      </Jumbotron>
    );
  }
}

class Row extends Component {
  render() {
    return (
      <Jumbotron>
        <div class="row">
          <div class="col-sm-12">
            <div class="chart-wrapper">
              <div class="chart-title">
                Impressions by advertiser
        </div>
              <div class="chart-stage">
                <img data-src="holder.js/100%x150/white" />
              </div>
              <div className="chart-notes">
                Notes go down here
        </div>
            </div>
          </div>

        </div>
        </Jumbotron>
        );
        }
      }
      
      
      
      
  export default App;
