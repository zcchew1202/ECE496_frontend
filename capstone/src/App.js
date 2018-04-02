import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './keen-dashboards.css';
import Panel from 'react-bootstrap/lib/Panel';
import Bar from 'react-chartjs-2';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <Images/>
          <Row />
        </div>
      </div>

    );
  }
}

// class Columns extends Component {
//   render() {
//     return (
//       <div className="col-sm-4">
//         <Panel>
//           <Panel.Heading>
//             <Panel.Title componentClass="h3">Panel heading with a title</Panel.Title>
//           </Panel.Heading>
//           <Panel.Body>
//             <img data-src="holder.js/100%x350/white" />
//           </Panel.Body>
//         </Panel>
//       </div>
//     );
//   }
// }

class Images extends Component {
  render() {

      var array = ["original", "input", "output"];
      var panels = [];
      for(let i=0; i<5 ;i++){
        var images = array.map(image => {
        let imageStr = 'https://4770e0a9.ngrok.io/getFile?fileDir=' + image + '&&index=' + i;
        return  <div className="col-sm-4"><Panel><Panel.Heading><Panel.Title componentClass="h3">{image}</Panel.Title></Panel.Heading><Panel.Body><img key={image} src={imageStr} alt="" className="img-responsive" /></Panel.Body></Panel></div>
        });
        panels.push(images);
      }
      // let images = array.map(image => {
      //   let imageStr = 'https://4770e0a9.ngrok.io/getFile?fileDir=' + image + '&&index=0';
      //   console.log(imageStr);
      //    return  <div className="col-sm-4"><Panel><Panel.Heading><Panel.Title componentClass="h3">{image}</Panel.Title></Panel.Heading><Panel.Body><img key={image} src={imageStr} alt="" className="img-responsive" /></Panel.Body></Panel></div>
      // });
      return (
        <div className="row">
            {panels}
          </div>
      );
  }
}

class Row extends Component {
  render() {
    let data = fetch('https://4770e0a9.ngrok.io/getData')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.log(myJson);
    });

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
