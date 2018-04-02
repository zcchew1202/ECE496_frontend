import React, { Component } from 'react';
import './App.css';
import './keen-dashboards.css';
import Panel from 'react-bootstrap/lib/Panel';
import {SsimRangeChart, DataTable} from "./charts/bar"

const url='http://localhost:44000/';

class App extends Component {
  render() {
    return (
      <div className="App">
          <div className="row" style={{display: 'flex', 'flex-direction':'row', padding:'20px', height:'40%'}}>
              <div style={{width: '80%', height:'100%'}}>
                <SsimRangeChart />
              </div>
              <div style={{width: '20%',  'padding-top': '50px'}}>
              <DataTable style={{width: '20%'}}/>
              </div>
          </div>
        <div className="container-fluid">
          <Images/>
          <Row />
        </div>
      </div>

    );
  }
}

class Images extends Component {
  render() {

      var array = ["original", "input", "output"];
      var panels = [];
      for(let i=0; i<5 ;i++){
        var images = array.map(image => {
        let imageStr = url + 'getFile?fileDir=' + image + '&&index=' + i;
        return  <div className="col-sm-4"><Panel><Panel.Heading><Panel.Title componentClass="h3">{image}</Panel.Title></Panel.Heading><Panel.Body><img key={image} src={imageStr} alt="" className="img-responsive" style={{width: '100%', height: '100%'}} /></Panel.Body></Panel></div>
        });
        panels.push(images);
      }
      return (
        <div className="row">
            {panels}
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
          </Panel.Body>
        </Panel>
      </div>
    </div>
    );
  }
}




export default App;
