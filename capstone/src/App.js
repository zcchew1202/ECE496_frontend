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
          <div className="row" style={{display: 'flex', 'flex-direction':'row', padding:'20px', height:'40%', 'padding-bottom': '100px'}}>
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
                if (Number(res.data.count) > that.state.currentCount){
                    alert("got higher count");
                    that.setState({currentCount: Number(res.data.count)});
                    that.fetchPanels();
                }
            })
        );
    }

    fetchPanels(){
        var array = ["original", "input", "output"];
        for(let i=0; i<Math.min(5, this.state.currentCount - this.state.panels.length) ;i++){
            var images = array.map(image => {
                let imageStr = url + 'getFile?fileDir=' + image + '&&index=' + i;
                return  <div className="col-sm-4"><Panel><Panel.Heading><Panel.Title componentClass="h3">{image}</Panel.Title></Panel.Heading><Panel.Body><img key={image} src={imageStr} alt="" className="img-responsive" style={{width: '100%', height: '100%'}} /></Panel.Body></Panel></div>
            });
            var newArray = this.state.panels.slice();
            newArray.unshift(images);
            this.setState({panels: newArray});
            alert(this.state.panels.length);
        }
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
