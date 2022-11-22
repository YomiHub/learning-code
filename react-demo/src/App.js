import React from "react";
import logo from "./logo.svg";
import "./App.css";

function handleTxt(arg) {
  return arg.join("-");
}
const ele = <h1>hello,{handleTxt([2022, 3])}</h1>;

class Welcome extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      date:new Date()
    }
  }

  componentDidMount(){
    this.timer = setInterval(()=>{this.tick()},1000);
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  tick(){
    this.setState({
      date:new Date()
    })
  }

  render(){
    return <h1>hello {this.props.name} {this.state.date.toLocaleTimeString()}</h1>
  }
}

function App() {
  return (
    <div className="App">
      <Welcome name="world"/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {ele}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
