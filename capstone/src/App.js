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
          <h1> Overall Statistics </h1>
          <div className="row" style={{display: 'flex', 'flex-direction':'row', padding:'20px', height:'100%',
              'padding-bottom': '100px', 'padding-top': '100px'}}>
              <div style={{width: '75%', height:'100%'}}>
                <SsimRangeChart />
              </div>
              <div style={{width: '25%'}}>
                <DataTable style={{width: '100%'}}/>
              </div>
          </div>
          <h2> History </h2>
        <div className="container-fluid">
          <Images/>
          <Row />
        </div>
      </div>

    );
  }
}

class Images extends Component {
    constructor(props) {
        super(props);
        this.state = { currentCount: 0, panels: []};
        this.fetchData = this.fetchData.bind(this);
        this.fetchPanels = this.fetchPanels.bind(this);
    }

    componentDidMount() {
        this.refreshTimer = setInterval(this.fetchData, 4000);
    }

    componentWillUnmount() {
        clearInterval(this.refreshTimer);
    }

    fetchData() {
        //simulate API fetch from server - we'll just create a list with random prices
        var that = this;
        fetch(url + 'getUpdateCount').then(response =>
            response.json().then(data => ({
                    data: data,
                    status: response.status
                })
            ).then(res => {
                var diff = Number(res.data.count) - that.state.currentCount;
                if (diff > 0){
                    that.setState({currentCount: Number(res.data.count)});
                    that.fetchPanels(diff);
                }
            })
        );
    }

    fetchPanels(diff){
        var array = ["original", "input", "output"];
        // var panelCopy = this.state.panels.splice();
        var images = [];
        this.setState({panels: []});
        // for(var i=0; i<Math.min(5, diff) ;i++){
        for(var i=0; i < 5 ;i++){
            images.push(array.map(image => {
                let imageStr = url + 'getFile?fileDir=' + image + '&&index=' + i + '&&time=' + new Date().getTime();
                return  <div className="col-sm-4"><Panel>
                    <Panel.Heading><Panel.Title componentClass="h3">{image}</Panel.Title></Panel.Heading>
                    <Panel.Body><img key={image} src={imageStr} alt="" className="img-responsive" style={{width: '100%', height: '100%'}} /></Panel.Body>
                </Panel></div>
            }));
        }
        // Array.prototype.push.apply(panelCopy, images);
        this.setState({panels: images});
        // this.forceUpdate();
    }

  render() {

      return (
        <div className="row">
            {this.state.panels}
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
