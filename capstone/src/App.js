import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './keen-dashboards.css';
import Panel from 'react-bootstrap/lib/Panel';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        <div className="container-fluid">
          <Columns/>
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

class Columns extends Component {
  render() {

      let array = ["original", "input", "output"];

      let images = array.map(image => {
        let imageStr = 'https://698920bf.ngrok.io/getFile?fileDir=' + image;
        console.log(imageStr);
         return  <div className="col-sm-4"><Panel><Panel.Heading><Panel.Title componentClass="h3">{image}</Panel.Title></Panel.Heading><Panel.Body><img key={image} src={imageStr} alt="" className="img-responsive" /></Panel.Body></Panel></div>
      });

      console.log(images)
      return (
        <div className="row">
            {images}
          </div>
      );
      
  }
}

class Stopka extends Component {
  render() {

      let array = ["og", "comp", "regen"];

      let images = array.map(image => {
         return <img key={image} src={require(`../pictures/${image}.jpeg`)} alt="" className="img-responsive" />
      });

      return (
          <div className="container">
              <footer className="row">
                  <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                      <h4>Some text</h4>
                  </div>
                  <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                     { images }
                  </div>
              </footer>
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
