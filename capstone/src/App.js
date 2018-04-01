import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './keen-dashboards.css';
import Panel from 'react-bootstrap/lib/Panel';

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
      <div className="col-sm-4">
        <Panel>
          <Panel.Heading>
            <Panel.Title componentClass="h3">Panel heading with a title</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <img data-src="holder.js/100%x350/white" />
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}

class Row extends Component {
  render() {
    return (
    <div className="row">
      <div className="col-sm-12">
        <Panel>
          <Panel.Heading>
            <Panel.Title componentClass="h3">chart goes here</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <img data-src="holder.js/100%x350/white" />
          </Panel.Body>
        </Panel>
      </div>
    </div>
    );
  }
}




export default App;
